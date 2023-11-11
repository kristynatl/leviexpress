import { useEffect, useState } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';

export const ReservationPage = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    const fetchReservationDetail = async () => {
      const response = await fetch(
        `https://apps.kodim.cz/daweb/leviexpress/api/reservation?id=${id}`,
      );
      const data = await response.json();
      console.log(data.results);
      setReservation(data.results);
    };

    fetchReservationDetail();
  }, []);

  return (
    <div className="reservation container">
      <h2>
        Vaše e-jízdenka č.{' '}
        {reservation !== null ? reservation.reservationId : null}
      </h2>
      <div className="reservation__body">
        <div className="reservation__headings">
          <p>Datum cesty:</p>
          <p>Odjezd:</p>
          <p>Příjezd:</p>
          <p>Sedadlo:</p>
        </div>
        <div className="reservation__info">
          <p>{reservation !== null ? reservation.date : null}</p>
          <p>
            {reservation !== null ? reservation.fromCity.name : null},{' '}
            {reservation !== null ? reservation.fromCity.time : null}
          </p>
          <p>
            {reservation !== null ? reservation.fromCity.name : null},{' '}
            {reservation !== null ? reservation.fromCity.time : null}
          </p>
          <p>{reservation !== null ? reservation.seatNumber : null}</p>
        </div>
      </div>
    </div>
  );
};

// lqdarts85jI
