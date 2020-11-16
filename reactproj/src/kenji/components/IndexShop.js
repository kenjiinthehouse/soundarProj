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
    // display:'flex',
    // flexDirection:'column',
    // alignItems:'center',
    // height: '21rem',
  },
  media: {
    width: '20rem',
    height: '15rem',
  },
  content: {
    width: '100%',
    height: '10rem',
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
            <Button
              className="d-flex mt-2 mx-auto"
              href="http://localhost:3000/productlist"
            >
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
                image="./k_img/IndexProduct1.jpg"
                title="Contemplative Reptile"
              />
              <CardContent
                className={classes.content}
                className={classes.content}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  align="center"
                >
                  星箭廣播線下見面會門票
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  《星箭廣播》粉絲見面會台北站，入場門票，當日入場者方可適用，包括11:00開放的周邊選購，以及見面會後的簽名活動。
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                className="d-flex mt-2 mx-auto hrefToProduct"
                href="http://localhost:3000/product/310"
              >
                馬上去看看
                <BiFastForward />
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="./k_img/IndexProduct2.jpg"
                title="Contemplative Reptile"
              />
              <CardContent
                className={classes.content}
                className={classes.content}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  align="center"
                >
                  區塊勢馬克杯
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  大容量的杯子，一次可以裝足量的咖啡或茶。粗製的圓手柄，讓提握手感更舒適。樸實牛奶白和溫潤天空藍釉色，搭配杯底細緻手作刻紋，品味日常的單純幸福。
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                className="d-flex mt-2 mx-auto hrefToProduct"
                href="http://localhost:3000/product/310"
              >
                馬上去看看
                <BiFastForward />
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="./k_img/IndexProduct3.jpg"
                title="Contemplative Reptile"
              />
              <CardContent
                className={classes.content}
                className={classes.content}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  align="center"
                >
                  Soundar訂閱紀念帆布袋
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  輕便精巧的托特包，簡約的設計且符合日常使用，輕鬆收納13吋筆電和A4文件，除了有四個口袋，線材和鑰匙收納是此款包最大亮點。
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                className="d-flex mt-2 mx-auto hrefToProduct"
                href="http://localhost:3000/product/309"
              >
                馬上去看看
                <BiFastForward />
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="./k_img/IndexProduct4.jpg"
                title="Contemplative Reptile"
              />
              <CardContent className={classes.content}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  align="center"
                >
                  Tech Tales 紀念帆布袋
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  輕便精巧的托特包，簡約的設計且符合日常使用，輕鬆收納13吋筆電和A4文件，除了有四個口袋，線材和鑰匙收納是此款包最大亮點。
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                className="d-flex mt-2 mx-auto hrefToProduct"
                href="http://localhost:3000/product/306"
              >
                馬上去看看
                <BiFastForward />
              </Button>
            </CardActions>
          </Card>
        </div>
        <div className="StoreTitleProduct row no-gutters">
          <div className="StoreTitleTag mr-auto">開播必備</div>
          <div className="StoreMoreTag d-flex align-items-center">
            <Button
              className="d-flex mt-2 mx-auto"
              href="http://localhost:3000/productlist"
            >
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
                image="./k_img/IndexProduct8.jpg"
                title="Contemplative Reptile"
              />
              <CardContent className={classes.content}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  align="center"
                >
                  EVO 4 Podcast套組
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  EVO 4
                  Podcast新手套組對於初學者來說是一套非常好的硬體，既方便又省錢，加購商品的價格也很便宜合理。
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                className="d-flex mt-2 mx-auto hrefToProduct"
                href="https://bit.ly/30w9ycN"
              >
                馬上去看看
                <BiFastForward />
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="./k_img/IndexProduct7.jpg"
                title="Contemplative Reptile"
              />
              <CardContent className={classes.content}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  align="center"
                >
                  多重指向性電容型麥克風
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  DC48V的幻象電源專用，具高感度、及高承受入力高等特性,採用大口徑雙鍍金振動膜的可變型指向性。
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                className="d-flex mt-2 mx-auto hrefToProduct"
                href="http://localhost:3000/product/285"
              >
                馬上去看看
                <BiFastForward />
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="./k_img/IndexProduct6.jpg"
                title="Contemplative Reptile"
              />
              <CardContent className={classes.content}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  align="center"
                >
                  指向真空管電容型麥克風
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  使用新開發的「雙波形振動膜（PAT.）」，帶來高感度與低雜訊位準,配備浮懸機構的元件提升耐震性，加強隔離雜訊,變壓輸出帶來低頻寬的直線性,音質清晰鮮明，自然不誇張,真空管預熱迅速，使用方便。
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                className="d-flex mt-2 mx-auto hrefToProduct"
                href="http://localhost:3000/product/310"
              >
                馬上去看看
                <BiFastForward />
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="./k_img/IndexProduct5.jpg"
                title="Contemplative Reptile"
              />
              <CardContent className={classes.content}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  align="center"
                >
                  無線耳罩式耳機
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  以無線傳輸更深沉、更鮮明的重低音。搭載降噪功能。藉由收音麥克風及收音孔最佳的位置排列，打造出自然的降噪空間。
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                className="d-flex mt-2 mx-auto hrefToProduct"
                href="http://localhost:3000/product/310"
              >
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
