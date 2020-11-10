const express = require('express');
const router = express.Router();
const db = require(__dirname + '/../db_connect')

router.get('/',(req,res)=>{
    res.send('products')
})

async function getPdData(req){
    const output ={
        page:1,
        perPage:20,
        totalRows:0,
        totalPage:0,
        rows:[]
    }

    //output值 page,perPage,totalRows,totalPage處理
    const sql ="SELECT COUNT(1) totalRows FROM `products_equip`"
    const [[{totalRows}]] = await db.query(sql)
    // res.json(totalRows);
    

    if(totalRows>0){
        output.totalRows = totalRows
        output.totalPage = Math.ceil(totalRows/output.perPage);

        let page = parseInt(req.query.page) || 1
        if(page < 1){
            output.page = 1
        }else if(page > output.totalPage){
            output.page = output.totalPage
        }else{
            output.page = page;
        }
    }
    

    //output值rows處理
    const item_sql = `SELECT * FROM products_equip ORDER BY pd_id ASC LIMIT ${(output.page-1)*output.perPage},${output.perPage}`
    // const item_sql = "SELECT * FROM `products_equip` WHERE `cate_id`=4"

    const [r2]= await db.query(item_sql);
    output.rows = r2;
    output.rows.map((item)=>{
        const newSubImgs = item.pd_sub_imgs.split(',')
        item.combine_img = [item.pd_main_img,...newSubImgs]
    })

    // res.json(output);
    return output
}

router.get('/get-api',async (req,res)=>{
   res.json(await getPdData(req))
})

router.get('/get-api/:pd_id?',async (req,res)=>{
    const sql = "SELECT * FROM products_equip WHERE pd_id=?";
    const [results] = await db.query(sql, [req.params.pd_id]);
    res.json(results[0]);
    // res.send(results);
 })

//列表： /pd_list

/* 
列表： /pd_list
    呈現GET
新增： /add
    表單GET,接收資料POST
修改： /edit/:sid
    修改表單GET,接收資料POST
刪除： /del/:sid
    POST
*/

/*RESTful API
列表 /GET
單筆 /:sid GET
新增 /POST
修改單筆 / PUT
刪除單筆 /DELETE
*/
module.exports = router;