import { Button, Card, CardActions, CardContent, CardHeader, Grow, TextField } from '@material-ui/core';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getBoard } from '../../../service/boards';
import { Routes } from '../../../service/config';
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
        if (await getBoard(joinRoomId)) {
          setIsRoomFound(true);
          history.push(`${Routes.boards}/${joinRoomId}`);
        }
      }
    }
    fetchData();
  }, [joinRoomId, history]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (joinRoomId) {
      setIsRoomFound(true);
      history.push(`${Routes.boards}/${joinRoomId}`);
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
