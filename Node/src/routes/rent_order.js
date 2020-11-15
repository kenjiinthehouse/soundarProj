require('dotenv').config();
const express = require('express');
const app = express()
// const db = require(__dirname + '/../db_connect');
const db = require(__dirname + '/../db_connect2')
const router = express.Router();


router.get('/',(req, res) => {
    res.send('rent_order');
});


async function getListData (req){
    const output = {
        page:1,
        perPage:10,
        totalRows: 0,
        totalPages: 0,
        rows: []
    } ;
    const [[{ totalRows }]] = await db.query("SELECT COUNT(1) totalRows FROM rent_order");

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
        let sql = `SELECT rent_order.*, studio.studio_name, studio.studio_location,studio.studio_option, studio.option_description, studio.studio_price, members.account, members.name, members.phone FROM rent_order LEFT JOIN studio ON rent_order.studio_sid = studio.sid LEFT JOIN members ON rent_order.members_sid = members.sid ORDER BY rent_order.sid DESC LIMIT ${(output.page-1)*output.perPage}, ${output.perPage}`;
        
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
    const sql = "SELECT rent_order.*, studio.studio_name, studio.studio_main_img, studio.studio_location,studio.studio_option,members.account, members.name, members.phone FROM rent_order LEFT JOIN studio ON rent_order.studio_sid = studio.sid LEFT JOIN members ON rent_order.members_sid = members.sid WHERE members_sid=?";
    const [results] = await db.query(sql, [req.params.members_sid]);
    res.json(results);
})




module.exports = router;