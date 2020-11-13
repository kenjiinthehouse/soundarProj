require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const express = require("express");
const jwt = require("jsonwebtoken");
const db = require(__dirname + "/../db_connect2");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
router.use(passport.initialize());
router.use(passport.session());
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "328121513385-sa4fn759o1ubsrqsm9bgvhnq1tsok450.apps.googleusercontent.com",
      clientSecret: "WcDMXFazv-ysXUHXQkTYu8hU",
      callbackURL: "http://localhost:5566/google/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log("accessToken:", accessToken);
      console.log("refreshToken:", refreshToken);
      console.log("profile:", profile);
      console.log("done:", done);
      console.log("name:", profile.displayName);
      console.log("photo:", profile.photos[0].value);
      console.log("gmail:", profile.emails[0].value);
      // googleid,google_name,google_photo
      const sql =
        "SELECT `sid`, `account`, `nickname`,`profile_picture` FROM `members` WHERE google_id=?";
      const [rs] = await db.query(sql, [profile.id]);
      console.log("q1");

      const sql_account =
        "SELECT `sid`, `account`, `nickname`,`profile_picture` FROM `members` WHERE `account`=?";

      const [rs_account] = await db.query(sql_account, [
        profile.emails[0].value,
      ]);
      console.log("rs:", rs);
      console.log("q2");

      // obj = {
      //   googleid: profile.id,
      //   google_name: profile.displayName,
      //   google_photo: profile.photos[0].value,
      // };
      if (rs.length) {
        console.log("if here");
        obj = { ...rs[0] };
        return done(null, obj);
        // return done(null, rs[0]);
      } else if (rs_account.length) {
        sql_update =
          "UPDATE `members` SET `google_id`=?,`google_name`=?,`google_photo`=?,`gmail`=? WHERE `account`=?";
        console.log(" profile.emails[0].value", profile.emails[0].value);
        console.log(" profile.displayName", profile.displayName);
        console.log(" profile.photos[0].value", profile.photos[0].value);

        const [{ affectedRows, changedRows }] = await db.query(sql_update, [
          profile.id,
          profile.displayName,
          profile.photos[0].value,
          profile.emails[0].value,
          profile.emails[0].value,
        ]);

        console.log("changedRows", changedRows);

        console.log("else if here");
        obj = { ...rs_account[0] };
        return done(null, obj);
      } else {
        console.log("else here");
        const uuid = uuidv4();
        console.log(" profile.emails[0].value", profile.emails[0].value);
        console.log(" profile.displayName", profile.displayName);
        console.log(" profile.photos[0].value", profile.photos[0].value);
        console.log(" uuid", uuid);
        const sql2 =
          "INSERT INTO `members`(`account`, `nickname`,`profile_picture`,`hashcode`,`google_id`,`google_name`,`google_photo`,`gmail`) VALUES (?,?,?,?,?,?,?,?)";

        const [rs2] = await db.query(sql2, [
          profile.emails[0].value,
          profile.displayName,
          profile.photos[0].value,
          uuid,
          profile.id,
          profile.displayName,
          profile.photos[0].value,
          profile.emails[0].value,
        ]);

        console.log("rs2 complete");
        const sql3 =
          "SELECT `sid`, `account`, `nickname`,`profile_picture` FROM `members` WHERE google_id=?";
        const [rs3] = await db.query(sql3, [profile.id]);

        obj = { ...rs3[0] };
        console.log("end else here");
        return done(null, obj);
      }

      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
    }
  )
);

// router.get("/", (req, res) => {
//   res.redirect("/google/googletest");
// });

// router.get("/googletest", (req, res) => {
//   // res.send("address-book");
//   res.render("googletest");
// });

// router.get(
//   "/auth/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//   })
// );

router.get(
  "/auth/google",
  passport.authenticate("google", {
    // scope: ["https://www.googleapis.com/auth/plus.login"],
    scope: ["profile", "email"],
  })
);

router.get("/sucess", (req, res) => {
  res.send("sucess");
});

router.get("/failure", (req, res) => {
  res.send("failure");
});

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/google/failure",
    session: false,
  }),
  function (req, res) {
    console.log("req", req.user);
    // req.session.gooleid = req.user.googleid;
    // req.session.admin = req.user;
    const go_back_react = "http://localhost:3000?jwt=";

    const token = jwt.sign(req.user, process.env.TOKEN_SECRET);

    const url = go_back_react + token;

    // create token
    // console.log(req.session);
    // res.redirect("/");
    res.redirect(url);
  }
);
// router.get(
//   "/auth/google/callback2",
//   passport.authenticate("google", {
//     failureRedirect: "/google/failure",
//     session: false,
//   }),
//   function (req, res) {
//     console.log("req", req.user);
//     req.session.gooleid = req.user.googleid;
//     // create token
//     console.log(req.session);
//     res.redirect("/success/" + uToken

//     );
//   }
// );

module.exports = router;
