import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700 '>

<div>
    <img alt='policy' src={assets.exchange_icon} className='w-auto m-auto mb-5'></img>
    <p className='font-bold'>Easy Exchange Policy</p>
    <p className='text-gray-400'>We Offer Hassle Free Exchange Policy</p>
</div>


<div>
    <img alt='policy' src={assets.quality_icon} className='w-auto m-auto mb-5'></img>
    <p className='font-bold'>7 Days Return Policy</p>
    <p className='text-gray-400'>We Offer 7 Days free return </p>
</div>

<div>
    <img alt='policy' src={assets.support_img} className='w-auto m-auto mb-5'></img>
    <p className='font-bold'>Excellent Support</p>
    <p className='text-gray-400'>Our Support System will not disappoint you</p>
</div>

    </div>
  )
}

export default OurPolicy