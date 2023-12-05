import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Like = ({url}) => {
    console.log(url);
    let likeurl = 'http://localhost:2500/user/like'
    const {id}=useParams()
    const navigate = useNavigate()
    let username = localStorage.username
    let currentplace = localStorage.currentplace
    let prodId = localStorage.prodId
    useEffect(()=>{
        axios.post(likeurl, {allLike:prodId })  
          .then((res) => {
            console.log("Like added ");
            // navigate(`/dashboard/${username}#${currentplace}`)
          })
          .catch(err => {
            console.log(err);
          });
    },[])
  return (
    <div>
        
    </div>
  )
}

export default Like