import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie';

import Navbar from '../components/Navbar/Navbar'
import TinderCard from "react-tinder-card";

import './Dashboard.scss'

import logoIcon from '../pic/logo-icon.svg'
import locationIcon from '../pic/location-icon.svg'
import settingsIcon from '../pic/settings-icon.svg'
import ChatContainer from '../components/ChatContainer/ChatContainer';

const Dashboard = () => {

  const [user, setUser] = useState(null);
  const [genderedUsers, setGenderedUsers]= useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [chatVisible, setChatVisible] = useState(false)

  const userId = cookies.UserId

  const getUser = async () =>{
    const response = await axios.get('http://localhost:8000/user', {
      params: { userId }
    })
    setUser(response.data);
  }

  const getGenderedUsers = async () => {
    try {
          const response = await axios.get('http://localhost:8000/gendered-users', {
            params: { gender: user?.look_for}
          })
          setGenderedUsers(response.data);
        } catch(error){
          console.log(error)
        } 
  }

  useEffect(()=>{
    getUser()
  }, [])

  useEffect(()=>{
    getGenderedUsers()
  }, [user])


  const [lastDirection, setLastDirection] = useState()

  const updateMatch = async (swipedUserId) =>{
    try{
      const response = await axios.put('http://localhost:8000/addMatch', {
        userId,
        swipedUserId,
      })

      getUser();
      
    } catch(error){
      console.log(error)
    }
  }

  const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(userId)


  const filteredGeneratedUsers = genderedUsers?.filter(generatedUser => !matchedUserIds.includes(generatedUser.user_id))

  const swiped = (direction, swipedUserId) => {

    if(direction === "right"){
      updateMatch(swipedUserId)
    }
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
  });


  return (
  <>
    { user && <div className="dashboard">
      {chatVisible && <ChatContainer user={user}/>}
      <div className="swiper-container">
        <div className="cardContainer">
          <div className="gps-bar">
            <span><img src={locationIcon}alt=""/>Warszawa</span>
            <span><img src={settingsIcon} alt=""/></span>
            <span className='icon'><img src={logoIcon} alt=""/></span>
          </div>
          {filteredGeneratedUsers?.map((character) =>
            <TinderCard className='swipe' key={character.user_id} onSwipe={(dir) => swiped(dir, character.user_id)} onCardLeftScreen={() => outOfFrame(character.user_name)}>
              <div style={{ backgroundImage: 'url(' + character.img + ')' }} className='card'>
                <h3>{character.user_name}</h3>
                <p>{character.about}</p>
              </div>
            </TinderCard>)}
        </div>
      </div>
      <Navbar/>
    </div> }
  </>
  );
}

export default Dashboard;