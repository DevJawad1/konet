import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Signup from './pages/Form/Signup'
import Login from './pages/Form/Login'
import Home from './pages/dashboard/homepage/Home'
import Uploadproduct from './pages/dashboard/productpage/Uploadproduct'
import Landingpage from './pages/landingpage/Landingpage'
import Resetpassword from './pages/Reset/Resetpassword'
import Dispat from './pages/reduxss/Dispat'
import CameraComponent from './pages/dashboard/videopage/Uploadvid'
import VerifyToken from './pages/dashboard/homepage/VerifyToken'
import Like from './pages/dashboard/homepage/Actions/Like'
import Uploadimg from './pages/dashboard/productpage/Uploadimg'
import Sendmail from './pages/Mailling/Sendmail'
import Unknowpage from './pages/404page/Unknowpage'
import Api from './pages/APIget/Api'
import Uploadprofile from './pages/dashboard/uplodprofile/Uploadprofile'
function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
 let token = localStorage.konettoken
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
const handleInstallClick = () => {
  console.log('wwkw');
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      // console.log(choiceResult);
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      setDeferredPrompt(null);
    });
  }
};
  return (
    <>
    {/* <button onClick={handleInstallClick} className='btn'>Install App</button> */}
  
    <Routes>
      <Route path='/' element={<Landingpage/>}/>
      <Route path='/home' element={<Landingpage/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/token/:id' element={token?<VerifyToken/>:<Login/>}/>
      <Route path='/dashboard/:id' element={<Home installer={handleInstallClick}/>}/>
      <Route path='/uploadproduct/:id' element={<Uploadproduct/>}/>
      <Route path='/resetpassword' element={<Resetpassword/>}/>
      <Route path='/like/:id' element={<Like/>}/>
      {/* <Route path='/img/' element={<Uploadimg/>}/> */}
      <Route path='uploadvideo/:id' element={<CameraComponent/>}/>
      <Route path='/dispat' element={<Dispat/>}/>
      <Route path='/sendemail' element={<Sendmail/>}/>
      <Route path='/api' element={<Api/>}/>
      <Route path='/profile/:id' element={<Uploadprofile/>}/>
      <Route path='/*' element={<Unknowpage/>}/>
    </Routes>
    </>
  )
}

export default App
