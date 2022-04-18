import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import axios from 'axios'

import './AuthModal.scss'

const AuthModal = ({isSignUp, setShowModal}) => {

  const [email, setEmail] = useState('')
  const [password, setPassWord] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  let navigate = useNavigate()


  const handleShowModal =()=> setShowModal(false)

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      
      if(isSignUp && (password !== confirmPassword)){
        setError("Podane hasła nie są jednakowe")
        return
      }

      const response = await axios.post(`http://localhost:8000/${isSignUp ? "signup" : "login"}`, {email, password});

      setCookie('UserId', response.data.userId)
      setCookie('AuthToken', response.data.token)

      const success = response.status === 201

      if(success && isSignUp) navigate('/onboarding')
      if(success && !isSignUp) navigate('/dashboard')

      window.location.reload();
      
    }catch(error){
      console.log(error)
    }
  }

  return (  
  <>
    <div className="auth-modal">
      <button className='close-btn' onClick={handleShowModal}>X</button> 
      <h2>{isSignUp ? "Tworzenie konta"  : "Logowanie"}</h2>
      <form onSubmit={handleSubmit} noValidate={true}>
        <input 
          type="email"
          id='email'
          placeholder='E-mail'
          name='email'
          required={true}
          onChange={(e)=>{setEmail(e.target.value)}}
        />
        <input 
          type="password"
          id='password'
          placeholder='Hasło'
          name='password'
          required={true}
          onChange={(e)=>{setPassWord(e.target.value)}}
        />
        {isSignUp && <input 
          type="password"
          id='confirmPassword'
          placeholder='Potwierdź hasło'
          name='confirmPassword'
          required={true}
          onChange={(e)=>{setConfirmPassword(e.target.value)}}
        />}
        <input type="submit" value={isSignUp ? "Stwórz" : "Zaloguj"}/>
        <p>{error}</p>
      </form>
    </div>
  </>
  );
}
export default AuthModal;