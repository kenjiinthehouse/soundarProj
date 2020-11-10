import React, { useState } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//components
import MyNavbar from './jay/jay_components/MyNavbar.js';
import ScrollToTop from './jay/jay_components/ScrollToTop.js';
import MainContent from './jay/jay_components/MainContent.js';
import { Layout } from 'antd';

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
import ActivityCart from './chieh/ch_pages/ActivityCart';
import ActivityOrder from './chieh/ch_pages/ActivityOrder';
import StudioMain from './chieh/ch_pages/StudioMain';
import Payment from './chieh/ch_pages/Payment';

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
              <Route exact path="/channel_info/:podcaster_id?">
                <PodcasterDashboardHome />
              </Route>
              <Route exact path="/channel_audio_list/:podcaster_id?">
                <PodcasterAudioList
                  globalAudioArry={globalAudioArry}
                  setGlobalAudioArry={setGlobalAudioArry}
                />
              </Route>
              <Route exact path="/explore_home_page">
                <ExploreHomePage
                  globalAudioArry={globalAudioArry}
                  setGlobalAudioArry={setGlobalAudioArry}
                />
              </Route>
              <Route exact path="/explore/category/:cate_term">
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
              <Route path="/channel_page/:cate_term/:podcaster_id/:audio_sid">
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
              <Route path="/activitycart">
                <ActivityCart />
              </Route>
              <Route path="/activityorder">
                <ActivityOrder />
              </Route>
              <Route path="/studiomain">
                <StudioMain />
              </Route>
              <Route path="/payment">
                <Payment />
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
      </Layout>
    </Router>
  );
}

export default App;
