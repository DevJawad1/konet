import React, {useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
const VerifyToken = () => {
    const goBackTo = useNavigate()
    const {id} = useParams()
    let token = localStorage.konettoken
    let url = 'https://konet-uwrs.onrender.com/user/token'
  useEffect(()=>{
    axios.get(url, {
      headers:{
          "Authorization":`Bearer ${token}`,
          "Content-Type":"application/json",
          "Accept":"application/json"
      }
  })
  .then((res)=>{
    console.log(res.data);
      if(res.data.tokstatus){
          goBackTo(`/dashboard/${id}`)
      }
      else{
          goBackTo( '/loginUser')
          console.log('not token');
      }
  })
  })
  return (
    <div>

    </div>
  )
}

export default VerifyToken