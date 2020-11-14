import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { red } from '@material-ui/core/colors';


import PdContentItem from './PdContentItem'
import QueueAnim from 'rc-queue-anim';
import { Form } from 'react-bootstrap'
import { MdFilterList } from "react-icons/md";



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

  const {value,products,setSort,sort} = props
// useEffect(()=>{ console.log('produtsPdContent',products)},[products])
 

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandEnter = () => {
    setExpanded(!expanded);
  };
  const handleExpandLeave = () => {
    setExpanded(false);
  };
  const getSelectedValue = (e)=>{
    setSort(e.target.value)
  }

  let pdContentTitle = ''
  let pdContentTitle2 = ''
  switch(value){
    case 0:
      pdContentTitle=`提升Podcast`
      pdContentTitle2 = `更高品質`
      break;
    case 1:
      pdContentTitle=`你喜愛的`
      pdContentTitle2 = '播客周邊商品'
      break;
  }


  return (
    <>
    <div className={`pdContentPart ${(value===0)||(value===1)?'':'reHidden' }`}>
    <div className="d-flex justify-content-between align-items-end mb-3">
    <h2 className="head2 dark font-weight-bold">{`${pdContentTitle}`}
    <br/>
    {`${pdContentTitle2}`}
    </h2>
    <div className="d-flex align-items-baseline">
      <MdFilterList className="mr-2" style={{fontSize:'1rem', lineHeight:'1.5rem'}} />
      <Form onChange={(e)=>getSelectedValue(e)}>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Control as="select" custom>
            <option selected={sort === '' ? "selected" : ''}>排序</option>
            <option value="priceDESC">價格由高到低</option>
            <option value="priceASC">價格由低到高</option>
            <option value="starsDESC">評價由高到低</option>
            <option value="starsASC">評價由低到高</option>
          </Form.Control>
        </Form.Group>
     </Form>
    </div>
     
    </div>
     
    <QueueAnim className={`demo-content row flex-wrap`}>
      {products.map((item, index) => {
          return <PdContentItem key={item.id} products={item}/>
        })}
     
     </QueueAnim> 
    </div>
    
    </>
  );
  
}

export default PdContent