import React, { useEffect } from 'react'
import axios from 'axios'
import img1 from '../../assets/landingpageimg/forgetpingimg/Screenshot_20231026-083314.jpg'
import img2 from '../../assets/landingpageimg/forgetpingimg/Screenshot_20231026-083409.jpg'
import img3 from '../../assets/landingpageimg/forgetpingimg/Screenshot_20231026-083438.jpg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Resetpassword.css'
import Loading from '../loading/Loading'
const Resetpassword = () => {
    const navigate=useNavigate()
    const [setInput, setsetInput] = useState(false)
    const [em, setem] = useState(true)
    const [emcont, setemcont] = useState('')
    const [dg, setdg] = useState(Number())
    const [digit, setdigit] = useState(Number())
    const [inpholder, setinpholder] = useState(false)
    const [neps, setneps] = useState("")
    const [cps, setcps] = useState("")
    const [logbox, setlogbox] = useState(false)
    const [load, setload] = useState(false)
    let url = 'http://localhost:2500/user/resetpassword'
    const sendCode=()=>{
        if(emcont!==""){
        setsetInput(true)
        setem(false)
        setload(true)
        let digit =Math.floor(100000 + Math.random() * 900000)
        // let digitString = digit.toString();
        localStorage.setItem('digit', digit)
        if(digit!==""){
            axios.post(url, {digit:digit, usermail:emcont}).then((res)=>{
                console.log('code sent');
                console.log(res.data);
                setdigit(res.data.code)
                setload(false)
            }).catch(err=>{
                console.log(err);
            })
        }

        }
    }
    const verifycode=()=>{
        if(digit==dg){
            setinpholder(true)
        }
    }
    
    const newpass=()=>{
        if(neps!==cps){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "New Password does not match with Confirm password!",
              });
        }
        else{
            axios.post(url, {usermail:emcont,password:neps})
            .then((res)=>{
                console.log('sent');
                if(res.data.status){
                    // setlogbox(true)
                    // setinpholder(true)
                    Swal.fire(
                        res.data.message,
                        'Wait a moment',
                        'success'
                      )
                      navigate('/login')
                }
            }).catch((err)=>{
                console.log(err);
            })
        }
    }
  return (
    <div className='reset d-flex'>
        {
            load==true?
            <Loading/>
            :null
        }
        <div className="reset">
            {
                inpholder==false && logbox==false?
                <div className="containers shadow p-3 bg-white">
            <p className='fw-bold'>Reset Password</p>
            <div className="d-flex d-flexs">
                <div className="h-50 img-div text-center">
                    <img src={img2} alt="" width="250px"/>
                </div>
                <div className="h-50 content p-1 pt-4" style={{lineHeight:"15px"}}>
                    <p className='text-center'>Enter your email adress and click on send code to then your reset password code will be send to you</p>
                    <div className="inp-divs w-100">
                        <div></div>
                        {
                            em==true?
                            <div>
                            <div className='w-100 pt-1 inner-inp mt-3'>
                        <label htmlFor="">Enter your email</label>                        
                        <input type="email" name="" className='inp' placeholder='Your email' style={{height:"50px"}} onChange={(e)=>{setemcont(e.target.value)}}/>
                        </div>
                        <button className='btn btn-success mt-3' onClick={sendCode}>Send code</button>
                        </div>
                        :null
                        }
                        {
                            setInput==true && em==false?
                            <div>
                                <div className='p-3 w-100 mt-3 pt-1 inner-inp noshadow'>
                                    <div className="d-flex justify-content-between">
                                    <label htmlFor="">Input Code</label>                        
                                    <p className='text-danger' onClick={()=>{setem(true)}}>←Back</p>
                                    </div>
                                    <div className="App d-flex gap-3">
                                    <input className='mt-2 w-100 form-control' type="number" placeholder='Input code'  onChange={(e)=>{setdg(e.target.value)}}/>
                                </div>
                            </div>
                                <button className='btn btn-success mt-3 mx-2' onClick={verifycode}>Proceed</button>
                            </div>
                        :null
                        }
                    </div>
                </div>
            </div>
        </div>
        :
        <div className='containers shadow p-3 bg-white'>
            <div onClick={()=>{setinpholder(false)}}>
            <i class="ri-arrow-left-fill"></i> Back
            </div>
            <button style={{visibility:"hidden"}}></button>
            <p className='fw-bold'>Reset Password</p>
            <div>
                <label htmlFor="">New Password</label>
                <input type="text" onChange={(e)=>{setneps(e.target.value)}} name="" id="" className="form-control" />
            </div>
            <div className='mt-3'>
                <label htmlFor="">Confirm Password</label>
                <input type="text" onChange={(e)=>{setcps(e.target.value)}} className="form-control" />
            </div>
            <div className="mt-3">
                <button className='btn btn-success' onClick={newpass}>Set new password</button>
            </div>

        </div>
        }
        </div>
    </div>
  )
}

export default Resetpassword