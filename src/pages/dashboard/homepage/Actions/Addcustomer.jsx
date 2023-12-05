import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';

const Addcustomer = ({cst}) => {
  let url = 'http://localhost:2500/user/addcustomer'
  
  useEffect(()=>{
    console.log(cst);
    // if(cst==localStorage.userId){

    // }
    // else{
      
    // }
    axios.post(url, {recivingcst:cst, addingcst:localStorage.userId}).then((res)=>{
        console.log('sent');
    }).catch((Err)=>{
        console.log(Err);
    })
  })
  return (
    <div></div>
  )
}

export default Addcustomer