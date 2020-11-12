import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { red } from '@material-ui/core/colors';


import AcContentItem from './AcContentItem'
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

function AcContent(props) {

  //Reckie原本的
  // const {pds,viewFilter,products} =props
  // const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandEnter = () => {
    setExpanded(!expanded);
  };
  const handleExpandLeave = () => {
    setExpanded(false);
  };

  //活動資料
  const [activityData, setActivityData] = useState([])

  async function getActivityFromServer() {
    const url = 'http://localhost:5566/activity/list'
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
    setActivityData([...data])    
  } 
 
  useEffect(() => {
      getActivityFromServer()
  }, [])


  return (
    <>
    <QueueAnim className="pdContent demo-content d-flex flex-wrap mx-auto">    
        {activityData.map((item, index) => {          
          return <AcContentItem key={item.id} activityData={item}/>       
        })}
     </QueueAnim>
    </>
  );
  
}

export default AcContent