import React,{useState,useEffect} from 'react'
import { Button } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';

import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import { red } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth:'20rem',
   
  },
  media: {
    width: '15rem',
    height: '15rem',
    // paddingTop: '56.25%', // 16:9
    margin: '0px auto',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
 
}));


function PdContentItem(props){

const {pds ,products} =props
const [isShown,setIsShown]= useState(false)

const classes = useStyles();
const handleExpandEnter = () => {
  setIsShown(!isShown);
};




    return(
           
            <Link
            to={`/product/${products.pd_id}`}
            className="col-lg-4 pdCard"
            onMouseEnter={handleExpandEnter}
            onMouseLeave={handleExpandEnter}
            
            >
            <div className="cardWrap">
            <CardMedia
              className={classes.media}
              image={products.pd_main_img}
              title="Paella dish"
            />
            <div className="cardBody">
            <div variant="body2">
                <h4>{products.pd_title}</h4>
              </div>
            <div variant="body2">
                <h4 className="pdPrice">${products.pd_price}</h4>
            </div>
            </div>
           
            <Collapse in={isShown} timeout="auto" unmountOnExit>
                
                  <Button className="addCartBtn" onClick={()=>{
                    let cart = []
                    if(localStorage.getItem('cart'))
                      cart = JSON.parse(localStorage.getItem('cart'))
                    //id一樣的話只加count
                    console.log(cart.map(item => item.sid))
                    if(cart.map(item => item.sid).indexOf(products.id) > -1) {
                      let index = cart.map(item => item.sid).indexOf(products.id)
                      cart[index].count ++
                    }
                    else{
                      let obj = {
                        sid: products.id,
                        name: '',
                        spec: '',
                        price: products.pd_price,
                        count: '1',
                        pic_url: ''
                      }
                      cart.push(obj)
                    }
                    localStorage.setItem('cart',JSON.stringify(cart))
                  }}>加入購物車車車車</Button>
                
                
            </Collapse>
            </div>
     
          </Link>
   
   

    


    )
}

export default PdContentItem