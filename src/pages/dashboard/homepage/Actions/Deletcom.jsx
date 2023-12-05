import axios from 'axios';
import React, { useEffect } from 'react'

const Deletcom = ({comId}) => {
    console.log(comId);
    let url = 'http://localhost:2500/user/deletcom'
    useEffect(()=>{
        axios.post(url, {comId:comId})
    },[])
  return (
    <div>

    </div>
  )
}

export default Deletcom