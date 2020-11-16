import React, { useEffect, useState } from 'react';
import '../styles/IndexChannel.scss';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { initalExploreCatePageAsync } from '../../jay_actions/index';
import { withRouter } from 'react-router-dom';

import { Rate, Input } from 'antd';

//icons
import {
  GiNewspaper,
  GiConsoleController,
  GiComputing,
  GiThrowingBall,
  GiWhiteBook,
  GiTeacher,
  GiSuitcase,
} from 'react-icons/gi';
import { BiFastForward } from 'react-icons/bi';
// ChannelCard
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import QueueAnim from 'rc-queue-anim';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '7rem',
    marginBottom: '0.5rem',
    backgroundColor: 'rgba(35,45,47,0.5)',
    justifyContent: 'space-between',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '5rem',
    height: '5rem',
    display: 'flex',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: '1rem',
  },
  title: {
    color: '#f8f8f8',
  },
  text: {
    color: '#f8f8f8',
  },
}));
//     case 'news':('新聞');
//     case 'society':('故事');
//     case 'education':('教育');
//     case 'health':('健康');
//     case 'sports':('運動');
//     case 'technology':('科技');
//     case 'business':('商業');
//     case 'entertainment':('娛樂');
function IndexChannel(props) {
  const classes = useStyles();
  const [cateState, setCateState] = useState('news');
  const [bcgImg, setBcgImg] = useState('./k_img/News.jpg');
  // const imgs = {
  //   news: './k_img/News.jpg',
  //   society: './k_img/Story.jpg',
  //   education: './k_img/Edu.jpg',
  //   sports: './k_img/Sport.jpg',
  //   technology: './k_img/Tech.jpg',
  //   business: './k_img/Business.jpg',
  //   entertainment: './k_img/Fun.jpg',
  // };

  useEffect(() => {
    props.initalExploreCatePageAsync(cateState);
    setBcgImg(`./k_img/${cateState}.jpg`);
  }, [cateState]);

  return (
    <>
      <div className="IndexChannelContainer">
        <div className="IndexChannelPageTitleBox d-flex">
          <h3 className="IndexChannelPageTitle mx-auto my-auto">熱門分類</h3>
        </div>
        <div className="IndexChannelPageBox d-flex">
          <div className="IndexChannelPageBoxCate flex-column">
            <Button
              onClick={() => {
                setCateState('news');
                setBcgImg(`./k_img/${cateState}.jpg`);
              }}
            >
              新聞
              <GiNewspaper />
            </Button>
            <Button
              onClick={() => {
                setCateState('entertainment');
                setBcgImg(`./k_img/${cateState}.jpg`);
              }}
            >
              娛樂
              <GiConsoleController />
            </Button>
            <Button
              onClick={() => {
                setCateState('technology');
                setBcgImg(`./k_img/${cateState}.jpg`);
              }}
            >
              科技
              <GiComputing />
            </Button>
            <Button
              onClick={() => {
                setCateState('sports');
                setBcgImg(`./k_img/${cateState}.jpg`);
              }}
            >
              運動
              <GiThrowingBall />
            </Button>
            <Button
              onClick={() => {
                setCateState('business');
                setBcgImg(`./k_img/${cateState}.jpg`);
              }}
            >
              商業
              <GiSuitcase />
            </Button>
            <Button
              onClick={() => {
                setCateState('society');
                setBcgImg(`./k_img/${cateState}.jpg`);
              }}
            >
              故事
              <GiWhiteBook />
            </Button>
            <Button
              onClick={() => {
                setCateState('education');
              }}
            >
              教育
              <GiTeacher />
            </Button>
          </div>
          <div className="IndexChannelPageBoxContent d-flex">
            <img src={bcgImg} />

            <div className="ChannelDrawer">
              <div className="ChannelCard mx-auto">
                <QueueAnim
                  delay={500}
                  type={['right', 'left']}
                  className="queue-simple"
                  forcedReplay={true}
                >
                  {/* 引入內容 */}
                  {props.cateChannel.map((item, index) => {
                    if (index < 4)
                      return (
                        <Card
                          key={index}
                          className={classes.root}
                          data-cardId="1"
                          onClick={() =>
                            props.history.push(
                              `/channel_page/${item.channel_catagory.toLowerCase()}/${
                                item.podcaster_id
                              }`
                            )
                          }
                        >
                          {/* channel_page/news/8 */}
                          <div className={classes.details}>
                            <CardContent className={classes.content}>
                              <Typography
                                component="h5"
                                variant="h5"
                                className="indexChannelTitle"
                              >
                                {item.channel_title}
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                color="textSecondary"
                                className={classes.text}
                              >
                                <Rate
                                  style={{
                                    filter: 'brightness(1)',
                                    fontSize: '1rem',
                                  }}
                                  allowHalf
                                  disabled
                                  defaultValue={item.channel_rating}
                                />
                              </Typography>
                            </CardContent>
                          </div>
                          <CardMedia
                            className={classes.cover}
                            image={item.podcaster_img}
                          />
                        </Card>
                      );
                  })}

                  <Button key="6" className=" d-flex mt-2 mx-auto">
                    更多優質頻道
                    <BiFastForward />
                  </Button>
                </QueueAnim>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (store) => {
  return {
    cateChannel: store.exploreCateChannel,
  };
};

export default withRouter(
  connect(mapStateToProps, { initalExploreCatePageAsync })(IndexChannel)
);
