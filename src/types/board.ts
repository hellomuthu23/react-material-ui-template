import { Status } from './status';

export interface Board {
  id: string;
  name: string;
  average: number;
  status: Status;
  createdBy: string;
  createdById: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface NewBoard {
  name: string;
  createdBy: string;
  createdAt: Date;
}
