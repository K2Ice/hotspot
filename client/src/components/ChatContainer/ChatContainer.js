import React, { useState } from 'react';

import ChatDisplay from '../ChatDisplay';
import ChatHeader from '../ChatHeader';
import MatchesDisplay from '../MatchesDisplay';

import './ChatContainer.scss'

const ChatContainer = ({user}) => {
  const [clickedUser, setClickedUser] = useState(null);

  return (
  <>
    <ChatHeader user={user}/>
    <div>
      <button className='option' onClick={()=>setClickedUser(null)}>Matches</button>
      <button className='option' disabled={!clickedUser}>Chat</button>
    </div>
    
    {!clickedUser && <MatchesDisplay matches={user.matches} setClickedUser={setClickedUser} />}
    {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser}/>}
  </>
  );
}

export default ChatContainer;