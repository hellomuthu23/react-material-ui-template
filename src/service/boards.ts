import { ulid } from 'ulid';
import {
  addBoardToStore,
  getBoardFromStore,
  getBoardsFromStore,
  updateBoardDataInStore,
} from '../repository/boardsStore';
import { Board, NewBoard } from '../types/board';
import { Status } from '../types/status';
import { sampleTasks } from './sampleTasks';
export const addNewBoard = async (newBoard: NewBoard): Promise<string> => {
  const user = {
    name: newBoard.createdBy,
    id: ulid(),
    status: Status.NotStarted,
  };
  const boardData: Board = {
    ...newBoard,
    id: ulid(),
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
