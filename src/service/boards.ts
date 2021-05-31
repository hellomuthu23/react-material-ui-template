import { ulid } from 'ulid';
import {
  addBoardToStore,
  getBoardFromStore,
  getBoardsFromStore,
  updateBoardDataInStore,
} from '../repository/boardsStore';
import { Board, NewBoard, Task } from '../types/board';
import { Status } from '../types/status';

export const addNewBoard = async (newBoard: NewBoard): Promise<string> => {
  const user = {
    name: newBoard.createdBy,
    id: ulid(),
    status: Status.NotStarted,
  };
  const boardData: Board = {
    ...newBoard,
    id: ulid(),
    average: 0,
    tasks: sampleTasks,
    createdById: user.id,
    status: Status.Started,
  };
  addBoardToStore(boardData.id, boardData);

  return boardData.id;
};

export const getBoards = () => {
  return getBoardsFromStore();
};
export const getBoard = (id: string) => {
  return getBoardFromStore(id);
};

export const updateBoard = (boardId: string, updatedBoard: any): boolean => {
  updateBoardDataInStore(boardId, updatedBoard);
  return true;
};

const sampleTasks: Task[] = [
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
    description: 'Book Flights to Airport',
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
