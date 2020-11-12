import React from 'react';
import '../styles/IndexChannel.scss';
import Button from '@material-ui/core/Button';
import News from '../img/News.jpg'
import Cover from '../img/cover1.jpg';
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
import {BiFastForward} from 'react-icons/bi';
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
    marginBottom: '0.2rem',
    backgroundColor: 'transparent',
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
    margin: 'auto',
  },
  title: {
    color: '#f8f8f8',
  },
  text: {
    color: '#f8f8f8',
  },
}));





function IndexChannel(props) {
   const classes = useStyles();
   const theme = useTheme();
  return (
    <>
      <div className="IndexChannelContainer">
        <div className="IndexChannelPageTitleBox d-flex">
          <h3 className="IndexChannelPageTitle mx-auto my-auto">熱門分類</h3>
        </div>
        <div className="IndexChannelPageBox d-flex">
          <div className="IndexChannelPageBoxCate flex-column">
            <Button>
              新聞
              <GiNewspaper />
            </Button>
            <Button>
              娛樂
              <GiConsoleController />
            </Button>
            <Button>
              科技
              <GiComputing />
            </Button>
            <Button>
              運動
              <GiThrowingBall />
            </Button>
            <Button>
              商業
              <GiSuitcase />
            </Button>
            <Button>
              故事
              <GiWhiteBook />
            </Button>
            <Button>
              教育
              <GiTeacher />
            </Button>
          </div>
          <div className="IndexChannelPageBoxContent d-flex">
            <img src={News} />
            <QueueAnim
              delay={500}
              type={['right', 'left']}
              className="queue-simple"
            >
              <div className="ChannelDrawer" key="1">
                <div className="ChannelCard mx-auto">
                  <QueueAnim
                    delay={500}
                    interval={300}
                    type={['right', 'left']}
                    className="queue-simple"
                  >
                    <Card key="2" className={classes.root} data-cardId="1">
                      <div className={classes.details}>
                        <CardContent className={classes.content}>
                          <Typography
                            component="h5"
                            variant="h5"
                            className={classes.title}
                          >
                            Live From Space
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            className={classes.text}
                          >
                            Mac Miller
                          </Typography>
                        </CardContent>
                      </div>
                      <CardMedia className={classes.cover} image={Cover} />
                    </Card>
                    <Card key="3" className={classes.root} data-cardId="2">
                      <div className={classes.details}>
                        <CardContent className={classes.content}>
                          <Typography
                            component="h5"
                            variant="h5"
                            className={classes.title}
                          >
                            Live From Space
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            className={classes.text}
                          >
                            Mac Miller
                          </Typography>
                        </CardContent>
                      </div>
                      <CardMedia className={classes.cover} image={Cover} />
                    </Card>
                    <Card key="4" className={classes.root} data-cardId="3">
                      <div className={classes.details}>
                        <CardContent className={classes.content}>
                          <Typography
                            component="h5"
                            variant="h5"
                            className={classes.title}
                          >
                            Live From Space
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            className={classes.text}
                          >
                            Mac Miller
                          </Typography>
                        </CardContent>
                      </div>
                      <CardMedia className={classes.cover} image={Cover} />
                    </Card>
                    <Card key="5" className={classes.root} data-cardId="4">
                      <div className={classes.details}>
                        <CardContent className={classes.content}>
                          <Typography
                            component="h5"
                            variant="h5"
                            className={classes.title}
                          >
                            Live From Space
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            className={classes.text}
                          >
                            Mac Miller
                          </Typography>
                        </CardContent>
                      </div>
                      <CardMedia className={classes.cover} image={Cover} />
                    </Card>
                    <Button key="6" className=" d-flex mt-2 mx-auto">
                      更多優質頻道
                      <BiFastForward />
                    </Button>
                  </QueueAnim>
                </div>
              </div>
            </QueueAnim>
          </div>
        </div>
      </div>
    </>
  );
}

export default IndexChannel;
