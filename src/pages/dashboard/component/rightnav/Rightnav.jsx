import React, { useEffect, useState } from 'react'
import './Rightnav.css'
import { Link } from 'react-router-dom'
import promterImg from '../../../../assets/promoter.png'
import profileImg from '../../../../assets/profileImg.webp'
// import Uploadimg from '../../productpage/Uploadimg'
import axios from 'axios'
const Rightnav = ({username}) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  useEffect(()=>{
  if("ServiceWorker" in navigator){
    window.addEventListener('load', ()=>{
      navigator.serviceWorker
      .register('/sw.js')
      .then(registration =>{
        console.log('SW registered: ', registration);
      })
      .catch(registrationError =>{
        console.log('SW registration failed: ', registrationError);
      })
    })
  }
  const handleBeforeInstallPrompt = (event) => {
    event.preventDefault();
    setDeferredPrompt(event);
  };

  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

  return () => {
    window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  };
  // console.log();
})
    const nav = () => {
        if( document.getElementById('navbutton').className=='nav-btn mt-2' || localStorage.navcondition=='open'){
            document.getElementById('navdiv').style.display="block"
            document.getElementById('cover').style.display="block"
            document.getElementById('navbutton').style.left="80%"
            document.getElementById('navbutton').style.backgroundColor="white"
            document.getElementById('navbutton').style.top="0%"
            setTimeout(() => {
                document.getElementById('navbutton').className='navbtn mt-2'
                document.getElementById('navdiv').style.marginLeft="0px"
            }, 0);
            localStorage.setItem('navcondition', 'close')
        } 
        else if(document.getElementById('navbutton').className=='navbtn mt-2' || localStorage.navcondition=='close'){
            document.getElementById('navbutton').className='nav-btn mt-2'
            document.getElementById('navdiv').style.marginLeft="-270px"
            document.getElementById('navbutton').style.left="0%"
            document.getElementById('navbutton').style.backgroundColor="transparent"
            setTimeout(() => {
                document.getElementById('navdiv').style.display="none"
                document.getElementById('cover').style.display="none"
            }, 180);
            localStorage.setItem('navcondition', 'open')
        }
    }
    const [pageid, setpageid] = useState(null)
    const indicatePage=(id)=>(event)=>{
     let allnavcontent= document.querySelectorAll('.nav-content')
     for (let index = 0; index < allnavcontent.length; index++) {
         if(id==index){
             allnavcontent[index].style.backgroundColor="rgb(242,242,242)"
             setpageid(index)
            }
        else{
            allnavcontent[index].style.backgroundColor="transparent"
         }
     }
    }
    useEffect(()=>{
        if(window.matchMedia("(max-width:1023px)").matches){
            // alert("small screem")
            document.getElementById('navbutton').className='nav-btn mt-2'
            document.getElementById('navdiv').style.marginLeft="-270px"
            document.getElementById('navbutton').style.left="0%"
            document.getElementById('navdiv').style.display="none"
            document.getElementById('cover').style.display="none"
            localStorage.setItem('navcondition', 'open')
        }
        else{
            document.getElementById('navdiv').style.display="block"
            document.getElementById('cover').style.display="block"
            setTimeout(() => {
                document.getElementById('navdiv').style.marginLeft="0px"
                document.getElementById('navbutton').className='navbtn mt-2'
            }, 0);
            localStorage.setItem('navcondition', 'close')
        }

    },[])
    useEffect(()=>{
        indicatePage(0)()
        window.onload =() =>{
            if(localStorage.navcondition=='close'){
                document.getElementById('cover').style.display="block"
                document.getElementById('navdiv').style.display="block"
                // document.getElementById('navbutton').style.left="90%"
                setTimeout(() => {
                    document.getElementById('navbutton').className='navbtn mt-2'
                    document.getElementById('navdiv').style.marginLeft="0px"
                }, 0);
            }
            else if(localStorage.navcondition=='open'){
                document.getElementById('navbutton').className='nav-btn mt-2'
                // document.getElementById('navdiv').style.marginLeft="-270px"
                document.getElementById('navdiv').style.display="none"
                document.getElementById('cover').style.display="none"
                // document.getElementById('navbutton').style.left="0%"
            }
        }
    },[])
    useEffect(() => {
        let deferredPrompt;
    
        const handleBeforeInstallPrompt = (event) => {
          // Prevent the default behavior
          event.preventDefault();
    
          // Stash the event so it can be triggered later
          deferredPrompt = event;
        };
    
        const handleInstallButtonClick = () => {
          // If a deferred prompt is available, show the install prompt
          if (deferredPrompt) {
            showInstallPrompt();
          }
        };
    
        const showInstallPrompt = () => {
          // Display the browser's install prompt
          deferredPrompt.prompt();
    
          // Wait for the user to respond to the prompt
          deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the install prompt');
            } else {
              console.log('User dismissed the install prompt');
            }
    
            // Reset deferredPrompt for the next install attempt
            deferredPrompt = null;
          });
        };
    
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
        // Cleanup event listener on component unmount
        return () => {
          window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
      }, []);
    
    let url = 'http://localhost:2500/user/getuserimg'
    const [userImg, setuserImg] = useState("")
      useEffect(()=>{
        axios.post(url, {id:localStorage.userId}).then((res)=>{
            setuserImg(res.data.userimg)
        })
      })
  return (
    <div>
        <div id='navbutton' className="navbtn mt-2" onClick={nav}>
                <div className="line line1 w-75 bg-black mt-1"></div>
                <div className="line w-75 bg-black mt-1 middle-line"></div>
                <div className="line line2 w-75 bg-black mt-1"></div>
            </div>
        <div className="cover" id='cover' onClick={window.innerWidth>=800?null:nav}>
            <div className="navdiv p-3 px-1 pt-1" id='navdiv'>
            <div>
                <Link to={`/profile/${username}`}>
                <div className="card bg-transparent profile-div mx-auto">
                <img src={userImg?userImg:profileImg} alt="" />
                </div>
                </Link>
                {/* {
                    imgpg==true?
                    <Uploadimg imagename={selectedImage} userprofile="profile"/>
                    :null
                } */}
                {/* <div className='text-white mt-3 text-center' style={{lineHeight:"9px"}}>
                    <p className='cstpeople'>Customer: 225 customers</p>
                    <p className='cstpeople'>Buyer: 225 buyers</p>
                </div> */}
            </div>
                <Link to={`/dashboard/${username}`} className='link mt-2'>
                <div id='nav-content' name="1" className='d-flex nav-content pt-2 gap-3 px-3' onClick={indicatePage(0)}>
                    <p><i className="bi bi-house-door-fill"></i></p>
                    <p>Dashboard</p>
                </div>
                </Link>

                <Link to={`/dashboard/${username}`} className='link'>
                <div id='nav-content' className='d-flex nav-content mt-2 pt-2 gap-3 px-3' onClick={indicatePage(1)}>
                    <p><i className="ri-truck-fill"></i></p>
                    <p>Logistics</p>
                </div>
                </Link>

                <Link to={`/dashboard/${username}`} className='link'>
                <div id='nav-content' className='d-flex nav-content mt-2 pt-2 gap-3 px-3' onClick={indicatePage(2)}>
                    <p><i className="bi bi-megaphone-fill"></i></p>
                    <p>Advertisment</p>
                </div>
                </Link>
                <div className="bottom-line mt-2"></div>

                <Link to={`/dashboard/${username}`} className='link'>
                <div id='nav-content' className='d-flex nav-content mt-2 pt-2 gap-3 px-3' onClick={indicatePage(3)}>
                    <p><i className="bi bi-person-fill"></i></p>
                    <p>My profile</p>
                </div>
                </Link>

                <Link to={`/dashboard/${username}`} className='link'>
                <div id='nav-content' className='d-flex nav-content mt-2 pt-2 gap-3 px-3' onClick={indicatePage(4)}>
                    <p><i className="bi bi-people-fill"></i></p>
                    <p>My buyer</p>
                </div>
                </Link>

                <Link to={`/dashboard/${username}`} className='link'>
                <div id='nav-content' className='d-flex nav-content mt-2 pt-2 gap-3 px-3' onClick={indicatePage(5)}>
                    <p><i className="bi bi-people-fill"></i></p>
                    <p>My seller</p>
                </div>
                </Link>

                <Link to={`/dashboard/${username}`} className='link'>
                <div id='nav-content' className='d-flex nav-content mt-2 pt-2 gap-3 px-3' onClick={indicatePage(6)}>
                    <p><i className="bi bi-person-hearts"></i></p>
                    <p>Favourite Buyer</p>
                </div>
                </Link>

                <Link to={`/dashboard/${username}`} className='link'>
                <div id='nav-content' className='d-flex nav-content mt-2 pt-2 gap-3 px-3' onClick={indicatePage(7)}>
                    <p><img src={promterImg} alt="" style={{width:"20px"}}/></p>
                    <p>Promoters</p>
                </div>
                </Link>

                <Link to={`/dashboard/${username}`} className='link'>
                <div id='nav-content' className='d-flex nav-content mt-2 pt-2 gap-3 px-3' onClick={indicatePage(8)}>
                    <p><i className="ri-history-fill"></i></p>
                    <p>History</p>
                </div>
                </Link>
                <div className="bottom-line mt-2"></div>

                <Link to={`/uploadproduct/${username}`} className='link'>
                <div id='nav-content' className='d-flex nav-content mt-2 pt-2 gap-3 px-3' onClick={indicatePage(9)}>
                    <p><i className="bi bi-plus-square-fill"></i></p>
                    <p>Upload product</p>
                </div>
                </Link>
                
                <Link to={`/uploadvideo/${username}`} className='link'>
                <div id='nav-content' className='d-flex nav-content mt-2 pt-2 gap-3 px-3' onClick={indicatePage(10)}>
                    <p><i className="bi bi-plus-square-fill"></i></p>
                    <p>Upload Video</p>
                </div>
                </Link>

                <Link to={`/dashboard/${username}`} className='link'>
                <div id='nav-content' className='d-flex nav-content mt-2 pt-2 gap-3 px-3' onClick={indicatePage(11)}>
                    <p><i className="bi bi-star-fill"></i></p>
                    <p>Hot product</p>
                </div>
                </Link>

                <Link to={`/dashboard/${username}`} className='link'>
                <div id='nav-content' className='d-flex nav-content mt-2 pt-2 gap-3 px-3' onClick={indicatePage(12)}>
                    <p><i className="bi bi-star-fill"></i></p>
                    <p>Pin product</p>
                </div>
                </Link>
                <div id='nav-content' className='d-flex nav-content mt-2 pt-2 gap-3 px-3' onClick={indicatePage(12)}>
                    {/* <button onClick={handleInstallButtonClick} className='btn p-0 pt-0' sty le={{marginTop:"-10px"}}><i className="ri-download-fill"></i> Install App</button> */}
                </div>

            </div>
        </div>
    </div>
  )
}

export default Rightnav