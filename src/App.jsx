import React, { createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Component/Home';
import Cart from './Component/Cart';
import productsData from './Component/products.json';

// Create context
export const ProductContext = createContext();

const App = () => {

  
  return (
    <ProductContext.Provider value={productsData.products}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </ProductContext.Provider>
  );
}

export default App;