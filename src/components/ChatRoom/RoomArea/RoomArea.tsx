import React from 'react';
import { Board } from '../../../types/board';
import './RoomArea.css';

interface BoardAreaProps {
  board: Board;
}
export const BoardArea: React.FC<BoardAreaProps> = ({ board }) => {
  return (
    <>
      <div className='ContentArea'>{board.name}</div>
      <div className='Footer'></div>
    </>
  );
};

export default BoardArea;
