import React, { useEffect, useState } from 'react';
import './forecastitem.css';

const Forecastitem = ({ lat, lon, currcity, day, tempunit }) => {
  const [day_1, setday_1] = useState("");
  const [day_1temp, setday_1temp] = useState("");
  const [day_1high, setday_1high] = useState("");
  const [day_1low, setday_1low] = useState("");
  const [day_1icon, setday_1icon] = useState("");
  const [displayicon, setdisplayicon] = useState("C");
  const [displaytemp, setdisplaytemp] = useState("");
  const [display_high, setdisplayhigh] = useState("");
  const [display_low, setdisplaylow] = useState("");

  // experimenting with the forecast item background
  const [bg,setbg]=useState("");

  const forecastweather = async (lat, lon, dayfor) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`;
      const response = await fetch(url);
      const forecastdata = await response.json();
      console.log("forecastdata",forecastdata);
      const date = new Date(forecastdata.list[dayfor].dt_txt);
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const dayofweek = daysOfWeek[date.getDay()];
      setday_1(dayofweek);
      
      setday_1temp(forecastdata.list[dayfor].main.temp);
      setday_1high(forecastdata.list[dayfor].main.temp_max);
      setday_1low(forecastdata.list[dayfor].main.temp_min);
      setday_1icon(forecastdata.list[dayfor].weather[0].icon);

      // // experimenting with the forecast item background
      // console.log("forecast data",forecastdata);
      // console.log("condition:",forecastdata.list[dayfor].weather[0].main);
      setbg(forecastdata.list[dayfor].weather[0].main);

    } catch (error) {
      console.log("error in fetching forecast data", error);
    }
  }

    useEffect(() => {
    if (currcity) {
      forecastweather(lat, lon, day);
    }
    }, [currcity,lat, lon, day]);


    useEffect(() => {
        tempunit==="metric"? setdisplaytemp(day_1temp) : setdisplaytemp(((day_1temp * 9) / 5 + 32).toFixed(2));
        tempunit==="metric"? setdisplayhigh(day_1high) : setdisplayhigh(((day_1high * 9) / 5 + 32).toFixed(2));
        tempunit==="metric"? setdisplaylow(day_1low) : setdisplaylow(((day_1low * 9) / 5 + 32).toFixed(2));
        tempunit==="metric"? setdisplayicon("C") : setdisplayicon("F") ;
    }, [tempunit, day_1temp, day_1high, day_1low]);

  return (
    <div className='forecast-item'>
      <div className="dayname">
        {day_1}
      </div>
      <div className="temp">
        <span className='large'>{displaytemp} °{displayicon}</span>
        <span className='small darkgrey center'>
          High:{display_high}°{displayicon}
          <br />
          Low: {display_low}°{displayicon}
          <br />
          weather: {bg}
        </span>
      </div>
      <div className="forecasticon">
        <img src={`https://openweathermap.org/img/wn/${day_1icon}@2x.png`} alt="forecast icon" />
      </div>
    </div>
  );
}

export default Forecastitem;
