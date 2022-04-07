import {useCookies} from 'react-cookie'

import './ChatHeader.scss'

const ChatHeader = ({user}) => {

  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const logout = ()=>{

    removeCookie('UserId', cookies.userId)
    removeCookie('AuthToken', cookies.AuthToken)
    window.location.reload();

  }

  return (  <div className="chat-container-header">
    <div className="profile">
      <div className="img-container">
        <img src={user.img} alt="Photo of user"/>
      </div>
      <h3>{user.name}</h3>
    </div>
    <i className="log-out-icon" onClick={logout}></i>
  </div> );
}
 
export default ChatHeader;