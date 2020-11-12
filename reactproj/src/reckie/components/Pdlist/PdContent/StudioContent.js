import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { red } from '@material-ui/core/colors';


import StudioContentItem from './StudioContentItem'
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

function StudioContent(props) {
  const{value,pdIndex}=props

 
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandEnter = () => {
    setExpanded(!expanded);
  };
  const handleExpandLeave = () => {
    setExpanded(false);
  };

  //錄音室資料
  const [studioData, setStudioData] = useState([])

  async function getStudioFromServer() {
    const url = 'http://localhost:5566/studio/list'
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    console.log(data)
    setStudioData([...data])    
  } 
 
  // 一開始就會開始載入資料
  useEffect(() => {
      getStudioFromServer()
  }, [])


  return (
    <>
    <QueueAnim className={`pdContent demo-content d-flex flex-wrap mx-auto ${(value===pdIndex)?'':'reHidden'}`}>    
        {studioData.map((item, index) => {          
          return <StudioContentItem key={item.id} studioData={item}/>       
        })}
     </QueueAnim>
    </>
  );
  
}

export default StudioContent