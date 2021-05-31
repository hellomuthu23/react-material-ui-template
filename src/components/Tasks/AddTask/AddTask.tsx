import { Button, Card, CardActions, CardContent, Dialog, DialogTitle, TextField } from '@material-ui/core';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { ulid } from 'ulid';
import { addTask } from '../../../service/task';
import { Task } from '../../../types/board';
import { Status } from '../../../types/status';
import './AddTask.css';

export interface AddTaskProps {
  boardId: string;
  show: boolean;
  onClose: () => void;
}
export const AddTask: React.FC<AddTaskProps> = ({ show, boardId, onClose }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const task: Task = {
      id: ulid(),
      name: taskName,
      description: taskDescription,
      status: Status.NotStarted,
      createdBy: createdBy,
      createdAt: new Date(),
    };
    addTask(task, boardId);
    onClose();
  };

  return (
    <Dialog onClose={() => onClose()} aria-labelledby='simple-dialog-title' open={show}>
      <DialogTitle id='simple-dialog-title'>Add Task</DialogTitle>

      <form onSubmit={handleSubmit}>
        <Card variant='outlined' className='AddTaskCard'>
          <CardContent className='AddTaskCardContent'>
            <TextField
              className='AddTaskTextField'
              required
              id='filled-required'
              label='Task Name'
              placeholder='Enter a task name'
              defaultValue={taskName}
              variant='outlined'
              onChange={(event: ChangeEvent<HTMLInputElement>) => setTaskName(event.target.value)}
            />
            <TextField
              className='AddTaskTextField'
              required
              id='filled-required'
              label='Description'
              placeholder='Enter description'
              defaultValue={createdBy}
              variant='outlined'
              onChange={(event: ChangeEvent<HTMLInputElement>) => setTaskDescription(event.target.value)}
            />
            <TextField
              className='AddTaskTextField'
              required
              id='filled-required'
              label='Your Name'
              placeholder='Enter your name'
              defaultValue={createdBy}
              variant='outlined'
              onChange={(event: ChangeEvent<HTMLInputElement>) => setCreatedBy(event.target.value)}
            />
          </CardContent>
          <CardActions className='AddTaskCardAction'>
            <Button type='submit' variant='contained' color='primary' className='AddTaskButton'>
              Add
            </Button>
          </CardActions>
        </Card>
      </form>
    </Dialog>
  );
};
