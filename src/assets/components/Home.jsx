import "../styles/Home.css";
import Info from "./info.jsx";
import { BiSearch } from "react-icons/bi";
import { ImLocation } from "react-icons/im";
import React, { useState, useEffect } from "react";

export default function Home() {
  let [searchLocation, setSearchLocation] = useState("");

 
  window.onload = geoFindMe();
  const [location, setLocation] = useState("");
  //  getting the users long and lat
  function geoFindMe() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    function success(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      reverseGeocodingWithGoogle(latitude, longitude);
    }
    function error() {
      navigator.geolocation
    }
    
    navigator.geolocation.getCurrentPosition(success, error);
  }
  //this uses the long & lat to get the users country buy making a fecth api to googles map and returns the results
  const reverseGeocodingWithGoogle = async (latitude, longitude) => {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyByu-TG-Cq7L-SBm3_0M2lbWTxH6W-jbwQ`;
    let responce = await fetch(url);
    let data = await responce.json();
    let userLocation = data.plus_code.compound_code;
    userLocation = userLocation.split(" ").splice(-1)[0].toUpperCase();
    setLocation(userLocation);
  };
  // component to display the user location
  const Location = () => {
    useEffect(() => {
      setSearchLocation(location);
    }, []);
    return (
      <>
        <div className="location">
          <ImLocation className="loc-icon" />
          <div>
            <p>Current Location</p>
            <b>
              <p>{location}</p>
            </b>
          </div>
        </div>
      </>
    );
  };
   function Search() {
    let it;
    const search = (events) => {
      events.preventDefault();
      if (events.target.tagName === "svg") {
        it = events.target.parentElement.previousElementSibling.value;
        searchLocation = it;
        setSearchLocation(searchLocation);
        events.target.parentElement.previousElementSibling.value = "";
      } else {
        it = events.target.previousElementSibling.value;
        searchLocation = it;
        setSearchLocation(searchLocation);
        events.target.previousElementSibling.value = "";
      }
    };
    const search2 = (events) => {
      if (events.key === "Enter") {
        let it;
        events.preventDefault();
        it = events.target.value;
        searchLocation = it;
        setSearchLocation(searchLocation);
        events.target.parentElement.previousElementSibling.value = "";
      }
    };
    return (
      <div>
        <input
          type="search"
          name=""
          id="search"
          placeholder="Enter Location"
          onKeyDown={search2}
        />{" "}
        <button onClick={search}>
          <BiSearch className="loc-icon" />
        </button>
      </div>
    );
  }
  return (
    <>
      <div id="Home">
        <div className="Search-container">
          <div className="Transparent">
            <section>
              <h2>Forecast</h2>
              <Location />
            </section>
            <div className="search">
              <h1>The Only Weather Forecast You Need</h1>
              <hr />
              <Search className="loc-icon" />
            </div>
          </div>
        </div>
        <Info searchLocation={searchLocation} location={location}/>
      </div>
    </>
  );
}
