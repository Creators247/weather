import React, { useEffect, useState } from "react";
import "../styles/info.css";

export default function Info(props) {
  let [todaysWeather, setTodaysWeather] = useState([]);
  let [weeksWeather, setWeeksWeather] = useState([]);

  let location = props.searchLocation;
  let api_key = "a4ee90c99a324c11a06183112230111";

  // this is me fecthing data from the weatherapi for only one day
    async function getsTodaysWeather (){
   try {
    let url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${location}&aqi=no`;
    let responce = await fetch(url);
    let data = await responce.json();
    todaysWeather = data;
    setTodaysWeather(todaysWeather);
    let bg = document.getElementsByClassName('Search-container')[0]
    bg.style.background = `url(https://source.unsplash.com/random/?${location})`;
    bg.style.backgroundSize ='cover';
    bg.style.backgroundRepeat = 'no-repeat';
    bg.style.backgroundPosition = 'center center';
   } catch (error) {
    location = 'nigeria'
    alert('Could not find address');
    window.location.reload(true);
    location = 'nigeria'
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

  const Card = () => {
    let temp;
    let condition;
    let icon;
    let region;
    let date;
    let feelLike;
    let humidity;
    let windDegree;
    let visibility;
    let uv;
    if (todaysWeather.current !== undefined) {
      temp = todaysWeather.current.temp_c;
      condition = todaysWeather.current.condition.text;
      icon = todaysWeather.current.condition.icon;
      region = `${todaysWeather.location.name} , ${todaysWeather.location.country}`;
      date = new Date(todaysWeather.location.localtime);
      date = String(date);
      date = date.split(" ").slice(0, 4).join(" ");
      feelLike = todaysWeather.current.feelslike_c;
      humidity = todaysWeather.current.humidity;
      windDegree = todaysWeather.current.wind_dir;
      visibility = todaysWeather.current.vis_km;
      uv = todaysWeather.current.uv;
    }
    return (
      <section className="card">
        <div>
          <h2>
            {temp}
            <sup>0</sup>
          </h2>
          <h3>
            {condition}
            <img src={icon}></img>
          </h3>
          <p>{region}</p>
          <p>{date}</p>
        </div>
        <hr />
        <div>
          <p>
            Real feel: {feelLike}
            <sup>o</sup>
          </p>
          <p>Uv index: {uv} </p>
          <p>Humidity: {humidity}% </p>
          <p>Visibility: {visibility} km </p>
          <p>Wind direction: {windDegree} </p>
        </div>
      </section>
    );
  };

  async function getsWeeksWeather ()  {
    try {
      let url = `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${location}&days=7&aqi=no&alerts=no`;
    let responce = await fetch(url);
    let data = await responce.json();
    weeksWeather = data;
    setWeeksWeather(weeksWeather.forecast.forecastday);
    } catch (error) {
      console.log('the error' + error);
      window.location.reload(true);
      location = 'nigeria'
    }
    
  };

  const Week = () => {
    let DisplayFuc;
    let date;
    if (weeksWeather !== undefined) {
      DisplayFuc = weeksWeather.map((userElement) => {
        date = new Date(userElement.date);
        date = String(date);
        date = date.split(" ").slice(0, 4).join(" ");
        return (
          <div className="demi-cards" key={userElement.date_epoch}>
            <div>
              <h3>
                {userElement.day.maxtemp_c}
                <sup>0</sup>
              </h3>
              <h4>
                {userElement.day.condition.text}
                <img src={userElement.day.condition.icon}></img>
              </h4>
              <p>{date}</p>
            </div>
            <div className="Screen" >
              <p>Real feel: {userElement.hour[12].feelslike_c}<sup>o</sup></p>
              <p>Uv index: {userElement.hour[12].uv} </p>
              <p>Humidity: {userElement.hour[12].humidity}% </p>
              <p>Visibility: {userElement.hour[12].vis_km} km </p>
              <p>Wind direction: {userElement.hour[12].wind_dir} </p>
            </div>
          </div>
        );
      });
    }
    return (
      <>
        <div className="demi">{DisplayFuc}</div>
      </>
    );
  };

  return (
    <div className="info-container">
      <div>
        <h1>Today</h1>
        <Card />
      </div>
      <div>
        <h2>Daily</h2>
        <Week />
      </div>
    </div>
  );
}
