import { Button, Card, CardActions, CardContent, CardHeader, Grow, TextField } from '@material-ui/core';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addNewBoard } from '../../../service/boards';
import { Routes } from '../../../service/config';
import { NewBoard } from '../../../types/board';
import './CreateBoard.css';

export const CreateBoard = () => {
  const history = useHistory();
  const [boardName, setBoardName] = useState('EuroTour');
  const [createdBy, setCreatedBy] = useState('SuperHero');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const board: NewBoard = {
      name: boardName,
      createdBy: createdBy,
      createdAt: new Date(),
    };
    const newBoardId = await addNewBoard(board);
    history.push(`${Routes.boards}/${newBoardId}`);
  };

  return (
    <Grow in={true} timeout={1000}>
      <form onSubmit={handleSubmit}>
        <Card variant='outlined' className='CreateBoardCard'>
          <CardHeader
            className='CreateBoardCardHeader'
            title='Create New Task Board'
            titleTypographyProps={{ variant: 'h4' }}
          />
          <CardContent className='CreateBoardCardContent'>
            <TextField
              className='CreateBoardTextField'
              required
              id='filled-required'
              label='Board Name'
              placeholder='Enter a board name'
              defaultValue={boardName}
              variant='outlined'
              onChange={(event: ChangeEvent<HTMLInputElement>) => setBoardName(event.target.value)}
            />
            <TextField
              className='CreateBoardTextField'
              required
              id='filled-required'
              label='Your Name'
              placeholder='Enter your name'
              defaultValue={createdBy}
              variant='outlined'
              onChange={(event: ChangeEvent<HTMLInputElement>) => setCreatedBy(event.target.value)}
            />
          </CardContent>
          <CardActions className='CreateBoardCardAction'>
            <Button type='submit' variant='contained' color='primary' className='CreateBoardButton'>
              Create
            </Button>
          </CardActions>
        </Card>
      </form>
    </Grow>
  );
};
