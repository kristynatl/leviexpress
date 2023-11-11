import { useState } from 'react';
import { JourneyPicker } from '../../components/JourneyPicker';
import { JourneyDetail } from '../../components/JourneyDetail';
import { useNavigate } from 'react-router-dom';
import { SeatPicker } from '../../components/SeatPicker';
import './style.css';

export const HomePage = () => {
  const navigate = useNavigate();
  const [journey, setJourney] = useState(null);
  const [userSeat, setUserSeat] = useState(null);

  const handleJourneyChange = (journey) => {
    setJourney(journey);
    setUserSeat(journey.autoSeat);
  };

  const handleBuy = async () => {
    const response = await fetch(
      'https://apps.kodim.cz/daweb/leviexpress/api/reservation',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create',
          seat: userSeat,
          journeyId: journey.journeyId,
        }),
      },
    );

    const data = await response.json();
    navigate(`/reservation/${data.results.reservationId}`);
  };

  return (
    <main>
      <JourneyPicker onJourneyChange={handleJourneyChange} />
      {journey !== null ? <JourneyDetail journey={journey} /> : null}
      {journey !== null ? (
        <SeatPicker
          seats={journey.seats}
          journeyId={journey.journeyId}
          selectedSeat={userSeat}
          onSeatSelected={setUserSeat}
        />
      ) : null}
      {journey !== null ? (
        <div className="controls container">
          <button onClick={handleBuy} className="btn btn--big" type="button">
            Rezervovat
          </button>
        </div>
      ) : null}
    </main>
  );
};
