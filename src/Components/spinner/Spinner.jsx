import React from 'react'
import logo from '../../assets/logo.png'
const Spinner = () => {
  return (
    <div style={{width:"100%",height:"100vh",position:"fixed",display:"flex",justifyContent:"center",alignItems:"center",backdropFilter:"blur(10px)",zIndex:1000}}>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"10px"}}>
        <div>
          <img width={100} src={logo} alt="" />
        </div>
        <div>
        <div class="spinner-grow text-white" role="status">
          <span class="sr-only"></span>
        </div>
        <div class="spinner-grow text-white ms-2" role="status">
          <span class="sr-only"></span>
        </div>
        <div class="spinner-grow text-white ms-2" role="status">
          <span class="sr-only"></span>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Spinner