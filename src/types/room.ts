import { Status } from './status';

export interface Room {
  id: string;
  name: string;
  average: number;
  roomStatus: Status;
  createdBy: string;
  createdById: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface NewRoom {
  name: string;
  createdBy: string;
  createdAt: Date;
}
