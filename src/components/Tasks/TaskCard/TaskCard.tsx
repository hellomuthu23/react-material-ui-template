import React from 'react';
import { Task } from '../../../types/board';
import './TaskCard.css';

export interface TaskCardProps {
  task: Task;
  boardId: string;
}
export const TaskCard: React.FC<TaskCardProps> = ({ boardId, task }) => {
  if (!task) {
    return null;
  }
  return (
    <div className='TaskCard'>
      <div className='TaskCardHeader'>{task.name}</div>
      <div className='TaskCardContent'>{task.description}</div>
    </div>
  );
};
