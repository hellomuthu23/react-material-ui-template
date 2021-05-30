import { ulid } from 'ulid';
import {
  addBoardToStore,
  getBoardFromStore,
  getBoardsFromStore,
  updateBoardDataInStore,
} from '../repository/boardsStore';
import { NewBoard } from '../types/board';
import { Status } from '../types/status';

export const addNewBoard = async (newBoard: NewBoard): Promise<string> => {
  const user = {
    name: newBoard.createdBy,
    id: ulid(),
    status: Status.NotStarted,
  };
  const boardData = {
    ...newBoard,
    id: ulid(),
    average: 0,
    users: [],
    createdById: user.id,
    status: Status.Started,
  };
  await addBoardToStore(boardData.id, boardData);

  return boardData.id;
};

export const getBoards = () => {
  return getBoardsFromStore();
};
export const getBoard = (id: string) => {
  return getBoardFromStore(id);
};

export const updateRoom = async (chatRoomId: string, updatedRoom: any): Promise<boolean> => {
  await updateBoardDataInStore(chatRoomId, updatedRoom);
  return true;
};

export const resetRoom = async (chatRoomId: string) => {
  const chatRoom = await getBoardFromStore(chatRoomId);
  if (chatRoom) {
    const updatedRoom = {
      average: 0,
      chatRoomStatus: Status.Started,
    };
    updateRoom(chatRoomId, updatedRoom);
  }
};

export const finishBoard = async (boardId: string) => {
  const chatRoom = await getBoardFromStore(boardId);

  if (chatRoom) {
    const updatedRoom = {
      average: 0,
      chatRoomStatus: Status.Finished,
    };
    updateRoom(boardId, updatedRoom);
  }
};
