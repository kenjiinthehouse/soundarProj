import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { red } from '@material-ui/core/colors';


import PdContentItem from './PdContentItem'
import QueueAnim from 'rc-queue-anim';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
   
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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

function PdContent(props) {

  const {pds,viewFilter,products} =props

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandEnter = () => {
    setExpanded(!expanded);
  };
  const handleExpandLeave = () => {
    setExpanded(false);
  };



  return (
    <>
    <QueueAnim className="pdContent demo-content d-flex flex-wrap mx-auto">
    
    {/* 10:錄音設備 20:播客周邊 1:耳機 2:麥克風 3:t-shirt 4:杯 */}
    {/* 10:錄音設備 11:耳機 12:麥克風 20:播客周邊 1:耳塞式 2:耳罩式 3:t-shirt 4:杯 */}
      {/* {pds.map((item, index) => {
          if (viewFilter === 10 && (item.cate_id ==3 || item.cate_id ==4) )return
          if (viewFilter === 20 && (item.cate_id ==1 || item.cate_id ==2) )return
          if (viewFilter === 11 && (item.cate_id ==2 || item.cate_id ==3 || item.cate_id ==4) )return
          if (viewFilter === 12 && (item.cate_id !==2))return

          for(let i=1 ; i<5 ;i++){
            if (viewFilter === i && item.cate_id!==i) return
          } */}
          {/* if (viewFilter === 1 && item.cate_id!==1) return
          if (viewFilter === 2 && item.cate_id!==2) return
          if (viewFilter === 3 && item.cate_id!==3) return
          if (viewFilter === 4 && item.cate_id!==4) return */}
{/* 
          return <PdContentItem key={item.id} pds={item}/> */}
        {/* })} */}
        {products.map((item, index) => {
          
          return <PdContentItem key={item.id} products={item}/>
         

        })}

                 
     </QueueAnim>
    </>
  );
  
}

export default PdContent