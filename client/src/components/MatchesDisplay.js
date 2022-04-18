import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import "./MatchesDisplay.scss";

const MatchesDisplay = ({matches, setClickedUser}) => {

  const [matchedProfiles, setMatchedProfiles] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const userId = cookies.UserId

  const matchedUserIds = matches.map(({user_id})=> user_id);

  const getMatches = async () =>{
    try{
      const response = await axios.get('http://localhost:8000/users', {
        params: {userIds: JSON.stringify(matchedUserIds)},
      })

      setMatchedProfiles(response.data);
    } catch(error)
    { console.log(error)}
  } 

  useEffect(()=>{
    getMatches()
  },[matches])

  const filteredMatchesProfiles = matchedProfiles?.filter(matchedProfile => matchedProfile.matches.filter(profile => profile.user_id == userId).length > 0)

  return ( <div className="matches-display">
    {filteredMatchesProfiles?.map((match)=>(
      <div key={match.user_id} className='match-card' setClickedUser={setClickedUser(match)}>

        <div className='img-container'><img src={match?.img} alt={`${match?.user_name} profile`}/></div>
        <h3>{match?.user_name}</h3>
      </div>
    ))}

  </div> );
}

export default MatchesDisplay;