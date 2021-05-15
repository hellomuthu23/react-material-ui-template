import React from 'react';
import { Room } from '../../../types/room';
import { User } from '../../../types/user';
import { CardPicker } from '../../Users/CardPicker/CardPicker';
import { Users } from '../../Users/Users';
import { RoomController } from '../RoomController/RoomController';
import './RoomArea.css';

interface RoomAreaProps {
  chatRoom: Room;
  players: User[];
  currentUserId: string;
}
export const RoomArea: React.FC<RoomAreaProps> = ({ chatRoom, players, currentUserId }) => {
  return (
    <>
      <div className='ContentArea'>
        <Users chatRoom={chatRoom} players={players} />
        <RoomController chatRoom={chatRoom} currentUserId={currentUserId} />
      </div>
      <div className='Footer'>
        <CardPicker chatRoom={chatRoom} players={players} currentUserId={currentUserId} />
      </div>
    </>
  );
};

export default RoomArea;
