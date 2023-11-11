import { Seat } from '../Seat';

export const SeatRow = ({ row, rowSelectedSeat }) => {
  return [
    <div className="seat-row">
      {row.map((seat) => {
        return (
          <Seat
            key={seat.number}
            number={seat.number}
            isOccupied={seat.isOccupied}
            isSelected={seat.number === rowSelectedSeat ? true : false}
          />
        );
      })}
    </div>,
  ];
};
