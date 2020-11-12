import React from 'react';
import '../styles/IndexShop.scss';
// Icons
import { BiFastForward } from 'react-icons/bi';

//  Card component of material-ui 
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    width: '20rem',
    // height: '21rem',
  },
  media: {
    width: '20rem',
    height: '15rem',
  },
});

function IndexShop(props) {  
const classes = useStyles();
  return (
    <>
      <div className="IndexShopPage">
        <div className="IndexShopPageTitleBox d-flex">
          <h3 className="IndexShopPageTitle mx-auto my-auto">話題商品</h3>
        </div>
        <div className="IndexShopPageInfoBox">
          <div className="InfoContent d-flex mx-auto flex-column">
            <h3 className="InfoContentTitle mx-auto mt-5">
              支持&創造屬於你的頻道
            </h3>
            <p className="InfoContentText1">
              是否覺得有許多故事想與他人分享，抑或是發現沒有相關興趣的頻道呢？別擔心，在這裡你也可以成為播客，加入平台的大家庭，並將自身的經歷與見解與他人分享。
            </p>
            <p className="InfoContentText2">
              在這邊你也可以支持你最喜愛的播客，即刻購入周邊商品，幫助你喜愛的播客產出更多優質的節目內容！
            </p>
            <Button className="mx-auto">加入成為播客</Button>
          </div>
        </div>
        <div className="StoreTitlePodcaster row no-gutters">
          <div className="StoreTitleTag mr-auto">播客周邊</div>
          <div className="StoreMoreTag d-flex align-items-center">
            <Button className="d-flex mt-2 mx-auto">
              更多播客周邊
              <BiFastForward />
            </Button>
          </div>
        </div>
        <div className="StorePodcasterCardGroup d-flex">
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/img/IndexProduct1.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lizard
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button className="d-flex mt-2 mx-auto">
                馬上去看看
                <BiFastForward />
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/img/IndexProduct2.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lizard
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button className="d-flex mt-2 mx-auto">
                馬上去看看
                <BiFastForward />
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/img/IndexProduct3.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lizard
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button className="d-flex mt-2 mx-auto">
                馬上去看看
                <BiFastForward />
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/img/IndexProduct4.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lizard
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button className="d-flex mt-2 mx-auto">
                馬上去看看
                <BiFastForward />
              </Button>
            </CardActions>
          </Card>
        </div>
        <div className="StoreTitleProduct row no-gutters">
          <div className="StoreTitleTag mr-auto">開播必備</div>
          <div className="StoreMoreTag d-flex align-items-center">
            <Button className="d-flex mt-2 mx-auto">
              更多優質設備
              <BiFastForward />
            </Button>
          </div>
        </div>
        <div className="StoreProductCardGroup d-flex">
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/img/IndexProduct8.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lizard
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button className="d-flex mt-2 mx-auto">
                馬上去看看
                <BiFastForward />
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/img/IndexProduct7.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lizard
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button className="d-flex mt-2 mx-auto">
                馬上去看看
                <BiFastForward />
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/img/IndexProduct6.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lizard
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button className="d-flex mt-2 mx-auto">
                馬上去看看
                <BiFastForward />
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/img/IndexProduct5.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lizard
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button className="d-flex mt-2 mx-auto">
                馬上去看看
                <BiFastForward />
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </>
  );
}

export default IndexShop;
