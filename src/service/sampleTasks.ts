import { ulid } from 'ulid';
import { Task } from '../types/board';
import { Status } from '../types/status';

export const sampleTasks: Task[] = [
  {
    id: ulid(),
    name: 'Weather',
    description: 'Check weather',
    createdBy: 'Sam',
    createdAt: new Date(),
    status: Status.NotStarted,
  },
  {
    id: ulid(),
    name: 'Hotel',
    description: 'Book Hotel',
    createdBy: 'Sam',
    createdAt: new Date(),
    status: Status.NotStarted,
  },
  {
    id: ulid(),
    name: 'Flights',
    description: 'Book Flights for holiday',
    createdBy: 'Sam',
    createdAt: new Date(),
    status: Status.InProgress,
  },
  {
    id: ulid(),
    name: 'Taxi',
    description: 'Book taxi to Airport',
    createdBy: 'Sam',
    createdAt: new Date(),
    status: Status.Finished,
  },
  {
    id: ulid(),
    name: 'Shopping',
    description: 'Buy cloths for holiday',
    createdBy: 'Sam',
    createdAt: new Date(),
    status: Status.Finished,
  },
  {
    id: ulid(),
    name: 'Insurance',
    description: 'Buy Travel insurance',
    createdBy: 'Sam',
    createdAt: new Date(),
    status: Status.InProgress,
  },
  {
    id: ulid(),
    name: 'Medicine',
    description: 'Buy medicines',
    createdBy: 'Sam',
    createdAt: new Date(),
    status: Status.NotStarted,
  },
];
