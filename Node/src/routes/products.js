const express = require('express');
const router = express.Router();
const db = require(__dirname + '/../db_connect')

router.get('/',(req,res)=>{
    res.send('products')
})

async function getPdData(req){
    const output ={
        page:1,
        perPage:9,
        totalRows:0,
        totalPage:0,
        rows:[]
    }

    //output值 page,perPage,totalRows,totalPage處理
    const mainCate = req.query.mainCate;
    const detailCate = req.query.detailCate;
    const search = req.query.search;
    const frontPrice = req.query.frontPrice;
    const backPrice = req.query.backPrice;
    const sort= req.query.sort;
    let sql ="SELECT COUNT(1) totalRows FROM `products_equip` WHERE 1 ";
    const detailCate_set = `AND (cate_id = '${detailCate}')`
    const search_set = `AND ((pd_title LIKE '%${search}%') OR (pd_features_value LIKE '%${search}%') OR (pd_type LIKE '%${search}%'))`
    const price_set = `AND (pd_price BETWEEN ${frontPrice} AND ${backPrice})`     
    
    //大項分類
    let mainCate_set = '`AND (pd_id <= 297)`';
    if(mainCate == 1){
       mainCate_set = `AND (pd_id <= 297)`;
    }else if(mainCate == 2){
        mainCate_set = `AND (pd_id > 297)`;
    }
    mainCate ? (sql += mainCate_set ) : sql;
    //細項分類
    detailCate ? (sql += detailCate_set) : sql
    //搜尋
    search ? (sql += search_set) : sql
    //價格範圍
    frontPrice && backPrice? (sql += price_set) : sql
    //總筆數
    const [[{totalRows}]] = await db.query(sql);
    // res.json(totalRows);
    
    
    //分頁
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
    // const item_sql = `SELECT * FROM products_equip WHERE pd_id <298 ORDER BY pd_id ASC LIMIT ${(output.page-1)*output.perPage},${output.perPage} `
    let item_sql = "SELECT * FROM `products_equip` WHERE 1 "
   
    mainCate ? (item_sql += mainCate_set ) : item_sql;
    detailCate ? (item_sql += detailCate_set) : item_sql
    search ? (item_sql += search_set) : item_sql
    frontPrice && backPrice ? (item_sql += price_set) : item_sql
    //排序
    let sort_set = '';
    switch (sort){
        //價格由高到低
        case 'priceDESC':
            sort_set = `ORDER BY pd_price DESC LIMIT ${(output.page-1)*output.perPage},${output.perPage}`;
            break;
        //價格由低到高
        case 'priceASC':
            sort_set = `ORDER BY pd_price ASC LIMIT ${(output.page-1)*output.perPage},${output.perPage}`;
            break;
        //星等由高到低
        case 'starsDESC':
            sort_set = `ORDER BY stars DESC LIMIT ${(output.page-1)*output.perPage},${output.perPage}`;
            break;
        //星等由低到高
        case 'starsASC':
            sort_set = `ORDER BY stars ASC LIMIT ${(output.page-1)*output.perPage},${output.perPage}`;
            break;
        //原始狀態
        default:
            sort_set = `ORDER BY storage DESC LIMIT ${(output.page-1)*output.perPage},${output.perPage}`;
    }
    item_sql+= sort_set;



    console.log('hihi');
    const [r2]= await db.query(item_sql);
    output.rows = r2;
    //新增合併主圖附圖欄位
    // if(results[0].pd_sub_imgs){
    //     newSubImgs = results[0].pd_sub_imgs.split(',')
    //     // console.log('newSubImgs',newSubImgs)
    //     results[0].combine_img = [results[0].pd_main_img,...newSubImgs]
    // }else{
    //     results[0].combine_img = [results[0].pd_main_img]
    // }

    output.rows.map((item)=>{
        if(item.pd_sub_imgs){
            const newSubImgs = item.pd_sub_imgs.split(',')
            item.combine_img = [item.pd_main_img,...newSubImgs]
        }else{
            item.combine_img = item.pd_main_img
        }
       
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
    let newSubImgs=[];
    if(results[0].pd_sub_imgs){
        newSubImgs = results[0].pd_sub_imgs.split(',')
        // console.log('newSubImgs',newSubImgs)
        results[0].combine_img = [results[0].pd_main_img,...newSubImgs]
    }else{
        results[0].combine_img = [results[0].pd_main_img]
    }
    res.json(results[0]);
    // res.send(results);
 })


module.exports = router;