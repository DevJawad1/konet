import React, {useState} from 'react'
import axios from 'axios'
import './Form.css'
import { useNavigate,Link } from 'react-router-dom'
import logo from '../../assets/logo-removebg-preview.png'
import logoImg from '../../assets/logoimg-removebg-preview.png'
import Loading from '../loading/Loading'
const Login = () => {
    let navigate= useNavigate()
    // let url = 'https://konet-uwrs.onrender.com/user/backendlogin'
    let url = 'http://localhost:2500/user/backendlogin'
    const [em, setem] = useState("")
    const [ps, setps] = useState("")
    const [loading, setloading] = useState(false)
    const loginbtn = () =>{
        if(em==""||ps==""){
            Swal.fire({
                icon: 'error',
                title: 'Fill all your details',
              })
        }
        else{
            setloading(true)
            axios.post(url, 
                { 
                    email:em,
                    username:em,
                    password:ps,
                }).then((res)=>{
                    if(res.data.message){
                        setloading(false)
                    }
                    if(res.data.status){
                        Swal.fire(
                            res.data.message,
                            'Wait a moment',
                            'success'
                        )
                        
                          localStorage.setItem('login', true)
                          localStorage.setItem('konetUser', res.data.details)
                          localStorage.setItem('userId', res.data.details._id)
                          localStorage.setItem('userimg', res.data.details.userImg)
                          localStorage.setItem('konettoken', res.data.token)
                          if(!res.data.details.emailverify){
                            console.log(res.data.details.emailverify);
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Your email has not been verify!",
                              });
                          }
                          else{
                            setTimeout(() => {
                                setloading(false)
                                navigate(`/token/${res.data.details.username}`)
                              }, 1300);
                          }
                    }
                    else{
                        Swal.fire(
                            res.data.message,
                            'Wait a moment',
                            'success'
                        )
                    }
                }).catch((err)=>{
                    console.log(err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error occur while login',
                      })
                      setloading(false)
                })
        }
    }
  return (
    <div style={{alignItems:"center", display:"flex", height:"80vh"}} onClick={()=>{loading==true?setloading(false):null}}>
      <div className="form-container container shadow mt-4 p-0 border bg-white d-flex">
            <div className='side-div'>
                <div>
                <div className="logo-div text-center mx-auto">
                    <img src={logoImg} alt=""  className='w-75 mt-5'/><br />
                    <img src={logo} alt=""  className='w-75' style={{marginTop:"-60px",visibility:"hidden"}}/>
                </div>
                <p className='text-center fw-bold text-white adm'>
                    Welcome to Konet we get you covered by solving your empowerment
                </p>
                </div>
            </div>
            <div className='p-2 mx-aut inp-div'>
                <p className="fs-2 fw-bold text-center">Login</p>
                <div className="p-1 mt-3 border" style={{ background: "rgba(0, 89, 255, 0.048)" }}>
                    <input 
                    type="text" 
                    id="email" 
                    className="border inp-1" 
                    placeholder="Email or Username"
                    onChange={(e)=>{setem(e.target.value)}}/>
                </div>
                <div className="d-flex gap-2">
                    <div className="p-1 w-100 mt-3 border" style={{ background: "rgba(0, 89, 255, 0.048)" }}>
                        <input 
                        type="password" 
                        id="password" 
                        className="border inp-1" 
                        placeholder="Password"
                        onChange={(e)=>{setps(e.target.value)}}/>
                    </div>
                </div>
                <div className="justify-content-between mt-3" style={{lineHeight:"14px"}}>
                <p><Link to={`/resetpassword`}><span className='text-primary fw-bold'>Forgot Password</span></Link></p>
                <p>Don't have account <Link to={`/signup`}><span className='fw-bold text-primary'>Sign up</span></Link></p>
                </div>
                <div className="d-flex w-50 gap-2 mt-4 mx-auto" style={{ marginLeft: "auto" }}>
                    <button onClick={loginbtn} className="inp-1 border border-rounded fw-bold" style={{ background: "rgba(0, 89, 255, 0.397)" }}>
                        Log In
                    </button>
                </div>
            </div>
            {/* <div className="contact-div p-1">
                <div className='logo2 bg-white'>
                </div>
                <p className='fw-bold text-center text-primary fs-4 mt-1'>Contact Us</p>
                <div className="d-flex justify-content-between px-5 h-25" style={{alignItems:"center"}}>
                <div className="circle shadow text-center pt-2">
                    <p><i className="bi bi-linkedin"></i></p>
                </div>
                <div className="circle shadow text-center pt-2">
                    <p><i className="bi bi-twitter"></i></p>
                </div>
                <div className="circle shadow text-center pt-2">
                    <p><i className="bi bi-facebook"></i></p>
                </div>
                <div className="circle shadow  text-center pt-2">
                    <i className="bi bi-instagram"></i>
                </div>
                </div>
                <div className="text-center about">
                    <Link>About Us</Link>
                    <p>Terms and Condition</p>
                </div>
                <div className="last-div pt-3">
                    <p className='text-center text-white'>@Konet.com</p>
                </div>
            </div> */}
            
        </div>
        {
            loading==true?
            <Loading/>
        :null
        }
    </div>
  )
}

export default Login