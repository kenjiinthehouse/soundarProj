import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabPanel';

import PdSideBar2 from './PdSideBar2';
import PdContent from './PdContent/PdContent';
import Breadcrumb from '../Breadcrumb';

//活動、錄音室
import AcContent from './PdContent/AcContent';
import StudioContent from './PdContent/StudioContent';

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: '#44494a',
    // fontWeight: theme.typography.fontWeightRegular,
    // fontSize: theme.typography.pxToRem(15),
    fontFamily: 'NotoSansTC',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    lineHeight: '1.5',
    letterSpacing: '1.2px',
    padding: '0rem 5rem',
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
      outline: 'none',
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderBottom: '0.25rem solid transparent',
    '& > span': {
      maxWidth: 200,
      width: '100%',
      backgroundColor: '#2690df',
      padding: '3rem',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
    marginTop: '5rem',
    borderBottom: '20px solid #red',
  },
  indicator: {
    borderBottom: '1px solid #ccc',
  },
  panel: {
    width: '100%',
    display: 'flex',
  },
}));

function TabBar(props) {
  const { mainCate, setMainCate, setDetailCate, sort, setSort } = props;
  const classes = useStyles();
  // const [viewFilter, setViewFilter] = useState(10)

  const [value, setValue] = React.useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // console.log('value',value)
  }, [value]);

  //篩選products分類資料
  {
    /* detailCate: 1:耳塞式耳機_有線 2:耳塞式耳機_無線 3:耳罩式耳機_有線 4:耳罩式耳機_無線 5:專業麥克風_有線 6:shirt 7:帆布包 8:馬克杯 */
  }
  return (
    <div className={classes.root}>
      <div className={classes.indicator}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          centered
        >
          <StyledTab
            label="錄音設備"
            {...a11yProps(0)}
            onClick={() => {
              setMainCate(1);
              setDetailCate('');
            }}
          />
          <StyledTab
            label="播客周邊"
            {...a11yProps(1)}
            onClick={() => {
              setMainCate(2);
              setDetailCate('');
            }}
          />
          <StyledTab label="線下活動" {...a11yProps(2)} />
          <StyledTab label="錄音室租借" {...a11yProps(3)} />
        </StyledTabs>
      </div>

      <TabPanel component="div">
        <Breadcrumb value={value} setValue={setValue} />
        <div className={classes.panel}>
          {/* <SideBar/> */}
          <PdSideBar2 value={value} pdIndex={0} {...props} />
          <PdSideBar2 value={value} pdIndex={1} {...props} />
          <PdSideBar2 value={value} pdIndex={2} {...props} />
          <PdSideBar2 value={value} pdIndex={3} {...props} />
          {/* <PdContent 
          {...props}
<<<<<<< HEAD
          viewFilter={viewFilter}
          /> */}
          {/* 活動 */}
          {/* <AcContent 
            viewFilter={viewFilter}
          /> */}
          {/* 錄音室 */}
          {/* <StudioContent viewFilter={viewFilter} />
          ======= /> >>>>>>> reckie */}
        </div>
      </TabPanel>
    </div>
  );
}
export default TabBar;
