require('dotenv').config()
// const db = require(__dirname + '/../db_connect')
const db = require(__dirname + '/../db_connect2')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('comment-api');
})

// 新增
router.post('/insert',async(req,res) => {
    let returnData = {
        code: 0,
        data:''
    }
    let obj = req.body
    let pd_sid = obj.pd_sid
    let client_sid = obj.cl_sid
    let stars = obj.stars
    let content = obj.content
    let avg_stars = null

    let sqlNewComment = "INSERT INTO `comment`(`create_time`, `pd_sid`, `client_sid`, `c_stars`, `content`) VALUES (NOW(),?,?,?,?)"
    let sqlStarsConbine = "SELECT `c_stars` FROM `comment` WHERE pd_sid = ?"
    let sqlProductStarAVG = "UPDATE products_equip SET stars = ? WHERE pd_id = ?"

    // 新增評論
    await db.query(sqlNewComment,[pd_sid,client_sid,stars,content])
    // 找到商品評論的筆數
    let result = await db.query(sqlStarsConbine,[pd_sid])
    let order_amount = result[0].length
    let total_stars = result[0].map(item => {return item.stars}).reduce((a,b) => a+b )
    avg_stars = parseFloat((total_stars / order_amount).toFixed(1))
    await db.query(sqlProductStarAVG,[avg_stars,pd_sid])
    res.json(returnData)
})


// 查詢(商品)所有評論
router.get('/get',async(req,res) => {
    let pd_sid = req.query.pd_sid
    let sql = "SELECT comment.*, products_equip.stars, members.profile_picture, members.nickname FROM comment LEFT JOIN products_equip ON comment.pd_sid = products_equip.pd_id LEFT JOIN members ON comment.client_sid = members.sid WHERE comment.pd_sid = ?"
    let sqlStarsConbine = "SELECT `c_stars` FROM `comment` WHERE pd_sid = ?"
    let result = await db.query(sqlStarsConbine,[pd_sid])
    let order_amount = result[0].length
    let resArr = []
    let dataArr = []
    // let result = db.query(sql,[1])
    // let resArr = result[0]
    let sqlStarsAVG = "SELECT stars FROM products_equip WHERE pd_id = ?"
    await db.query(sql,[pd_sid])
    .then(([result]) => {
        resArr = result.map(item => {
            let obj = {
                "user_name":item.nickname,
                "avatar_url":item.profile_picture,
                "date":item.create_time,
                "content":item.content,
                "pic_url":item.pic_url
            }
            return obj
        })
    })
    await db.query(sqlStarsAVG,[pd_sid])
        .then(([result]) => {
            dataArr = result.map(item => {
                let obj = {
                    "average": item.stars,
                    "comment_num":order_amount,
                    "comment":resArr
                }
                return obj
            })
        })


    let returnData = {
        code: 0,
        data:dataArr
    }
    res.json(returnData)
})


module.exports = router