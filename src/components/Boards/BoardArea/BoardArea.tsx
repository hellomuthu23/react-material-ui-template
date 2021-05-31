import { Button, Card } from '@material-ui/core';
import React, { useState } from 'react';
import { Board, Task } from '../../../types/board';
import { AddTask } from '../../Tasks/AddTask/AddTask';
import { TaskCard } from '../../Tasks/TaskCard/TaskCard';
import './BoardArea.css';

import ReactBoard from '@lourenci/react-kanban';
import '@lourenci/react-kanban/dist/styles.css';
import { Status } from '../../../types/status';

interface BoardAreaProps {
  board: Board;
}
export const BoardArea: React.FC<BoardAreaProps> = ({ board }) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const todoCards = board.tasks.map((task) => {
    if (task.status === Status.NotStarted) {
      return {
        id: task.id,
        content: {
          name: task.name,
          description: task.description || '',
        },
      };
    }
  });
  const data = {
    columns: [
      {
        id: 1,
        title: 'Todo',
        cards: todoCards,
      },
      {
        id: 2,
        title: 'Doing',
        cards: [
          {
            id: 3,
            content: {
              title: 'Drag-n-drop support',
              description: 'Move a card between the columns',
            },
          },
        ],
      },
    ],
  };

  // ts-ignore
  const renderCard = ({ content }, { removeCard, dragging }) => (
    <TaskCard boardId={board.id} task={content as Task}></TaskCard>
  );
  return (
    <>
      <div className='ContentArea'>{board.name}</div>
      <ReactBoard allowAddCard initialBoard={data} renderCard={renderCard} />

      <Button onClick={() => setShowAddTask(true)}>Add Task</Button>
      {showAddTask && <AddTask boardId={board.id}></AddTask>}
      <div className='Footer'></div>
    </>
  );
};

export default BoardArea;
