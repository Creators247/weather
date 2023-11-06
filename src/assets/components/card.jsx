import React from "react";

export default function Card({todaysWeather}) {
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
}
