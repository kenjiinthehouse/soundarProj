import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '12rem' + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const marks = [
    {
      value: 0,
      label: '$1000'
    },
    {
      value: 5000,
      label: '$5000'
    },
    {
      value:10000,
      label: '$10000'
    },
  ];
const IOSSlider = withStyles({
  root: {
    color: '#3880ff',
    height: 4,
    padding: '15px 0',
  },
  thumb: {
    height: 16,
    width: 16,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    marginTop: -8,
    marginLeft: -8,
    '&:focus, &:hover, &$active': {
      boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50%)',
    top: -20,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
    padding:2
  },
  track: {
    height: 4,
    // background:'transparent'
  },
//   rail: {
//     height: 2,
//     opacity: 0.5,
//     backgroundColor: '#bfbfbf',
//   },
  rail: {
    height: 4,
    borderRadius: 4,
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
    '& span':{color:'red'}
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
})(Slider);



export default function CustomizedSlider() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IOSSlider aria-label="ios slider" defaultValue={[1000,5000]} marks={marks} valueLabelDisplay="auto" max={10000}/>
      
      <div className={classes.margin} />
      
    </div>
  );
}