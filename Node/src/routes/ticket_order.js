require('dotenv').config();
const express = require('express');
const app = express()
// const db = require(__dirname + '/../db_connect');
const db = require(__dirname + '/../db_connect2')
const router = express.Router();


router.get('/',(req, res) => {
    res.send('ticket_order');
});


async function getListData (req){
    const output = {
        page:1,
        perPage:10,
        totalRows: 0,
        totalPages: 0,
        rows: []
    } ;
    const [[{ totalRows }]] = await db.query("SELECT COUNT(1) totalRows FROM ticket_order");

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
        let sql = `SELECT ticket_order.*, activity.activity_name, activity.activity_img, activity.activity_location,activity.activity_date, members.account, members.name, members.phone FROM ticket_order LEFT JOIN activity ON ticket_order.activity_sid = activity.sid LEFT JOIN members ON ticket_order.members_sid = members.sid ORDER BY ticket_order.sid DESC LIMIT ${(output.page-1)*output.perPage}, ${output.perPage}`;
        
        const [r] = await db.query(sql);
        output.rows=r;
           
    }
    return output;
};

//list(R)
router.get('/api', async(req,res)=>{
   res.json(await getListData(req));
});

//會員的訂單
router.get('/member/:members_sid', async (req, res) => {
    const sql = "SELECT ticket_order.*, activity.activity_name, activity.activity_img, activity.activity_location,activity.activity_date,activity.ticket_option, members.account, members.name, members.phone FROM ticket_order LEFT JOIN activity ON ticket_order.activity_sid = activity.sid LEFT JOIN members ON ticket_order.members_sid = members.sid WHERE members_sid=?";
    const [results] = await db.query(sql, [req.params.members_sid]);
    res.json(results);
})


// add(C)
router.post('/add', async (req, res) => {
    const data = { ...req.body };
    // const sql = "INSERT INTO `ticket_order` set ?";
    const sql = "INSERT INTO `ticket_order`(ticket_order_id`, `ticket_order_date`, `total_amount`, `order_status`, `order_quantity`, `ticket_qrcode`, `activity_sid`, `members_sid`) VALUES (?,?,?,?,?,?,?,?)";
    const [{ affectedRows, insertId }] = await db.query(sql, [data]);

    res.json({
        success: !!affectedRows,
        affectedRows,
        insertId
    });
})

// router.post('/add',async (req,res) =>{
//     const sql = "INSERT INTO `ticket_order`(ticket_order_id`, `ticket_order_date`, `total_amount`, `order_status`, `order_quantity`, `ticket_qrcode`, `activity_sid`, `members_sid`) VALUES (?,?,?,?,?,?,?,?)"

// })

// router.post('/add',async(req,res) => {
//     let returnData = {
//         code: 0,
//         data:''
//     }
//     // console.log(req.body)
//     let obj = req.body
//     let ticket_order_id = obj.ticket_order_id
//     let ticket_order_date = obj.ticket_order_date
//     let total_amount = obj.total_amount
//     let order_status = obj.order_status
//     let order_quantity = obj.order_quantity
//     let ticket_qrcode = obj.ticket_qrcode
//     let activity_sid = obj.activity_sid
//     let members_sid = obj.members_sid

//     const sql = "INSERT INTO `ticket_order`(ticket_order_id`, `ticket_order_date`, `total_amount`, `order_status`, `order_quantity`, `ticket_qrcode`, `activity_sid`, `members_sid`) VALUES (?,?,?,?,?,?,?,?)"
//     await db.query(sql,[ticket_order_id,ticket_order_date,total_amount,order_status,order_quantity,ticket_qrcode,activity_sid,members_sid])
//         .then(([results]) => {
//             // console.log([results])
//         })
   
//     res.json(returnData);
// })

//edit(U) 呈現單筆
// router.get('/edit/:sid', async (req, res) => {
//     // const sql = "SELECT * FROM ticket_order WHERE sid=?";
//     const sql ="SELECT ticket_order.*, activity.activity_name, activity.activity_img, activity.activity_location,activity.activity_date, members.account, members.name, members.phone FROM ticket_order LEFT JOIN activity ON ticket_order.activity_sid = activity.sid LEFT JOIN members ON ticket_order.members_sid = members.sid WHERE ticket_order.sid = 1"

//     const [results] = await db.query(sql, [req.params.sid]);
//     if (!results.length) return res.redirect('/ticket_order/api');

//     res.json(results[0]);
// })

//edit(U) 修改單筆
// router.post('/edit/:sid', async (req, res)=>{
//     const data = {...req.body};
//     const sql = "UPDATE `ticket_order` SET ? WHERE `sid`=?";
//     const [{affectedRows, changedRows}] = await db.query(sql, [ data, req.params.sid ]);

//     res.json({
//         success: !!changedRows,
//         affectedRows,
//         changedRows,
//     });
// });

// delete(D)
// router.delete('/delete/:sid', async (req, res) => {
//     const sql = "DELETE FROM `ticket_order` WHERE `sid`=?";
//     const [results] = await db.query(sql, [req.params.sid]);
//     res.json(results);
// })



module.exports = router;