import React from 'react'
import './loding.css'
const Loading = () => {
  return (
    <div>
            <div className="loading-div">
            <div className="div">
                <div className="rotate">
                <div className="d-flex">
                <div className="circle"></div>
                <div className="circle lodtop"></div>
                <div className="circle lodtop l"></div>
                <div className="circle"></div>
                </div>
                <div className="d-flex">
                <div className="circle"></div>
                <div className="circle lodbottom"></div>
                <div className="circle lodbottom l"></div>
                <div className="circle"></div>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Loading