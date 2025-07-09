import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendURL } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendURL + '/api/order/list',
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const statusHandler = async (event,orderId)=>{
    try {
      const response = await axios.post(backendURL+'/api/order/status',{orderId,status:event.target.value},{headers:{token}})

      if(response.data.success){
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message)
    }
  }
  return (
    <div className='p-4'>
      <h3 className='text-2xl font-bold mb-4'>Your Orders</h3>
      {
        orders.map((order, index) => (
          <div
            key={index}
            className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 border p-4 mb-4 min-h-60 rounded-md shadow-sm text-gray-700 text-xl'
          >
            {/* Parcel Icon */}
            <div className='flex justify-center items-start'>
              <img src={assets.parcel_icon} alt='parcel' className='w-15' />
            </div>

            {/* Items and Address */}
            <div>
              {
                order.items.map((item, i) => (
                  <p className='mb-3' key={i}>
                    {item.name} x {item.quantity} <span className='text-gray-500'>({item.size})</span>
                  </p>
                ))
              }
              <div className='mt-2'>
                <p>{order.address.firstName + " " + order.address.lastName}</p>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + "," + order.address.state + "," + order.address.country + "," + order.address.zipcode}</p>
                <p>{order.address.phone}</p>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <p>Items : {order.items.length}</p>
              <p>Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? "Done" : "Pending"}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Amount */}
            <div>
              <p className='text-gray-700 text-xl'>₹{order.amount}</p>
            </div>

            {/* Status Selector */}
            <div>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className='border px-2 py-1 w-full'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Orders;
