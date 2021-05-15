import { Button, Card, CardActions, CardContent, CardHeader, Grow, TextField } from '@material-ui/core';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addNewRoom } from '../../../service/chatRooms';
import { NewRoom } from '../../../types/room';
import './CreateRoom.css';

export const CreateRoom = () => {
  const history = useHistory();
  const [chatRoomName, setRoomName] = useState('Avengers');
  const [createdBy, setCreatedBy] = useState('SuperHero');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const chatRoom: NewRoom = {
      name: chatRoomName,
      createdBy: createdBy,
      createdAt: new Date(),
    };
    const newRoomId = await addNewRoom(chatRoom);
    history.push(`/chatRoom/${newRoomId}`);
  };

  return (
    <Grow in={true} timeout={1000}>
      <form onSubmit={handleSubmit}>
        <Card variant='outlined' className='CreateRoomCard'>
          <CardHeader
            className='CreateRoomCardHeader'
            title='Create New Session'
            titleTypographyProps={{ variant: 'h4' }}
          />
          <CardContent className='CreateRoomCardContent'>
            <TextField
              className='CreateRoomTextField'
              required
              id='filled-required'
              label='Session Name'
              placeholder='Enter a session name'
              defaultValue={chatRoomName}
              variant='outlined'
              onChange={(event: ChangeEvent<HTMLInputElement>) => setRoomName(event.target.value)}
            />
            <TextField
              className='CreateRoomTextField'
              required
              id='filled-required'
              label='Your Name'
              placeholder='Enter your name'
              defaultValue={createdBy}
              variant='outlined'
              onChange={(event: ChangeEvent<HTMLInputElement>) => setCreatedBy(event.target.value)}
            />
          </CardContent>
          <CardActions className='CreateRoomCardAction'>
            <Button type='submit' variant='contained' color='primary' className='CreateRoomButton'>
              Create
            </Button>
          </CardActions>
        </Card>
      </form>
    </Grow>
  );
};
