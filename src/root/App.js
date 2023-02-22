import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from '../components/header';

import Cart from '../views/cart/Cart';
import Home from '../views/home/Home';
import NotFound from '../views/notFound';

import './App.scss';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
