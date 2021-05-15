import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import React from 'react';
import { Room } from '../../../types/room';
import { User } from '../../../types/user';
import { Status } from '../../../types/status';
import { cards } from '../CardPicker/CardPicker';
import './UserCard.css';
interface UserCardProps {
  chatRoom: Room;
  player: User;
}

export const UserCard: React.FC<UserCardProps> = ({ chatRoom, player }) => {
  return (
    <Card
      variant='outlined'
      className='UserCard'
      style={{
        backgroundColor: getCardColor(chatRoom, player.value),
      }}
    >
      <CardHeader
        className='UserCardTitle'
        title={player.name}
        titleTypographyProps={{ variant: 'subtitle2', noWrap: true }}
      />
      <CardContent className='UserCardContent'>
        <Typography variant='h2' className='UserCardContentMiddle'>
          {getCardValue(player, chatRoom)}
        </Typography>
      </CardContent>
    </Card>
  );
};

const getCardColor = (chatRoom: Room, value: number | undefined): string => {
  if (chatRoom.roomStatus !== Status.Finished) {
    return 'var(--color-background-secondary)';
  }
  const card = cards.find((card) => card.value === value);
  return card ? card.color : 'var(--color-background-secondary)';
};

const getCardValue = (player: User, chatRoom: Room) => {
  if (chatRoom.roomStatus !== Status.Finished) {
    return player.status === Status.Finished ? '👍' : '🤔';
  }

  if (chatRoom.roomStatus === Status.Finished) {
    if (player.status === Status.Finished) {
      if (player.value && player.value === -1) {
        return '☕'; // coffee emoji
      }
      return player.value;
    }
    return '🤔';
  }
};
