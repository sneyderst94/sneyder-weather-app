import './App.css';
import React, { useEffect, useState } from 'react';
import Card from './components/Card/Card';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);
  const [bg, setBg] = useState(null);
  const [onOff, setOnOff] = useState('3%');

  //Función para cambiar modo claro y oscuro
  const toggleBackground = () => {
    setBg(
      bg ===
        'https://www.infocampo.com.ar/wp-content/uploads/2020/07/Clima-Tiempo-despejado-Trigo.jpg'
        ? 'https://cdn.pixabay.com/photo/2017/10/12/18/29/night-2845347_1280.jpg'
        : 'https://www.infocampo.com.ar/wp-content/uploads/2020/07/Clima-Tiempo-despejado-Trigo.jpg',
    );
    setOnOff(onOff === '3%' ? '60%' : '3%');
  };

  // Función para obtener la data del clima
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
    // Función para optener la latitud y longitud del usuario
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      // función para obtener el horario del usuario y detantar si usar background claro u oscuro
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
      className="App flex justify-center items-center flex-col"
      style={{
        backgroundImage: `url("${bg}")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <button className="toggle" onClick={toggleBackground}>
        <p className="span" style={{ marginLeft: `${onOff}`, transition: '0.6s' }}></p>
      </button>
      <Card data={data} />
      <footer>Developed by: Sneyder Silva.</footer>
    </div>
  );
};

export default App;
