import React from 'react';
import { deleteTask } from '../../../service/task';
import { Task } from '../../../types/board';
import { Status } from '../../../types/status';
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
    <div
      className='TaskCard'
      style={{
        borderLeft: `3px solid ${getCardBorderColor(task.status)}`,
      }}
    >
      <div className='TaskCardHeader'>
        <div> {task.name}</div>
        <button className='TaskDeleteButton' onClick={() => deleteTask(task.id, boardId)}>
          x
        </button>
      </div>
      <div className='TaskCardContent'>{task.description}</div>
      <div className='TaskCardFooter'>
        <div title={task.createdBy} className='TaskFooterOwner'>
          {task.createdBy?.substr(1, 1).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

const getCardBorderColor = (status: Status) => {
  switch (status) {
    case Status.NotStarted:
      return 'red';
    case Status.InProgress:
      return 'cornflowerblue';
    case Status.Finished:
      return 'limegreen';
    default:
      return 'red';
  }
};
