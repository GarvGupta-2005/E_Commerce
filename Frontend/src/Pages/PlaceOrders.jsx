import React, { useContext, useState } from 'react'
import Title from '../Components/Title'
import CartTotal from '../Components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../Context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrders = () => {

  const [method, setMethod] = useState('cod')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }))
  }

  const { navigate, backendURL, token, setToken, cartItems, setCartItems, delivery_fee, getCartAmount, products } = useContext(ShopContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }


      switch (method) {
        case 'cod':
          const response = await axios.post(backendURL + '/api/order/place', orderData, { headers: { token } })
          if (response.data.success) {
            setCartItems({});
            navigate('/orders')
            toast.success('Wohoo! Order Placed 🎉');

          } else {
            toast.error(response.data.message)
          }
          break;
        case 'mockpay':
          const createRes = await axios.post(backendURL + '/api/order/mockpay', orderData, {
            headers: { token },
          });

          if (createRes.data.success) {
            const orderId = createRes.data.orderId;
            toast.info("Redirecting to fake payment...");

            setTimeout(async () => {
              const verifyRes = await axios.post(backendURL + '/api/order/mockverify', { orderId }, {
                headers: { token },
              });
              if (verifyRes.data.success) {
                setCartItems({});
                navigate('/orders');
                toast.success("Mock Payment Successful & Order Placed 🎉");
              } else {
                toast.error("Payment Failed");
              }
            }, 1500);
          } else {
            toast.error(createRes.data.message);
          }
          break;

        default:
          break;
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

      {/* Left Side */}

      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='First Name' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='Last Name' />
        </div>
        <input required onChange={onChangeHandler} value={formData.email} name='email' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="email" placeholder='Enter zyour email' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='Street' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} value={formData.city} name='city' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="number" placeholder='Zip Code' />
          <input required onChange={onChangeHandler} value={formData.country} name='country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="text" placeholder='Country' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="number" placeholder='Phone' />


      </div>

      {/* Right Side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-60'>
          <CartTotal />
        </div>
        {/* Payment  */}
        <div className='mt-12'>
          <Title text1={"PAYMENT"} text2={"METHOD"}></Title>
          <div className='flex gap-3 flex-col lg:flex-row'>
            {/* <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-600' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt='pay'></img>
            </div> */}
            {<div onClick={() => setMethod('mockpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'mockpay' ? 'bg-green-600' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt='pay'></img>
            </div>}
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-600' : ''}`}></p>
              <p className='text-gray-500 text-sm font-semibold mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type="submit" className='bg-black text-white px-16 py-3 text-sm '>PLACE ORDER</button>
          </div>

        </div>
      </div>



    </form>
  )
}

export default PlaceOrders