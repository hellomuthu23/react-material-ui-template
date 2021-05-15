import { Status } from './status';

export interface User {
  name: string;
  id: string;
  status: Status;
  value?: number;
}

export interface UserChatRoom {
  roomId: string;
  playerId: string;
}
