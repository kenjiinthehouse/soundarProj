import React, { useState } from 'react';
import './App.css';
// import './reckie/styles/custom.scss';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//components

import ScrollToTop from './jay/jay_components/ScrollToTop.js';
import MainContent from './jay/jay_components/MainContent.js';
import { Layout } from 'antd';

//index page
import MyNavbar from './kenji/components/MyNavbar';
import IndexCarousel from './kenji/components/IndexCarousel';
import IndexInfo from './kenji/components/IndexInfo';
import IndexChannel from './kenji/components/IndexChannel';
import IndexPodcastEp from './kenji/components/IndexPodcastEp';
import IndexShop from './kenji/components/IndexShop';
import ArticleCarousel from './kenji/components/ArticleCarousel';
import MyFooter from './kenji/components/MyFooter';


//pages
import PodcasterDashboardHome from './jay/jay_pages/PodcasterDashboardHome';
import AudioPlayer from './jay/jay_components/AudioPlayer.js';
import PodcasterAudioList from './jay/jay_pages/PodcasterAudioList.js';
import ExploreHomePage from './jay/jay_pages/ExploreHomePage.js';
import ExploreCateChannelPage from './jay/jay_pages/ExploreCateChannelPage.js';
import ChannelPage from './jay/jay_pages/ChannelPage.js';
import ChannelAudioPage from './jay/jay_pages/ChannelAudioPage.js';
import ArticleHome from './jen/pages/ArticleHome';
import ArticlePage from './jen/pages/ArticlePage';
import Cart from './ruby/ruby_pages/CartPage.js';
import Checkout from './ruby/ruby_pages/CheckoutPage.js';
import Orderlist from './ruby/ruby_pages/OrderPage.js';
import ActivityMain from './chieh/ch_pages/ActivityMain';
// import ActivityCart from './chieh/ch_pages/ActivityCart';
import ActivityOrder from './chieh/ch_pages/ActivityOrder';
import StudioMain from './chieh/ch_pages/StudioMain';
// import Payment from './chieh/ch_pages/Payment';
import Applymembership from './samps/pages/Applymembership';
import Audiocollection from './samps/pages/Audiocollection';
import Channelcollection from './samps/pages/Channelcollection';
import Membersidebar from './samps/pages/Membersidebar';
import Passwordreset from './samps/pages/Passwordreset';
import Podlogin from './samps/pages/Podlogin';
import Verification from './samps/pages/Verification';
import ProductMainPage from './reckie/pages/ProductMainPage';
import ProductItemPage from './reckie/pages/ProductItemPage';
import { colors } from '@material-ui/core';
import { Height } from '@material-ui/icons';


function App() {
  const [globalAudioArry, setGlobalAudioArry] = useState([]);
  const [audioPlayerTheme, setAudioPlayerTheme] = useState('dark');
  const [playingAudio, setPlayingAudio] = useState(null);

  return (
    <Router>
      <Layout>
        <MyNavbar />
        <MainContent>
          <ScrollToTop>
            <Switch>
              <Route exact path="/">
                <div className="indexDiv" style={{ backgroundColor: '#232d2f',width:'100%',height:'100%' }}>
                  <IndexCarousel />
                  <IndexInfo />
                  <IndexChannel />
                  <IndexPodcastEp />
                  <IndexShop />
                  <ArticleCarousel />
                </div>
              </Route>
              <Route path="/explore_home_page">
                <ExploreHomePage
                  globalAudioArry={globalAudioArry}
                  setGlobalAudioArry={setGlobalAudioArry}
                />
              </Route>
              <Route path="/explore/category/:cate_term">
                <ExploreCateChannelPage
                  globalAudioArry={globalAudioArry}
                  setGlobalAudioArry={setGlobalAudioArry}
                />
              </Route>
              <Route exact path="/channel_page/:cate_term/:podcaster_id">
                <ChannelPage
                  globalAudioArry={globalAudioArry}
                  setGlobalAudioArry={setGlobalAudioArry}
                  playingAudio={playingAudio}
                  setPlayingAudio={setPlayingAudio}
                />
              </Route>
              <Route
                exact
                path="/channel_page/:cate_term/:podcaster_id/:audio_sid"
              >
                <ChannelAudioPage
                  globalAudioArry={globalAudioArry}
                  setGlobalAudioArry={setGlobalAudioArry}
                  playingAudio={playingAudio}
                  setPlayingAudio={setPlayingAudio}
                />
              </Route>
              <Route path="/article">
                <ArticleHome />
              </Route>
              <Route path="/articlepage/:sid">
                <ArticlePage />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
              <Route path="/checkout">
                <Checkout />
              </Route>
              <Route path="/orderlist">
                <Orderlist />
              </Route>
              <Route path="/activitymain">
                <ActivityMain />
              </Route>
              {/* <Route path="/activitycart">
                <ActivityCart />
              </Route> */}
              <Route path="/activityorder">
                <ActivityOrder />
              </Route>
              <Route path="/studiomain">
                <StudioMain />
              </Route>
              {/* <Route path="/payment">
                <Payment />
              </Route> */}
              <Route path="/login">
                <Podlogin />
              </Route>
              <Route path="/verify">
                <Verification />
              </Route>
              <Route path="/passwordreset">
                <Passwordreset />
              </Route>
              <Route path="/applymember">
                <Applymembership />
              </Route>
              <Route path="/memberedit">
                <Membersidebar
                  globalAudioArry={globalAudioArry}
                  setGlobalAudioArry={setGlobalAudioArry}
                />
              </Route>
              <Route path="/audiocollect">
                <Audiocollection
                  globalAudioArry={globalAudioArry}
                  setGlobalAudioArry={setGlobalAudioArry}
                />
              </Route>
              <Route path="/channelcollect">
                <Channelcollection />
              </Route>

              <Route path="/productlist/:page?">
                <ProductMainPage />
              </Route>
              <Route path="/product/:pd_id?">
                <ProductItemPage />
              </Route>
            </Switch>
          </ScrollToTop>

          <AudioPlayer
            globalAudioArry={globalAudioArry}
            setGlobalAudioArry={setGlobalAudioArry}
            audioPlayerTheme={audioPlayerTheme}
            setAudioPlayerTheme={setAudioPlayerTheme}
            playingAudio={playingAudio}
            setPlayingAudio={setPlayingAudio}
          />
        </MainContent>
        <MyFooter />
      </Layout>
    </Router>
  );
}

export default App;
