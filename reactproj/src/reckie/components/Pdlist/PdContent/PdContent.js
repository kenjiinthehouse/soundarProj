import React,{useEffect} from 'react';
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

  const {value,products} =props
// useEffect(()=>{ console.log('produtsPdContent',products)},[products])
 

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
    <QueueAnim className={`pdContent demo-content d-flex flex-wrap mx-auto ${(value===0)||(value===1)?'':'reHidden' }`}>
      {products.map((item, index) => {
          return <PdContentItem key={item.id} products={item}/>
        })}
     
     </QueueAnim>
    </>
  );
  
}

export default PdContent