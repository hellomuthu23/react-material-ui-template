import { Card, CardContent, Grid, Grow, Slide, Typography } from '@material-ui/core';
import React from 'react';
import { updateUserValue } from '../../../service/users';
import { Room } from '../../../types/room';
import { User } from '../../../types/user';
import { Status } from '../../../types/status';
import './CardPicker.css';

export interface CardConfig {
  value: number;
  color: string;
}
export const cards: CardConfig[] = [
  { value: 0, color: 'var(--color-background-secondary)' },
  { value: 1, color: '#9EC8FE' },
  { value: 2, color: '#9EC8FE' },
  { value: 3, color: '#A3DFF2' },
  { value: 5, color: '#A3DFF2' },
  { value: 8, color: '#9DD49A' },
  { value: 13, color: '#9DD49A' },
  { value: 21, color: '#F4DD94' },
  { value: 34, color: '#F4DD94' },
  { value: 55, color: '#F39893' },
  { value: 89, color: '#F39893' },
  { value: -1, color: 'var(--color-background-secondary)' },
];

interface CardPickerProps {
  chatRoom: Room;
  players: User[];
  currentUserId: string;
}
export const CardPicker: React.FC<CardPickerProps> = ({ chatRoom, players, currentUserId }) => {
  const playUser = (chatRoomId: string, playerId: string, card: CardConfig) => {
    if (chatRoom.roomStatus !== Status.Finished) {
      updateUserValue(chatRoomId, playerId, card.value);
    }
  };
  return (
    <Grow in={true} timeout={1000}>
      <div>
        <div className='CardPickerContainer'>
          <Grid container spacing={4} justify='center'>
            {cards.map((card: CardConfig, index) => (
              <Grid key={card.value} item xs>
                <Slide in={true} direction={'right'} timeout={(1000 * index) / 2}>
                  <Card
                    id={`card-${card.value}`}
                    className='CardPicker'
                    variant='outlined'
                    onClick={() => playUser(chatRoom.id, currentUserId, card)}
                    style={{
                      ...getCardStyle(players, currentUserId, card),
                      pointerEvents: getPointerEvent(chatRoom),
                    }}
                  >
                    <CardContent className='CardContent'>
                      {card.value >= 0 && (
                        <>
                          <Typography className='CardContentTop' variant='caption'>
                            {card.value}
                          </Typography>
                          <Typography className='CardContentMiddle' variant='h4'>
                            {card.value}
                          </Typography>
                          <Typography className='CardContentBottom' variant='caption'>
                            {card.value}
                          </Typography>
                        </>
                      )}
                      {card.value === -1 && (
                        <Typography className='CardContentMiddle' variant='h3'>
                          ☕
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Slide>
              </Grid>
            ))}
          </Grid>
        </div>
        <Typography variant='h6'>
          {chatRoom.roomStatus !== Status.Finished
            ? 'Click on the card to vote'
            : 'Session not ready for Voting! Wait for moderator to start'}
        </Typography>
      </div>
    </Grow>
  );
};

const getCardStyle = (players: User[], playerId: string, card: CardConfig) => {
  const player = players.find((player) => player.id === playerId);
  if (player && player.value !== undefined && player.value === card.value) {
    return {
      marginTop: '-15px',
      zIndex: 5,
      backgroundColor: card.color,
      border: '2px dashed black',
      boxShadow: '0 0px 12px 0 grey',
    };
  }
  return { backgroundColor: card.color };
};

const getPointerEvent = (chatRoom: Room) => {
  if (chatRoom.roomStatus === Status.Finished) {
    return 'none';
  }
  return 'inherit';
};
