import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TveAuth from './pages/TveAuth';
import SdkOneApp from './pages/SdkOneApp';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import "./styles/main.scss"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<TveAuth />} />
      <Route path="/app" element={<SdkOneApp />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;