import './style.css';
import { SeatRow } from '../SeatRow';

export const SeatPicker = ({
  seats,
  journeyId,
  selectedSeat,
  onSeatSelected,
}) => {
  return (
    <div className="seat-picker container">
      <h2>Vyberte sedadlo</h2>
      <div className="seats">
        {seats.map((row, index) => {
          return (
            <SeatRow
              key={index}
              row={row}
              rowSelectedSeat={selectedSeat}
              onSeatSelected={onSeatSelected}
            />
          );
        })}
      </div>
    </div>
  );
};
