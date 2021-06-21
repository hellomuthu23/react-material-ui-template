import { CircularProgress, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getBoard } from '../../service/boards';
import { Board } from '../../types/board';
import { BoardArea } from './BoardArea/BoardArea';
import './Board.css';

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
