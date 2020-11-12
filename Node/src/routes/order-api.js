require('dotenv').config()
const db = require(__dirname + '/../db_connect2')
const express = require('express')
const router = express.Router()

const coupon_api = require("./coupon-api.js");

router.get('/', (req, res) => {
    res.send('order-api');
});

// 取得所有訂單
router.get('/get', async(req,res) => {
    let sid = req.query.client_sid
    let sqlOrderDetail = "SELECT order_list.*,products_equip.*,order_detail.* FROM order_detail LEFT JOIN order_list ON order_detail.order_sid = order_list.sid LEFT JOIN products_equip ON order_detail.product_sid = products_equip.pd_id WHERE order_list.client_sid = ?"
    let sqlOrderList = "SELECT * FROM order_list WHERE client_sid = ?"
    let orderArr = []
    let picArr = []
    let productsArr = []
    await db.query(sqlOrderDetail,[sid])
        .then(([results]) => {
            picArr = results.map(item => {
                let obj = {
                    "sid":item.sid,
                    "pic_url":item.pd_main_img
                }
                return obj
            })
            productsArr = results.map(item => {
                let obj = {
                    "sid":item.sid,
                    "name":item.pd_title,
                    "spec":item.pd_type,
                    "count":item.product_amount,
                    "price":item.pd_price,
                    "pic_url":item.pd_main_img
                }
                return obj
            })
        })
    await db.query(sqlOrderList,[sid])
        .then(([results]) => {
            results.forEach(item => {
                    let obj = {
                        "sid":item.sid,
                        "create_date":item.create_date,
                        "status":item.order_status,
                        "amount":item.total_amount,
                        "remark":item.remark,
                        "pic_url":picArr.filter(value => value.sid === item.sid)
                                        .map(picItem => picItem.pic_url),
                        "products":productsArr.filter(value => value.sid === item.sid),
                        "payment":item.payment,
                        "delivery":item.delivery,
                        "d_status":item.delivery_status,
                        "d_time":item.delivery_date,
                        "d_fee":item.delivery_payment,
                        "arrive_time":item.arrive_date,
                        "discount":item.discount,
                        "receiver":item.receiver,
                        "mobile":item.receiver_mobile,
                        "address":item.receiver_address
                    }
                    orderArr.push(obj)
            })
        })
    let returnData = {
        code: 0,
        orderArr: orderArr,
    }
    res.json(returnData)
})

// 新增訂單
router.post('/insert',async(req,res) => {
    let returnData = {
        code: 0,
        data:''
    }
    // console.log(req.body)
    let obj = req.body
    let sid = obj.sid
    let payment = obj.payment
    let d_fee = obj.d_fee
    let delivery = obj.delivery
    let amount = obj.amount
    let remark = obj.remark
    let products = obj.products
    let coupon = obj.coupon
    let discount = obj.discount
    let receiver = obj.receiver
    let mobile = obj.mobile
    let address = obj.address
    let last_order_id = null

    let sqlInsertOrderList = "INSERT INTO `order_list`(`create_date`, `client_sid`, `receiver`, `receiver_address`, `receiver_mobile`,`delivery`, `payment`,`delivery_payment`, `coupon_sid`, `discount`, `total_amount`, `remark`) VALUES (NOW(),?,?,?,?,?,?,?,?,?,?,?)"
    await db.query(sqlInsertOrderList,[sid,receiver,address,mobile,delivery,payment,d_fee,coupon,discount,amount,remark])
        .then(([results]) => {
            // console.log([results])
        })
    if(coupon) {
        let reqObj = {
            body: {
                coupon_sid: coupon,
                used: 1
            }
        }
        // reqObj.body.coupon_sid
        coupon_api.updateCoupon(reqObj)
    }
    await db.query("SELECT * FROM `order_list` ORDER BY `order_list`.`sid` DESC LIMIT 1")
        .then(([results]) => {
            last_order_id = parseInt(results[0].sid)
        })
    if(last_order_id !== null){
        products.forEach(item => {
            let sqlInsertOrderDetail = "INSERT INTO `order_detail`(`order_sid`, `product_sid`, `product_amount`) VALUES (?,?,?)"
            db.query(sqlInsertOrderDetail,[last_order_id,item.sid,item.count])
            let pd_id = item.sid
            let sqlSearchStorage = "SELECT `storage` FROM `products_equip` WHERE pd_id = ?"
            db.query(sqlSearchStorage,[pd_id])
                .then(([results])=>{
                    let storage = results[0].storage - 1
                    let sqlUpdateStorage = "UPDATE products_equip SET storage =? WHERE pd_id =?"
                    db.query(sqlUpdateStorage,[storage,pd_id])
                })        
        })
    }
    res.json(returnData);
})




module.exports = router