import { Grow } from '@material-ui/core';
import React from 'react';
import { Room } from '../../types/room';
import { User } from '../../types/user';
import { UserCard } from './UserCard/UserCard';
import './Users.css';

interface UsersProps {
  chatRoom: Room;
  players: User[];
}
export const Users: React.FC<UsersProps> = ({ chatRoom, players }) => {
  return (
    <Grow in={true} timeout={800}>
      <div className='UsersContainer'>
        {players.map((player: User) => (
          <UserCard key={player.id} chatRoom={chatRoom} player={player} />
        ))}
      </div>
    </Grow>
  );
};
