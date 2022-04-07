import axios from 'axios';
import React, { useState } from 'react';
import {useCookies} from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import "./OnBoarding.scss"

const OnBoarding = () => {

  let navigate = useNavigate()

  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    user_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    show_gender: false,
    gender: "man",
    look_for: "woman",
    img: "",
    about: "",
    matches: [],
  })

  const handleChange = (e) =>{
    const value = e.target.type === ("checkbox" || "radio") ? e.target.checked : e.target.value;
    const name = e.target.name;

    console.log(value)

    setFormData((prevState) =>  ({
      ...prevState,
      [name] : value,
    }))


  }
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    try{
      const response = await axios.put('http://localhost:8000/user', {formData})
      console.log('response', response)
      const success = response.status === 200;
      if(success) navigate('/dashboard')
    } catch(error){
      console.log(error)
    }

  }

  return (
    <div className="onboarding-container">
      <h2>Stwórz konto</h2>
      <form onSubmit={handleSubmit} >
        <section>
          <label htmlFor='user_name'>Imię:</label>
          <input 
          id='user_name'
          type="text" 
          name="user_name"
          placeholder='Imię'
          onChange={handleChange}
          required={true}
          value = {formData.user_name}
          />
          <label>Data urodzenia:</label>
          <div className="dob-container">
            <input 
            id='dob_day'
            type="number" 
            name="dob_day"
            placeholder='DD'
            onChange={handleChange}
            required={true}
            value = {formData.dob_day}
            />
            <input 
            id='dob_month'
            type="number" 
            name="dob_month"
            placeholder='MM'
            onChange={handleChange}
            required={true}
            value = {formData.dob_month}
            />
            <input 
            id='dob_year'
            type="number" 
            name="dob_year"
            placeholder='YYYY'
            onChange={handleChange}
            required={true}
            value = {formData.dob_year}
            />
          </div>
          <label>Płeć:</label>
          <div className="gender-container">
            <input 
            id='gender-man'
            type="radio" 
            name="gender"
            onChange={handleChange}
            value="man"
            checked={formData.gender === "man"}
            />
            <label htmlFor="gender-man">Mężczyzna</label>
            <input 
            id='gender-woman'
            type="radio" 
            name="gender"
            onChange={handleChange}
            value="woman"
            checked={formData.gender === "woman"}
            />
            <label htmlFor="gender-woman">Kobieta</label>
            <input 
            id='gender-other'
            type="radio" 
            name="gender"
            onChange={handleChange}
            value="other"
            checked={formData.gender === "other"}
            />
            <label htmlFor="gender-other">Inny</label>
          </div>
          <label htmlFor='show_gender'>Pokazuj moją płeć:</label>
          <input 
            type="checkbox" 
            name="show_gender" 
            id="show_gender"
            onChange={handleChange}
            checked={formData.show_gender}
          />
          <label>Szukam:</label>
          <div className="gender-container">
            <input 
              id='gender-interest-man'
              type="radio" 
              name="look_for"
              onChange={handleChange}
              value="man"
              checked={formData.look_for === "man"}
              />
              <label htmlFor="gender-interest-man">Mężczyzna</label>
              <input 
              id='gender-interest-woman'
              type="radio" 
              name="look_for"
              onChange={handleChange}
              value="woman"
              checked={formData.look_for === "woman"}
              />
              <label htmlFor="gender-interest-woman">Kobieta</label>
              <input 
              id='gender-interest-other'
              type="radio" 
              name="look_for"
              onChange={handleChange}
              value="other"
              checked={formData.look_for === "other"}
              />
              <label htmlFor="gender-interest-other">Inny</label>
          </div>
          <label htmlFor='about'>O mnie:</label>
          <input 
            id='about'
            type="text"
            name='about'
            placeholder='Napisz coś o sobie...'
            onChange={handleChange}
            required={true}
            value={formData.about}
          />
          <input 
            type="submit"
            value="Prześlij"/>
        </section>  
        <section>
          <label htmlFor="">Zdjęcie profilowe:</label>
          <input 
            type="url" 
            name="img" 
            id="img"
            onChange={handleChange}
            required={true}
          />
          <div className="photo-container">
            {formData.img && <img src={formData.img} alt="Profile pic preview"/>}
          </div>
        </section>
      </form>
    </div>
    );
}
 
export default OnBoarding;