import React,{useState,useEffect} from 'react'
import { Button } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';

import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import { red } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import Rater from 'react-rater'


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
      image={products.pd_main_img.indexOf('http')=== -1 ?`/reckie_img/${products.pd_main_img}`:products.pd_main_img}
      title={products.pd_title}
      />
            <div className="cardBody">
            
            <div variant="body2" className="text-left">
                <h4 className="head5 oneLine ">{products.pd_title}</h4>  
                <Rater total={5} rating={products.stars} interactive={false} /> 
            </div>

            <div variant="body2" >
                <h4 className="pdPrice pt-5">${products.pd_price}</h4>
            </div>
            
            </div>
           
           
      </div>
     
      </Link>
   
   

    


    )
}

export default PdContentItem