import React from 'react'

import Title from '../Components/Title'
import NewsLetterBox from '../Components/NewsLetterBox'
import {assets } from '../assets/assets'

export const About = () => {
  return (
    <div>
      <div className='text-4xl text-center pt-8 border-t'>
      <Title text1={"About"} text2={"Us"}/>
    </div>

    <div className='my-10 flex flex-col md:flex-row gap-16'>
      <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-700'>
      <p className='text-xl'>This website is my first full stack project which will help me develop some confidence</p>
      <p className='text-xl'>EVen thought its just a clone but i think it is worth it in web dev journey </p>
      <b className='text-gray-800'>Our Mission</b>
      <p className='text-xl'>The Main aim is to develop good understanding in frontend and backend</p>

      </div>
    </div>

    <div className='text-2xl py-4'>
      <Title text1={"WHY"} text2={"CHOOSE US"}/>
    </div>

    <div className='flex flex-col md:flex-row text-sm mb-20'>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
        <b className='text-xl'>Quality Assurance:</b>
        <p className='text-gray-800 text-2xl'>We meticulously select and vet each product to ensure it meets our stringent quality standards</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
        <b className='text-xl'>Convenience:</b>
        <p className='text-gray-800 text-2xl'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
        <b className='text-xl'>Exceptional Service:</b>
        <p className='text-gray-800 text-2xl'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
      </div>
    </div>


    <NewsLetterBox/>
    </div>
  )
}
