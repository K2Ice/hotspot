import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {useCookies} from 'react-cookie'

import ChatContainer from './components/ChatContainer/ChatContainer';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import OnBoarding from './pages/OnBoarding';

import "./App.scss"



const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const authToken = cookies.AuthToken

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          {true && <Route path="/dashboard" element={<Dashboard/>}/>}
          {authToken && <Route path="/onboarding" element={<OnBoarding/>}/>}
          {authToken && <Route path="/chat" element={<ChatContainer/>}/>}
          
          APP
        </Routes>
      </Router>
    </div>
  );
}

export default App;
