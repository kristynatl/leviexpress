import { useState } from 'react';
import { JourneyPicker } from '../../components/JourneyPicker';
import { JourneyDetail } from '../../components/JourneyDetail';
import { useNavigate } from 'react-router-dom';
import { SeatPicker } from '../../components/SeatPicker';

export const HomePage = () => {
  const navigate = useNavigate();
  const [journey, setJourney] = useState(null);

  const handleJourneyChange = (journey) => {
    console.log(journey);
    setJourney(journey);
  };

  const handleBuy = async () => {
    console.log('Funguju!');
    const response = await fetch(
      'https://apps.kodim.cz/daweb/leviexpress/api/reservation',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create',
          seat: journey.autoSeat,
          journeyId: journey.journeyId,
        }),
      },
    );

    const data = await response.json();
    console.log(data.results.reservationId);
    navigate(`/reservation/${data.results.reservationId}`);
  };

  return (
    <main>
      <JourneyPicker onJourneyChange={handleJourneyChange} />
      {journey !== null ? <JourneyDetail journey={journey} /> : null}
      {journey !== null ? (
        <SeatPicker seats={journey.seats} journeyId={journey.journeyId} />
      ) : null}
      <div className="controls container">
        <button onClick={handleBuy} className="btn btn--big" type="button">
          Rezervovat
        </button>
      </div>
    </main>
  );
};
