import React from 'react';
import Header from '../components/Header';
import VlPlayer from '../components/VlPlayer';
import Tray from '../components/Tray';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <VlPlayer />
        <Tray />
        <Sidebar />
      </main>
      <Footer />
    </div>
  );
};

export default Home;