import React from 'react';

import ChatDisplay from '../ChatDisplay';
import ChatHeader from '../ChatHeader';
import MatchesDisplay from '../MatchesDisplay';
import Navbar from '../Navbar/Navbar'

import chatPic from '../../pic/chat-profile-pic.png'


import './ChatContainer.scss'

const ChatContainer = ({user}) => {
  return (
  <>
    <ChatHeader user={user}/>
    <div>
      <button className='option'>Matches</button>
      <button className='option'>Chat</button>
    </div>
    <div className="chat-users-container">
      <div className="chat-user">
        <img src={chatPic} alt=""/>
        <span>Nazwa</span>
      </div>
      <div className="chat-user">
        <img src={chatPic} alt=""/>
        <span>Nazwa</span>
      </div>
      <div className="chat-user">
        <img src={chatPic} alt=""/>
        <span>Nazwa</span>
      </div>
      <div className="chat-user">
        <img src={chatPic} alt=""/>
        <span>Nazwa</span>
      </div>
    </div>
    
    <MatchesDisplay/>
    <ChatDisplay/>
    <Navbar/>
  </>
  );
}
 
export default ChatContainer;