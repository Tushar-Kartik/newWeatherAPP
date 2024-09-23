import React ,{ useState } from 'react';
import './home.css';
import Searchbar from '../components/searchbar/searchbar.js';
import Displaymain from '../components/displaymain/displaymain.js';
import Forecast from '../components/forecast/forecast.js';
import Footer from '../components/footer/footer.js';

const Home = () => {

  // learning how to send data between two sibling
  //step1 crete a usestate hook
  const[ currcity , setcurrcity] = useState("Delhi");
  const[lat , setlat]=useState("28.6667");
  const[lon , setlon]=useState("77.2167");
  const[tempunit,settempunit]=useState("metric");



  return (
    <div className='main'>
        <div className='search'>
            <Searchbar
              setcurrcity={setcurrcity}
            ></Searchbar>
        </div>
        <div className='display-main center-content'>
            <Displaymain
            tempunit={tempunit}
            currcity={currcity}
            setlat={setlat}
            setlon={setlon}
            // lat={lat}
            // lon={lon}
            ></Displaymain>
        </div>
        <div className='forecast'>
            <Forecast
            tempunit={tempunit}
            currcity={currcity}
            lat={lat}
            lon={lon}
            ></Forecast>
        </div>
        <div className='footer center-content'>
          <Footer
            tempunit={tempunit}
            settempunit={settempunit}
          ></Footer>
        
        </div>
    </div>
  )
}

export default Home;