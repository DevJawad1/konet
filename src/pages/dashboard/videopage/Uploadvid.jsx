import React, { useEffect, useRef, useState } from 'react';
import Topnav from '../component/topnav/Topnav';
import Rightnav from '../component/rightnav/Rightnav';
import { useParams } from 'react-router-dom';
import uploadicon from '../../../assets/uploading.png'
import './Uploadvid.css'
const CameraComponent = () => {
  const videoRef = useRef(null);
  const [vid, setvid] = useState(false)
  const {id} = useParams()
  useEffect(() => {
      if(vid==true){
        const startCamera = async () => {
            try {
              const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
              // Access the video element using the ref
              if (videoRef.current) {
                videoRef.current.srcObject = stream;
              }
            } catch (error) {
              console.error('Error accessing the camera:', error);
            }
          };
      
          // Check if the browser supports getUserMedia
          if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            startCamera()
          } else {
            console.error('getUserMedia is not supported in this browser');
          }
      
          // Cleanup function to stop the camera when the component is unmounted
          return () => {
            if (videoRef.current && videoRef.current.srcObject) {
              const tracks = videoRef.current.srcObject.getTracks();
              tracks.forEach(track => track.stop());
            }
          };      
      }
    
  }, [vid]);

  const uploadvid = ()=>{
    setvid(true)
  }
  return (
    <div>
        <Topnav username={id}/>
        <Rightnav username={id} />
        <div className="overall">
        {
            vid==false?
        <div>
            <div className='mt-3 pt-3 img-icon shadow mx-auto' onClick={uploadvid}>
                <img src={uploadicon} alt="" style={{ maxWidth: "70%", maxHeight: "40vh" }} />
                <p>Upload Video</p>
            </div>
            <p className='mt-4 text-center'>Hello {id}, This page is where you upload your product you want to sell to your customers </p>
        </div>
        :
        <div>
            <video ref={videoRef} autoPlay playsInline></video>
            <div className="gap-2 d-flex">
            <button onClick={()=>{setvid(false)}} className='btn btn-dark w-50'> Cancel Video</button>
            <button  className='btn btn-success w-50'>Post Video</button>
            </div>
        </div>
        }
        </div>
    </div>
  );
};

export default CameraComponent;
