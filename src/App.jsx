import './App.css';
import React, { useEffect, useState } from 'react';
import Card from './components/Card/Card';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);
  const [bg, setBg] = useState(null);
  const [s, setS] = useState('3%');

  const toggleBackground = () => {
    setBg(
      bg ===
        'https://www.infocampo.com.ar/wp-content/uploads/2020/07/Clima-Tiempo-despejado-Trigo.jpg'
        ? 'https://cdn.pixabay.com/photo/2017/10/12/18/29/night-2845347_1280.jpg'
        : 'https://www.infocampo.com.ar/wp-content/uploads/2020/07/Clima-Tiempo-despejado-Trigo.jpg',
    );
    setS(s === '3%' ? '60%' : '3%');
  };

  const getWeather = (lat, lon) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=da3cf24273ce5f7ba52120f47d6b8f88
        `,
      )
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      let date = new Date();
      if (date.getHours() >= 6 && date.getHours() < 21) {
        setBg(
          'https://www.infocampo.com.ar/wp-content/uploads/2020/07/Clima-Tiempo-despejado-Trigo.jpg',
        );
      } else
        setBg('https://cdn.pixabay.com/photo/2017/10/12/18/29/night-2845347_1280.jpg');
    });
  }, []);

  return (
    <div
      className="App flex justify-around items-center flex-col"
      style={{
        backgroundImage: `url("${bg}")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <button className="toggle" onClick={toggleBackground}>
        <p className="span" style={{ marginLeft: `${s}`, transition: '0.6s' }}></p>
      </button>
      <Card data={data} />
      <footer>Developed by: Sneyder Silva.</footer>
    </div>
  );
};

export default App;
