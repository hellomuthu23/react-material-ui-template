import { Button, Fade } from '@material-ui/core';
import React, { useState } from 'react';
import { Board, Task } from '../../../types/board';
import { AddTask } from '../../Tasks/AddTask/AddTask';
import { TaskCard } from '../../Tasks/TaskCard/TaskCard';
import './BoardArea.css';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import ReactBoard from '@lourenci/react-kanban';
import '@lourenci/react-kanban/dist/styles.css';
import { Status } from '../../../types/status';

interface BoardAreaProps {
  board: Board;
}
export const BoardArea: React.FC<BoardAreaProps> = ({ board }) => {
  const [showAddTask, setShowAddTask] = useState(false);

  const data = {
    columns: [
      {
        id: 1,
        title: 'Todo',
        cards: getTasksByStatus(board.tasks, Status.NotStarted),
      },
      {
        id: 2,
        title: 'Doing',
        cards: getTasksByStatus(board.tasks, Status.InProgress),
      },
      {
        id: 3,
        title: 'Done',
        cards: getTasksByStatus(board.tasks, Status.Finished),
      },
    ],
  };

  const renderCard = ({ content }, { removeCard, dragging }) => <TaskCard boardId={board.id} task={content}></TaskCard>;
  return (
    <>
      <div className='BoardAreaHeader'>
        <div className='BoardAreaHeaderContainer'>
          <h3>{board.name}</h3>
          <Button startIcon={<AddCircleOutlineIcon />} color='primary' onClick={() => setShowAddTask(true)}>
            Add Task
          </Button>
        </div>
      </div>

      <Fade in={true} timeout={2000}>
        <div>
          <ReactBoard initialBoard={data} renderCard={renderCard} />
        </div>
      </Fade>
      {showAddTask && <AddTask show={showAddTask} onClose={() => setShowAddTask(false)} boardId={board.id}></AddTask>}
      <div className='Footer'></div>
    </>
  );
};

export default BoardArea;

const getTasksByStatus = (tasks: Task[], status: Status) => {
  const filteredTasks = tasks
    .filter((task) => task.status === status)
    .map((task) => {
      return {
        id: task.id,
        content: {
          ...task,
        },
      };
    });
  return filteredTasks;
};
