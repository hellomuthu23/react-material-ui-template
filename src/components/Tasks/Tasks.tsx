import { Button, Card, CardActions, CardContent, CardHeader, Grow, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { getBoard } from '../../service/boards';
import { Task } from '../../types/board';
import './Tasks.css';

export interface AddTaskProps {
  boardId: string;
}
export const Tasks: React.FC<AddTaskProps> = ({ boardId }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchData() {
      const boards = getBoard(boardId);
      if (boards) {
        setTasks(boards.tasks);
      }
    }
    fetchData();
  }, [boardId]);

  return (
    <>
      {tasks &&
        tasks.map((task, index) => (
          <Grow in={true} key={index} timeout={1000}>
            <div className='TasksCard'>
              <div className='TasksCardHeader'>{task.name}</div>
              <div className='TasksCardContent'>{task.description}</div>
            </div>
          </Grow>
        ))}
    </>
  );
};
