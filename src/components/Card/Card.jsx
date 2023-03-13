import './Card.css';
import Loader from '../Loader/Loader';
import wind from './Card__img/wind.png';
import humidityImg from './Card__img/humidity.png';
import { useEffect, useState } from 'react';

const Card = ({ data }) => {
  const [active, setActive] = useState(true);
  const [degrees, setDegrees] = useState(null);
  useEffect(() => {
    if (!data) return;
    //cambiar grados C° a grados F°
    if (active) setDegrees(Math.round(data?.main.temp - 273.15));
    else setDegrees(Math.round(((data?.main.temp - 273.15) * 9) / 5 + 32));
  }, [data, active]);

  return (
    <>
      {!data ? (
        <Loader />
      ) : (
        <div className="Card">
          <div>
            <p className="city__contry">
              {data?.name}, {data?.sys.country}
            </p>
          </div>
          <div className="container">
            <div className="temperature__container ">
              <p className="weather">{data?.weather[0].description}</p>
              <div className="temp">
                <h2 className="title__temp"> {degrees}°</h2>
                <img
                  className="icon__temp"
                  src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
                  alt="icon"
                />
              </div>
            </div>
            <div className="info__container">
              <div className="img__info">
                <img src={wind} alt="icon" />
                <p>{Math.round(data?.wind.speed * 3.6)}km</p>
              </div>
              <span></span>
              <div className="img__info">
                <img src={humidityImg} alt="icon" />
                <p>{data?.main.humidity}%</p>
              </div>
              <span></span>
              <div className="img__info">
                <i class="fa-solid fa-cloud"></i>
                <p>{data?.clouds.all}%</p>
              </div>
            </div>
          </div>
          <div className="button__container">
            <button
              onClick={() => {
                setActive(!active);
              }}
            >
              {active ? 'Switch to F°' : 'switch to C°'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
