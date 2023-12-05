import React from 'react'
import { useState } from 'react'
import Topnav from '../component/topnav/Topnav'
import Rightnav from '../component/rightnav/Rightnav'
import { useParams } from 'react-router-dom'
import uploadimg from '../../../assets/uploading.png'
import axios from 'axios'
import './upload.css'
import Loading from '../../loading/Loading'
const Uploadprofile = () => {
    const [selectedImage, setselectedImage] = useState("")
    const {id}=useParams()
      const [imgpg, setimgpg] = useState(false)
      const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setselectedImage(event.target.result);
            }
            reader.readAsDataURL(file);
        }
    };
    const triggerFileInput = () => {
        document.getElementById("file-input").click();
    };
    const [load, setload] = useState(false)
    const updatepicture=()=>{
        setload(true)
        let url = 'http://localhost:2500/user/saveimg'
        let url2 = 'http://localhost:2500/user/saveprofile'
        axios.post(url, {imagename:selectedImage, userid:localStorage.userId}).then((res)=>{
            console.log('Image sent');
            console.log(res.data.myimage)
            localStorage.setItem('profile', res.data.myimage)
            setload(false)
        }).catch((err)=>{
            console.log(err);
        })
    }
  return (
    <div className='general'>
            <Topnav username={id} />
            <Rightnav username={id} />
        <div className="overall">
            {
                load==true?
                <Loading/>
                :null   
            }
        <div onClick={triggerFileInput} className='mx-auto card mt-5 profile-holder shadow' style={{backgroundImage:`url(${selectedImage?selectedImage:uploadimg})`, backgroundSize:"cover"}}>
        </div>
        {
            selectedImage?
            <div className="text-center">
                <button className="btn mt-2 text-white" style={{backgroundColor:"navy", borderRadius:"0px"}} onClick={updatepicture}>Update picture</button>
            </div>
        :null
        }
        <p className='text-center mx-auto w-75 mx-5 mt-3'>
            Dear {id} this page is where you upload your desire picture to represent your self on this site 
            It may be your personal picture or business picture
        </p>
        <input type="file" id="file-input" style={{ display: "none" }} accept="image/*" onChange={handleImageUpload} />
        </div>
    </div>
  )
}

export default Uploadprofile