require('dotenv').config();
const express = require('express');
const app = express()
// const db = require(__dirname + '/../db_connect');
const db = require(__dirname + '/../db_connect2')
const router = express.Router();


router.get('/',(req, res) => {
    res.send('studio');
});


async function getListData (req){
    const output = {
        page:1,
        perPage:5,
        totalRows: 0,
        totalPages: 0,
        rows: []
    } ;
    const [[{ totalRows }]] = await db.query("SELECT COUNT(1) totalRows FROM studio");

    if(totalRows>0){
        let page = parseInt(req.query.page) || 1;
        output.totalRows = totalRows;
        output.totalPages = Math.ceil(totalRows/output.perPage);

        if(page < 1) {
            output.page = 1;
        } else if(page > output.totalPages) {
            output.page = output.totalPages;
        } else {
            output.page = page;
        }
        let sql = `SELECT * FROM studio ORDER BY sid DESC LIMIT ${(output.page-1)*output.perPage}, ${output.perPage}`;
        
        const [r] = await db.query(sql);
        output.rows=r;
           
    }
    return output;
};

//list(R)
router.get('/api', async(req,res)=>{
   res.json(await getListData(req));
});

//all-lsit
router.get('/list', async(req,res)=>{
    const sql = "SELECT * FROM studio ORDER BY studio_price ASC";
    const [results] = await db.query(sql);
    res.json(results);
})


//呈現錄音室的不同方案
router.get('/option/:studio_id', async (req, res) => {
    const sql = "SELECT * FROM studio WHERE studio_id=?";
    const [results] = await db.query(sql, [req.params.studio_id]);
    if (!results.length) return res.redirect('/studio/api');
    console.log(results);

    res.json(results);
})


// add(C)
router.post('/add', async (req, res) => {
    const data = { ...req.body };
    const sql = "INSERT INTO `studio` set ?";
    const [{ affectedRows, insertId }] = await db.query(sql, [data]);

    res.json({
        success: !!affectedRows,
        affectedRows,
        insertId
    });
})

//呈現單筆
router.get('/api/:sid', async (req, res) => {
    const sql = "SELECT * FROM studio WHERE sid=?";
    const [results] = await db.query(sql, [req.params.sid]);
    if (!results.length) return res.redirect('/studio/api');

    res.json(results[0]);
})

//edit(U) 修改單筆
router.post('/edit/:sid', async (req, res)=>{
    const data = {...req.body};
    const sql = "UPDATE `studio` SET ? WHERE `sid`=?";
    const [{affectedRows, changedRows}] = await db.query(sql, [ data, req.params.sid ]);

    res.json({
        success: !!changedRows,
        affectedRows,
        changedRows,
    });
});

// delete(D)
router.delete('/delete/:sid', async (req, res) => {
    const sql = "DELETE FROM `studio` WHERE `sid`=?";
    const [results] = await db.query(sql, [req.params.sid]);
    res.json(results);
})

module.exports = router;