import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Uploadproduct from './Uploadproduct';
const Uploadimg = ({imagename}) => {
  const [clodimg, setclodimg] = useState("")
  useEffect(()=>{
    console.log('am image');
    console.log(imagename);
    if(imagename!==""){
      let url = 'http://localhost:2500/user/saveimg'
      axios.post(url, {imagename:imagename}).then((res)=>{
          console.log('Image sent');
          console.log(res.data.myimage)
          setclodimg(res.data.myimage)
          localStorage.setItem('imageUrl', res.data.myimage)
      }).catch((err)=>{
          console.log(err);
      })
    }
  },[])
  return (
    <div style={{display:"none"}}>
      <Uploadproduct cloudimg={clodimg}/>
    </div>
  )
}

export default Uploadimg