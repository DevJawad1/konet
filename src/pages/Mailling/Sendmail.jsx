import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './send.css'
import Loading from '../loading/Loading'
const Sendmail = () => {
    const locate=useNavigate()
    let url = 'http://localhost:2500/user/sendmail'
    const [dg, setdg] = useState('')
    const [showInp, setshowInp] = useState(false)
    const [load, setload] = useState(false)
    const sendcode=()=>{
        setload(true)
        let digit =Math.floor(100000 + Math.random() * 900000)
        axios.post(url, {mail:localStorage.verifyEmail, digit:digit, username:localStorage.verifyusername}).then(()=>{
            console.log('sent');
            setshowInp(true)
            setload(false)
        }).catch(err=>{
            console.log(err);
        })
    }
    const sends=()=>{
        axios.post(url, {mail:localStorage.verifyEmail,userdigit:dg}).then((res)=>{
            console.log('sent');
            if(res.data.message=="Your email have been verify" || res.data.status==true){
                Swal.fire(
                    res.data.message,
                    'Wait a moment',
                    'success'
                  )
                locate('/login')
            }
            else{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: res.data.message+"!",
                  });
            }
        }).catch(err=>{
            console.log(err);
        })
    }
  return (
    <div className="bg-prmary" style={{height:"100vh"}}>
        <div className='shadow p-3 mt-3 w-25 mx-auto bg-white div-mail' style={{borderRadius:"5px"}}> 
        {
         showInp==true?
         <div className="p-3">
         <label htmlFor="">Code have been send to your email</label>
         <input type="text" name="" id="" onChange={(e)=>{setdg(e.target.value)}} className="form-control mt-2" placeholder='input code send to your email'/>
         <div className="text-center">
         <button className="btn btn-primary w-50 mt-2" onClick={sends}>Procceed</button>
         </div>
         </div>
         :<div>
            {
                load==true?
                <Loading/>
                :null
            }
         <div className="text-center ">
         <p>Click on the button to verify your email</p>
         <button className='btn bn-primary w-50' onClick={sendcode} style={{backgroundColor:"rgba(0, 89, 255, 0.397)"}}>Verify Email</button>
         </div>
         </div>
        }
     </div>
    </div>
    
  )
}

export default Sendmail