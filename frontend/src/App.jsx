import { useState,useEffect } from 'react'
import './App.css'
import Home from './components/Home'
import {Routes,Route, useNavigate} from 'react-router-dom';
import SellerLogin from './components/SellerLogin'
import SellerSignup from './components/SellerSignup'
import SellerProducts from './components/SellerProducts';
import AddProduct from './components/AddProduct';
import Cookies from 'js-cookie';


function App() {
  const [count, setCount] = useState(0);
  const navigate=useNavigate();

  

  return (
    <div>

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/seller/login' element={<SellerLogin/>}/>
        <Route path='/seller/signup' element={<SellerSignup/>}/>
        <Route path='/sellerproducts/:id'element={<SellerProducts/>}/>
        <Route path='/add-product/:id' element={<AddProduct/>}/>
      </Routes>
      
    </div>
    
  )
}

export default App