import React from 'react';
import Header from '../components/Header';
import SdkComponent from '../components/SdkComponent';
import Tray from '../components/Tray';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <SdkComponent />
        <Tray />
        <Sidebar />
      </main>
      <Footer />
    </div>
  );
};

export default Home;