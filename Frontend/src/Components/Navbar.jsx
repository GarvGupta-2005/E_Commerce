import React, { useContext, useState } from 'react'
import { assets, products } from '../assets/assets';
import { NavLink, Link, } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext'

const Navbar = () => {

  const [visible, setVisble] = useState(false)

  const { setShowSearch, getCartCount, token, setToken, navigate, setCartItems } = useContext(ShopContext)

  const logout = () => {
    navigate('/login')

    localStorage.removeItem('token')
    setToken('')
    setCartItems({})


  }
  return (
    <div className='flex items-center justify-between py-5 from-neutral-700 font-bold'>

      <Link to='/'> <img src={assets.logo} className='w-36' alt='Logo'></img></Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>

        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
        </NavLink>
        <NavLink to='/collections' className='flex flex-col items-center gap-1'>
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
        </NavLink>

        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
        </NavLink>


      </ul>

      <div className='flex items-center gap-6'>
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} alt='search' className='w-5 cursor-pointer size-18'></img>
        <div className='group relative'>
          <img onClick={()=>token? null:navigate('/login')} src={assets.profile_icon} className='' alt='profile' />
          {token &&
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500'>
              <p className='cursor-pointer hover:text-black'>MyProfile</p>
              <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
              <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>}
        </div>
        <Link to='/cart' className="relative">
          <img src={assets.cart_icon} className='w-5 min-w-5' alt='cart'></img>
          <p className='absolute text-center right-[-5px] bottom-[-5px] w-4 leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
        </Link>
        <img onClick={() => setVisble(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt=''></img>
      </div>

      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>

        <div className='flex flex-col text-gray-600'>

          <div className='flex items-center gap-4'>
            <img onClick={() => setVisble(false)} className='h-4 rotate-180' src={assets.dropdown_icon} alt='dropdown'></img>
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisble(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisble(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={() => setVisble(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setVisble(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>

        </div>
      </div>

    </div>


  )
}

export default Navbar