import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoadingScreen from './components/LoadingScreen';
import NavBar from './components/NavBar';
import ProtectedRoutes from './components/ProtectedRoutes';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import Purchases from './pages/Purchases';
import { getProductsThunk } from './store/slices/products.slice';

function App() {

  const isLoading = useSelector( state => state.isLoading );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch( getProductsThunk() );
  }, []);

  return (
    <HashRouter>
      <NavBar />
      { isLoading && <LoadingScreen /> } 
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/products/:id" element={ <Products /> } />
        <Route path="/login" element={ <Login /> } />

        <Route element={ <ProtectedRoutes /> }>
          <Route path="/purchases" element={ <Purchases /> } />
        </Route>

      </Routes>
    </HashRouter>
  )
}

export default App
