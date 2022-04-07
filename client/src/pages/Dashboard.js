import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie';

import Navbar from '../components/Navbar/Navbar'
import TinderCard from "react-tinder-card";

import './Dashboard.scss'

import logoIcon from '../pic/logo-icon.svg'
import ChatContainer from '../components/ChatContainer/ChatContainer';


const db = [
  {
    name: 'Richard Hendricks',
    url: 'https://i.imgur.com/oPj4A8u.jpeg'
  },
  {
    name: 'Erlich Bachman',
    url: 'https://i.imgur.com/oPj4A8u.jpeg'
  },
  {
    name: 'Monica Hall',
    url: 'https://i.imgur.com/oPj4A8u.jpeg'
  }
]

const Dashboard = () => {

  const [user, setUser] = useState(null);
  const [genderedUser, setGenderedUsers]= useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

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
    getGenderedUsers()
  }, [genderedUser, user])


  const characters = db
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }


  return (
  <>
    { user && <div className="dashboard">
      <ChatContainer user={user}/>
      <div className="swiper-container">
        <div className="cardContainer">
          <div className="gps-bar">
            <span><img src="" alt=""/>Warszawa</span>
            <span>Settings</span>
            <span className='icon'><img src={logoIcon} alt=""/></span>

          </div>
          {characters.map((character) =>
            <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
              <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
                <h3>{character.name}</h3>
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