require('dotenv').config();
const express = require('express');
const app = express()
const db = require(__dirname + '/../db_connect');
const router = express.Router();


router.get('/',(req, res) => {
    res.send('activity');
});


async function getListData (req){
    const output = {
        page:1,
        perPage:10,
        totalRows: 0,
        totalPages: 0,
        rows: []
    } ;
    const [[{ totalRows }]] = await db.query("SELECT COUNT(1) totalRows FROM activity");

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
        let sql = `SELECT * FROM activity ORDER BY sid DESC LIMIT ${(output.page-1)*output.perPage}, ${output.perPage}`;
        
        const [r] = await db.query(sql);
        output.rows=r;
           
    }
    return output;
};

//list(R)
router.get('/api', async(req,res)=>{
   res.json(await getListData(req));
});

//呈現單筆
router.get('/api/:sid', async (req, res) => {
    const sql = "SELECT * FROM activity WHERE sid=?";
    const [results] = await db.query(sql, [req.params.sid]);
    if (!results.length) return res.redirect('/activity/api');

    res.json(results[0]);
})

// add(C)
router.post('/add', async (req, res) => {
    const data = { ...req.body };
    const sql = "INSERT INTO `activity` set ?";
    const [{ affectedRows, insertId }] = await db.query(sql, [data]);

    res.json({
        success: !!affectedRows,
        affectedRows,
        insertId
    });
})



//edit(U) 修改單筆
router.post('/edit/:sid', async (req, res)=>{
    const data = {...req.body};
    const sql = "UPDATE `activity` SET ? WHERE `sid`=?";
    const [{affectedRows, changedRows}] = await db.query(sql, [ data, req.params.sid ]);

    res.json({
        success: !!changedRows,
        affectedRows,
        changedRows,
    });
});

// delete(D)
router.delete('/delete/:sid', async (req, res) => {
    const sql = "DELETE FROM `activity` WHERE `sid`=?";
    const [results] = await db.query(sql, [req.params.sid]);
    res.json(results);
})



module.exports = router;