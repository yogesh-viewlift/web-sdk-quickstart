import React from 'react';
import { createRoot } from 'react-dom/client';
import Home from './pages/Home';
import './styles/main.scss';

const root = createRoot(document.getElementById('root'));
root.render(<Home />);