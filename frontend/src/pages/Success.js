import React from 'react'
import successimg from "../assest/success.gif"
import { FaArrowRight } from "react-icons/fa";
import {Link} from 'react-router-dom'

const Success = () => {
  return (
    <div className='bg-slate-100 w-full max-w-md  mx-auto mt-16 flex justify-center items-center flex-col'>
      <img src={successimg} />
      <p className='text-2xl font-bold text-green-500 '>Payment Successfull..!</p>
      <Link to={"/user-panel/my-orders"} className='mt-4 p-2 text-slate-200 font-semibold border border-slate-700 rounded bg-blue-600 flex justify-center items-center gap-2 hover:bg-green-600 transition-all'>Proceed to See Order <FaArrowRight className='text-2xl' /></Link>
    </div>
  )
}

export default Success
