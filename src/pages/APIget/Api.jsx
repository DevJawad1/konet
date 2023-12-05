import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Api = () => {
    const [arrayoBJ, setarrayoBJ] = useState([])
    let url ="https://tunnel.staging-k2k.dev/api/public/shop"
    useEffect(()=>{
        axios.get(url).then((res)=>{
            console.log(res.data);
            setarrayoBJ(res.data)
        })
    },[])
  return (
    <div>
        <div className="container">
            {
                arrayoBJ.map((user, i)=>(
                    <div key={i} className='card w-25'>
                        <img src={user.shop_url} alt="" />
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Api