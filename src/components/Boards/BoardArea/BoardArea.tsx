import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { Board } from '../../../types/board';
import { AddTask } from '../../Tasks/AddTask/AddTask';
import { Tasks} from '../../Tasks/Tasks';
import './BoardArea.css';

interface BoardAreaProps {
  board: Board;
}
export const BoardArea: React.FC<BoardAreaProps> = ({ board }) => {
  const [showAddTask, setShowAddTask] = useState(false)
  return (
    <>
      <div className='ContentArea'>{board.name}</div>
      <Tasks boardId={board.id}></Tasks>
      <Button onClick={()=>setShowAddTask(true)}>Add Task</Button>
      {showAddTask && <AddTask boardId={board.id}></AddTask>}
      <div className='Footer'></div>
    </>
  );
};

export default BoardArea;
