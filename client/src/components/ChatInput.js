import React, {useState} from 'react';


const ChatInput = () => {

const [textArea, setTextArea] = useState(null);

  return ( <div class="chat-input">
    <textarea value={textArea} onChange={(e)=> setTextArea(e.target.value)}></textarea>
    <button className='secondary-button'>Submit</button>
  </div> );
}
 
export default ChatInput;