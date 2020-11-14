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
  // media: {
  //   width: '15rem',
  //   height: '15rem',
  //   // paddingTop: '56.25%', // 16:9
  //   margin: '0px auto',
  // },
  media: {
    width: '100%',
    height: '180px',
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


function StudioContentItem(props){
    // const {pds ,products} =props
    const [isShown,setIsShown]= useState(false)

    const classes = useStyles();
    const handleExpandEnter = () => {
      setIsShown(!isShown);
    };

    const { studioData } = props

  
    return(
           
      <Link
      to={`/studiomain`}
      className="col-lg-4 pdCard"
      onMouseEnter={handleExpandEnter}
      onMouseLeave={handleExpandEnter}
      
      >
      <div className="cardWrap">
      <CardMedia
        className={classes.media}
        image={"http://localhost:3000/ch_img/S000101.jpg"}
        title="Paella dish"
      />
      <div className="cardBody">
      <div variant="body2" className="mt-4">
          <h4>{studioData.studio_name}</h4>
        </div>
      <div variant="body2">
          <h4 className="pdPrice">${studioData.studio_price}</h4>
      </div>
      </div>
     
      {/* <Collapse in={isShown} timeout="auto" unmountOnExit>                
        <Button className="addCartBtn" onClick={()=>{props.history.push('/studiomain')}}>立即預訂</Button>                              
      </Collapse> */}
      </div>
    </Link>
)
}

export default StudioContentItem
