import React, { useState } from 'react';
import Header from '../../components/Header';
import VlPlayer from '../../components/VlPlayer';
import Tray from '../../components/Tray';
import trayData from '../../components/Tray/trayData';  
import "./style.scss"

const Home = () => {
  const [selectedVideoId, setSelectedVideoId] = useState( trayData?.[0]?.videoId || null);
  console.log("selectedVideoId: ",selectedVideoId)

  return (
    <div className="home-page">
      <Header />
      <main className="home-main">
        <div className="home-content">
          <VlPlayer videoId={selectedVideoId} />
          <Tray setVideoId={setSelectedVideoId} />
        </div>
      </main>
    </div>
  );
};

export default Home;