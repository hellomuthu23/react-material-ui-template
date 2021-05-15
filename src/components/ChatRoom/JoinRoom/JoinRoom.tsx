import { Button, Card, CardActions, CardContent, CardHeader, Grow, TextField } from '@material-ui/core';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getRoom } from '../../../service/chatRooms';
import { addUserToRoom, isCurrentUserInRoom } from '../../../service/users';
import './JoinRoom.css';

export const JoinRoom = () => {
  const history = useHistory();
  let { id } = useParams<{ id: string }>();

  const [joinRoomId, setJoinRoomId] = useState(id);
  const [playerName, setUserName] = useState('');
  const [chatRoomFound, setIsRoomFound] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (joinRoomId) {
        if (await getRoom(joinRoomId)) {
          setIsRoomFound(true);
          if (isCurrentUserInRoom(joinRoomId)) {
            history.push(`/chatRoom/${joinRoomId}`);
          }
        }
      }
    }
    fetchData();
  }, [joinRoomId, history]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (joinRoomId) {
      const res = await addUserToRoom(joinRoomId, playerName);

      setIsRoomFound(res);
      if (res) {
        history.push(`/chatRoom/${joinRoomId}`);
      }
    }
  };

  return (
    <Grow in={true} timeout={500}>
      <div>
        <form onSubmit={handleSubmit}>
          <Card variant='outlined' className='JoinRoomCard'>
            <CardHeader
              className='JoinRoomCardHeader'
              title='Join a Session'
              titleTypographyProps={{ variant: 'h4' }}
            />
            <CardContent className='JoinRoomCardContent'>
              <TextField
                error={!chatRoomFound}
                helperText={!chatRoomFound && 'Session not found, check the ID'}
                className='JoinRoomTextField'
                required
                id='filled-required'
                label='Session ID'
                placeholder='xyz...'
                defaultValue={joinRoomId}
                variant='outlined'
                onChange={(event: ChangeEvent<HTMLInputElement>) => setJoinRoomId(event.target.value)}
              />
              <TextField
                className='JoinRoomTextField'
                required
                id='filled-required'
                label='Your Name'
                placeholder='Enter your name'
                defaultValue={playerName}
                variant='outlined'
                onChange={(event: ChangeEvent<HTMLInputElement>) => setUserName(event.target.value)}
              />
            </CardContent>
            <CardActions className='JoinRoomCardAction'>
              <Button type='submit' variant='contained' color='primary' className='JoinRoomButton'>
                Join
              </Button>
            </CardActions>
          </Card>
        </form>
      </div>
    </Grow>
  );
};
