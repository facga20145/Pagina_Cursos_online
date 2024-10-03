import React from 'react'
import Logo from './image/logo-name.png'

function Register() {
  return (
    <div className='content-Register'>
        <img className='Logo' src={Logo} alt="Logo" />
        <h1>Crea tu cuenta</h1>
        <div className="input-box">
            <input type="text" />
        </div>
      
    </div>
  )
}

export default Register
