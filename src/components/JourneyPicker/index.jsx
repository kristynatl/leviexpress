import React, { useEffect, useState } from 'react';
import './style.css';

const testDates = [
  {
    dateBasic: '28.05.2021',
    dateCs: 'pá 28. květen 2021',
  },
  {
    dateBasic: '29.05.2021',
    dateCs: 'so 29. květen 2021',
  },
];

export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [cities, setCities] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const fetchCitiesList = async () => {
      const response = await fetch(
        'https://apps.kodim.cz/daweb/leviexpress/api/cities',
      );
      const data = await response.json();
      setCities(data.results);
    };

    const fetchDatesList = async () => {
      const response = await fetch(
        'https://apps.kodim.cz/daweb/leviexpress/api/dates',
      );
      const data = await response.json();
      setDates(data.results);
    };

    fetchCitiesList();
    fetchDatesList();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(fromCity);
    console.log(toCity);
    console.log(date);
  };

  return (
    <div className="journey-picker container">
      <h2 className="journey-picker__head">Kam chcete jet?</h2>
      <div className="journey-picker__body">
        <form onSubmit={handleSubmit} className="journey-picker__form">
          <label>
            <div className="journey-picker__label">Odkud:</div>
            <select
              value={fromCity}
              onChange={(event) => {
                setFromCity(event.target.value);
              }}
            >
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Kam:</div>
            <select
              value={toCity}
              onChange={(event) => {
                setToCity(event.target.value);
              }}
            >
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Datum:</div>
            <select
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
              }}
            >
              <DatesOptions dates={dates} />
            </select>
          </label>
          <div className="journey-picker__controls">
            <button className="btn" type="submit">
              Vyhledat spoj
            </button>
          </div>
        </form>
        <img className="journey-picker__map" src="/map.svg" />
      </div>
    </div>
  );
};

const CityOptions = ({ cities }) => {
  return [
    <option key="" value="">
      Vyberte
    </option>,
    cities.map((city) => {
      return (
        <option key={city.code} value={city.code}>
          {city.name}
        </option>
      );
    }),
  ];
};

const DatesOptions = ({ dates }) => {
  return [
    <option key="" value="">
      Vyberte
    </option>,
    dates.map((date) => {
      return (
        <option key={date.dateBasic} value={date.dateBasic}>
          {date.dateCs}
        </option>
      );
    }),
  ];
};
