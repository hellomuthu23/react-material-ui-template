import { CircularProgress, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getBoard } from '../../service/boards';
import { Board } from '../../types/board';
import { BoardArea } from './RoomArea/RoomArea';
import './Board.css';
import { Routes } from '../../service/config';

export const BoardComponent = () => {
  let { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [board, setBoard] = useState<Board | undefined>(undefined);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData(id: string) {
      setIsLoading(true);
      setBoard(getBoard(id));

      setIsLoading(false);

      // history.push(`${Routes.join}/${id}`);
    }
    fetchData(id);
  }, [id, history]);

  if (loading) {
    return (
      <div className='BoardLoading'>
        <CircularProgress />
      </div>
    );
  }

  return <>{board ? <BoardArea board={board} /> : <Typography>Board not found</Typography>}</>;
};

export default Board;
