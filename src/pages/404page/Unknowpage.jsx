import React from 'react'
import img from '../../assets/nt_found-removebg-preview.png'
import './Unknown.css'
import { useNavigate } from 'react-router-dom'
const Unknowpage = () => {
    const navigate=useNavigate()
  return (
    <div className='notfound bg-primary'>
        <div className="container p-3">
            <div>
            <h1 className='text-center text-white'>ERROR</h1>
            <div className="text-center text-white">
            <img src={img} alt="" />
            <h2 className='mt-3'>Page Not Found</h2>
            <p className='mt-3'>An Unknown page kinfly go back to </p>
            <div>
            <button className='btn btn-light' onClick={()=>{navigate('/home')}}>Home page</button> 
            <span> Or </span>
            <button className='btn btn-light' onClick={()=>{navigate('/login')}}>Login page</button>
            </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Unknowpage