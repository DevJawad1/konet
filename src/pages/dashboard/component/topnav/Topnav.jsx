import React, { useState } from 'react'
import './Topnav.css'
import '../../../overallcss/overallcontainer.css'
import { Link } from 'react-router-dom'
import iconic from '../../../../assets/iconic product.png'
import hotproimg from '../../../../assets/hotproduct icon.png'
import verUser from '../../../../assets/verifieduserImg.webp'
import promoter from '../../../../assets/promoter.png'
import affordable from '../../../../assets/affordable.png'
const Topnav = ({ username }) => {

  const [seting, setseting] = useState(false)
  const setting = () => {
    setuserreg(false)
    if (seting == false) {
      setseting(true)
    }
    else {
      setseting(false)
    }
  }

  const [userreg, setuserreg] = useState(false)
  const showstar = () => {
    setseting(false)
    if(userreg==false){
      setuserreg(true)
    }
    else{
      setuserreg(false)
    }
  }
  return (
    <div>
      <div className="overall">
        <div className="top-nav bg-white d-flex justify-content-center">
          <span className='pt-3 w-50 showName'>Hello, <span className='fw-bold'>{username}</span></span>
          <span className='pt-3' style={{cursor:"pointer"}} ><i className="bi bi-bell-fill"></i></span>
          <span className='pt-3' style={{cursor:"pointer"}} onClick={setting}><i className="bi bi-gear-fill"></i></span>
          <span className='pt-3' style={{cursor:"pointer"}} onClick={showstar}><i className="ri-shield-star-fill"></i></span>
          {
            seting == true ?
              <div className="pop border shaow pt-3 p-3 px-1">
                <div className='text-light p-1'>
                  <div className="text-end text-white" onClick={() => { setseting(false) }} style={{ marginTop: "-15px" }}>
                    <i class="ri-close-fill"></i>
                  </div>
                  <Link to={'/login'} style={{ textDecoration: "none" }} className='text-light'>
                    <i className="ri-logout-box-fill"></i> <span>Log Out</span>
                  </Link>
                </div>
                <div className='text-light mt-2 p-1'>
                  <i className="ri-logout-box-fill"></i> <span>Profile</span>
                </div>
                <div className='text-light mt-2 p-1'>
                  <i className="ri-logout-box-fill"></i> <span>Profile</span>
                </div>
              </div>
              : null
          }
          {
            userreg == true ?
              <div className='userreg p-2 pt-2 px-3'>
                <p className='text-white' style={{cursor:"pointer"}} onClick={()=>{setuserreg(false)}}>Close <i class="ri-close-fill"></i></p>
                <div className='bg-light w-100 text-center'>
                  <img src={verUser} alt="" className='useregimg shadow p-1'/>
                  <p>Verified User</p>
                </div>
                <div className='bg-light w-100 text-center'>
                  <img src={hotproimg} alt="" className='useregimg shadow p-1'/>
                  <p>Hot Product</p>
                </div>
                <div className='bg-light w-100 text-center'>
                  <img src={iconic} alt="" className='useregimg shadow p-1'/>
                  <p>Iconic Product</p>
                </div>
                <div className='bg-light w-100 text-center p-0'>
                  <img src={promoter} alt="" className='useregimg shadow p-1'/>
                  <p>Popular Promoter</p>
                </div>
                <div className='bg-light w-100 text-center p-0 pt-3'>
                <img src={affordable} alt="" className='useregimg shadow p-1'/>
                  <p>Affordable Price</p>
                </div>

              </div>
              : null
          }
        </div>

      </div>
    </div>
  )
}

export default Topnav