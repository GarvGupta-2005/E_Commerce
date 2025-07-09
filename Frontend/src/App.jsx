import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import Collection from './Pages/Collection'
import Login from './Pages/Login'
import PlaceOrders from './Pages/PlaceOrders'
import Orders from './Pages/Orders'
import Cart from './Pages/Cart'
import Product from './Pages/Product'
import Contact from './Pages/Contact'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { About } from './Pages/About'
import SearchBar from './Components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg-px[9vw]'>
      <ToastContainer/>
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home></Home>}/>
        <Route path='/collections' element={<Collection></Collection>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/product/:productId' element={<Product></Product>}/>
        <Route path='/contact' element={<Contact></Contact>}/>
        <Route path='/cart' element={<Cart></Cart>}/>
        <Route path='/login' element={<Login></Login>}/>
        <Route path='/place-order' element={<PlaceOrders></PlaceOrders>}/>
        <Route path='/orders' element={<Orders></Orders>}/>


      </Routes>
      <Footer/>
    </div>
  )
}

export default App