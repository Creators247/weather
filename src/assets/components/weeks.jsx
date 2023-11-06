import React from "react";

function Week({weeksWeather}) {
  let DisplayFuc;
  let date;
  if (weeksWeather[0] !== undefined) {
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
          <div className="Screen">
            <p>
              Real feel: {userElement.hour[12].feelslike_c}
              <sup>o</sup>
            </p>
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
}

export default Week