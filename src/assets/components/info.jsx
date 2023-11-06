import React, { useEffect, useState } from "react";
import Week from "./weeks";
import Card from "./card";
import "../styles/info.css";

export default function Info(props) {
  let [todaysWeather, setTodaysWeather] = useState([]);
  let [weeksWeather, setWeeksWeather] = useState([]);

  let location = props.searchLocation;
  let api_key = "a4ee90c99a324c11a06183112230111";

  // this is me fecthing data from the weatherapi for only one day
  async function getsTodaysWeather() {
    try {
      let url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${location}&aqi=no`;
      let responce = await fetch(url);
      let data = await responce.json();
      todaysWeather = data;
      setTodaysWeather(todaysWeather);
      let bg = document.getElementsByClassName("Search-container")[0];
      bg.style.background = `url(https://source.unsplash.com/random/?${location})`;
      bg.style.backgroundSize = "cover";
      bg.style.backgroundRepeat = "no-repeat";
      bg.style.backgroundPosition = "center center";
    } catch (error) {
      alert("Could not find address");
      // window.location.reload(true);
      if (props.location) {
        location = props.location
        getsWeeksWeather()
        getsTodaysWeather()
        } else {
          location = 'Nigeria'
        }
    }
  }

  //   i need to call the function above everytime the user puts in a different location and i need it to only call ones at a time
  //   and thats where this useEffect comes in, Allowing ui to render any new update only if the location changes
  useEffect(() => {
    if (props.searchLocation !== "") {
      getsTodaysWeather();
      getsWeeksWeather();
    }
    location = location;
  }, [location]);

  async function getsWeeksWeather() {
    try {
      let url = `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${location}&days=7&aqi=no&alerts=no`;
      let responce = await fetch(url);
      let data = await responce.json();
      weeksWeather = data;
      weeksWeather = weeksWeather.forecast.forecastday
      setWeeksWeather(weeksWeather);
      
    } catch (error) {
      alert("Could not find address");
      // window.location.reload(true);
      if (props.location) {
      location = props.location
      getsWeeksWeather()
      getsTodaysWeather()
      } else {
        location = 'Nigeria'
      }
    }
  }
  
  return (
    <div className="info-container">
      <div>
        <h1>Today</h1>
        <Card todaysWeather={todaysWeather} />
      </div>
      <div>
        <h2>Daily</h2>
        <Week weeksWeather={weeksWeather} />
      </div>
    </div>
  );
}
