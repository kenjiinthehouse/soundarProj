require('dotenv').config()
const db = require(__dirname + '/../db_connect')
// const app = express()
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('coupon-api');
});

const compareData = (item,init) => {
    if(item) return item
    else return init 
}

const isNum = (value) => {
    if(typeof(value) === "number") return true
    else return false
}

const isDate = (value) => {
    if(Date.parse(value) >= 0 || !isNaN(Date.parse(value))) return true
    else return false
}

async function updateCoupon(req,res) {
    let returnData = {
        code: 0,
        data:''
    }
    let obj = req.body
    let coupon = obj.coupon_sid
    let used = parseInt(obj.used)
    let sql = "UPDATE client_coupon SET used = ? WHERE client_coupon.`client_coupon_sid` = ?"
    let result = await db.query(sql,[used,coupon]);
    returnData.data = result[0];
    return returnData;
}


// 優惠券API
router.get('/get', async(req, res) => {
    let demo = await db.query('SELECT * FROM coupon')
    console.log(demo[0])
    db.query('SELECT * FROM coupon')
        .then(([results]) => {
            let arr = []
            results.forEach(item =>{
                if(compareData(item.coupon_sid,"")){
                    let obj = {
                        "sid":compareData(item.coupon_sid,""),
                        "name":compareData(item.coupon_name,""),
                        "minimum_amount":compareData(item.minimum_amount,0),
                        "discount":compareData(item.discount,0),
                        "start_date":compareData(item.start_date,""),
                        "expire_date":compareData(item.expire_date,"")
                    }
                    arr.push(obj)
                }
            })
            let returnData = {
                code: 0,
                data: arr
            }
            res.json(returnData)
        })
})

router.post('/insert',(req,res)=>{
    let returnData = {
        code: 0,
        data:''
    }
    if(!req.body.name){
        returnData.code = 1
        return res.status(400).json(returnData)
    }
    if(!req.body.amount || req.body.amount <= 0 || !isNum(req.body.amount)){
        returnData.code = 2
        return res.status(400).json(returnData)
    }
    if(!req.body.discount || req.body.discount <= 0 || !isNum(req.body.discount)){
        returnData.code = 3
        return res.status(400).json(returnData)
    }
    if(!isNum(req.body.minimum_amount)){
        returnData.code = 7
        return res.status(400).json(returnData)
    }
    if(!req.body.start_date ){
        returnData.code = 4
        return res.status(400).json(returnData)
    }
    if(!isDate(req.body.start_date) || !isDate(req.body.end_date)){
        returnData.code = 5
        return res.status(400).json(returnData) 
    }
    if(Date.parse(req.body.start_date) <= Date.parse(req.body.end_date)){
        returnData.code = 6
        return res.status(400).json(returnData)
    }
    if(!isNum(req.body.minimum_amount)){
        returnData.code = 7
        return res.status(400).json(returnData)
    }

    let obj = req.body
    let name = obj.name
    let amount = parseInt(obj.amount)
    let discount = parseInt(obj.discount)
    let minimum_amount = parseInt(obj.minimum_amount)
    let start_date = obj.start_date
    let end_date = obj.end_date || null
    db.query('SELECT * FROM `coupon` ORDER BY `coupon_sid` DESC LIMIT 1')
    .then(([res]) => {
        let last_sid = res[0].coupon_sid.slice(2,6)
        let numStr = (parseInt(last_sid) + 1).toString()
        let coupon_num = numStr.padStart(4,"0")
        let sql = "INSERT INTO `coupon` (`coupon_sid`, `coupon_name`, `cupon_amount`, `minimum_amount`, `discount`, `start_date`, `end_date`) VALUES (?, ?, ?, ?, ?, ?, ?)"
        db.query(sql,["CP" + coupon_num, name, amount, discount, minimum_amount, start_date, end_date])
    })
    
    res.json(returnData);
})

router.patch('/update',(req,res) => {
    let returnData = {
        code: 0,
        data:''
    }
    if(!req.body.name){
        returnData.code = 1
        return res.status(400).json(returnData)
    }
    if(!req.body.amount || req.body.amount <= 0 || !isNum(req.body.amount)){
        returnData.code = 2
        console.log(typeof(req.body.amount))
        return res.status(400).json(returnData)
    }
    if(!req.body.discount || req.body.discount <= 0 || !isNum(req.body.discount)){
        returnData.code = 3
        return res.status(400).json(returnData)
    }
    if(!isNum(req.body.minimum_amount)){
        returnData.code = 7
        return res.status(400).json(returnData)
    }
    if(!req.body.start_date ){
        returnData.code = 4
        return res.status(400).json(returnData)
    }
    if(!isDate(req.body.start_date) || !isDate(req.body.end_date)){
        returnData.code = 5
        return res.status(400).json(returnData) 
    }
    if(Date.parse(req.body.start_date) <= Date.parse(req.body.end_date)){
        returnData.code = 6
        return res.status(400).json(returnData)
    }
    if(!isNum(req.body.minimum_amount)){
        returnData.code = 7
        return res.status(400).json(returnData)
    }
    let obj = req.body
    let name = obj.name
    let amount = parseInt(obj.amount)
    let discount = parseInt(obj.discount)
    let minimum_amount = parseInt(obj.minimum_amount)
    let start_date = obj.start_date
    let end_date = obj.end_date || null
    let sid = 'CP0003'
    db.query("SELECT * FROM `coupon` WHERE 1")
        .then(([res]) => {            
            let sql = "UPDATE coupon SET coupon_name = ?, coupon_amount = ?, minimum_amount = ?, discount = ?, start_date = ?, end_date = ? WHERE coupon.coupon_sid = ?"
            db.query(sql,[ name, amount, minimum_amount, discount, start_date, end_date, sid])
        })    
        res.json(returnData)
})

router.delete('/delete',(req,res) => {
    db.query("SELECT * FROM `coupon` WHERE 1")
        .then(([res]) => {
        let sid = req.body.coupon_sid
        let sql = "DELETE FROM `coupon` WHERE `coupon`.`coupon_sid` = ?"
        db.query(sql,[sid])
        })
    let returnData = {
        code: 0,
        data: ""
    }
    res.json(returnData)
})

// 優惠券查詢(顧客)
router.get('/client/get',(req,res) => {
    let sid = req.query.client_sid
    // 查詢已使用過的折價券
    // SELECT * FROM client_coupon a, coupon b WHERE a.coupon_sid = b.coupon_sid AND a.client_sid = ? AND used = 1
    // 查詢未使用過的折價券
    // SELECT * FROM client_coupon a, coupon b WHERE a.coupon_sid = b.coupon_sid AND a.client_sid = ? AND used = 0
    let sql = "SELECT * FROM client_coupon a, coupon b WHERE a.coupon_sid = b.coupon_sid AND a.client_sid = ?"
    db.query(sql,[sid])
        .then(([results]) => {
            let arr = []
            results.forEach(item => {
                if(compareData(item.client_coupon_sid,"")){
                    let obj = {
                        "sid":compareData(item.client_coupon_sid,""),
                        "coupon_sid":compareData(item.coupon_sid,""),
                        "name":compareData(item.coupon_name,""),
                        "discount":compareData(item.discount,0),
                        "minimum_amount":compareData(item.minimum_amount,0),
                        "start_date":compareData(item.start_date,""),
                        "end_date":compareData(item.end_date,""),
                        "used":compareData(item.used,0)
                    }
                    arr.push(obj)
                } 
            })
            let returnData = {
                code: 0,
                data: arr
            }
            res.json(returnData)
        })
})

// 優惠券(顧客) 領取優惠券ALL
router.post('/client/insert-all',async(req,res) => {
    let returnData = {
        code: 0,
        data:''
    }
    let sid = req.body.client_sid
    let arr = []
    let sql = "SELECT coupon.coupon_sid FROM coupon WHERE coupon.coupon_sid NOT IN (SELECT client_coupon.coupon_sid FROM client_coupon WHERE client_coupon.client_sid = ?)"
    await db.query(sql,[sid])
        .then(([results]) => {
            results.forEach(item => arr.push(item.coupon_sid))
        })
    await db.query("SELECT `client_coupon_sid` FROM `client_coupon` ORDER BY `client_coupon`.`client_coupon_sid` DESC LIMIT 1")
        .then(([res]) => {
            let last_sid = res[0].client_coupon_sid.slice(2,6)
            let sql = ("INSERT INTO `client_coupon` (`client_sid`, `client_coupon_sid`, `coupon_sid`, `used`) VALUES (?, ?, ?, ?)")
            for(let i = 0; i < arr.length; i++){
                let add = i + 1
                let numStr = (parseInt(last_sid) + add ).toString()
                let coupon_num = numStr.padStart(4,"0")
                console.log(sql,[sid, 'CL' + coupon_num , arr[i], 0])
            }
    })
    
    res.json(returnData) 
})

// 優惠券(顧客) 領取優惠券 1 張
router.post('/client/insert',(req,res) => {
    let returnData = {
        code: 0,
        data:''
    }
    // console.log(req.body)
    let obj = req.body
    let sid = parseInt(obj.client_sid)
    let coupon = obj.coupon_sid
    let used = obj.used || 0
    let sql = "SELECT coupon.coupon_sid FROM coupon WHERE coupon.coupon_sid IN (SELECT client_coupon.coupon_sid FROM client_coupon WHERE client_coupon.client_sid = ?)"
    let sql2 = "INSERT INTO `client_coupon` (`client_sid`, `client_coupon_sid`, `coupon_sid`, `used`) VALUES (?, ?, ?, ?)"
    let arr = []
    db.query(sql,[sid])
        .then(([results]) => {
            results.forEach(item=>arr.push(item.coupon_sid))
            if(arr.indexOf(coupon) >= 0 ) return 
        db.query("SELECT `client_coupon_sid` FROM `client_coupon` ORDER BY `client_coupon`.`client_coupon_sid` DESC LIMIT 1")
            .then(([results]) => {
                let last_sid = results[0].client_coupon_sid.slice(2,6)
                let numStr = (parseInt(last_sid) + 1 ).toString()
                let coupon_num = numStr.padStart(4,"0")
                db.query(sql2,[sid,"CL" + coupon_num,coupon,used])
            })
        })
    res.json(returnData)
})

// 顧客優惠券使用/更新狀態

router.patch('/client/update',async(req,res) => {
    let result = await updateCoupon(req,res);
    res.json(result)
})

module.exports = {
    updateCoupon: updateCoupon,
    router: router
}