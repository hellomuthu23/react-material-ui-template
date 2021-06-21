import { Status } from './status';

export interface Board {
  id: string;
  name: string;
  status: Status;
  createdBy: string;
  createdById: string;
  createdAt: Date;
  updatedAt?: Date;
  tasks: Task[];
}

export interface NewBoard {
  name: string;
  createdBy: string;
  createdAt: Date;
}

export interface Task {
  id: string;
  name: string;
  description?: string;
  status: Status;
  createdAt: Date;
  createdBy?: string;
}
