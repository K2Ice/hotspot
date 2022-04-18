import React, {useState} from 'react';
import { useCookies } from 'react-cookie';
import AuthModal from '../components/AuthModal/AuthModal';

import logo from '../pic/logo.svg'

import './Home.scss'

const Home = () => {
  const [showModal, setShowModal] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const authToken = cookies.AuthToken;

  const handleLoginClick = ()=>{
   
    if(authToken){
      removeCookie('UserId', cookies.UserId)
      removeCookie('AuthToken', cookies.AuthToken)
      window.location.reload()
      return
    }
    setShowModal(true)
    setIsSignUp(false)
  }

  return ( 
    <>
      <div className='home-wrapper'>
        <img src={logo} alt=""/>
        <span>hotspot</span>
        <div className="btn-box">
        <button className="log-btn" disabled={showModal} onClick={handleLoginClick}>{authToken? "Wyloguj się" : "Zaloguj się"}</button>
        <button className='create-btn' disabled={showModal} onClick={()=>{setShowModal(true);setIsSignUp(true)}}>{!authToken && "Stwórz konto"}</button>
        </div>
      </div> 
      {showModal && <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>}
    </>
  );
}

export default Home;