import React from 'react'
import { FaArrowLeft  } from "react-icons/fa";
import {Link} from 'react-router-dom'
import cancelimg from "../assest/cancel.gif"
const Cancel = () => {
  return (
    <div className='bg-slate-100 w-full max-w-md  mx-auto mt-10 flex justify-center items-center flex-col'>
      <img src={cancelimg} width={350}/>
      <p className='text-2xl font-bold text-red-500 '>Payment Cancel..!</p>
      <Link to={"/user-panel/cart"} className='mt-4 p-2 text-slate-200 font-semibold border border-slate-700 rounded bg-red-600 flex justify-center items-center gap-2 hover:bg-red-800 transition-all'><FaArrowLeft  className='text-2xl' />Back to Cart </Link>
    </div>
  )
}

export default Cancel
