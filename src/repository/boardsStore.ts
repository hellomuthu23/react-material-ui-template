import { Board } from '../types/board';

const boardsStoreName = 'boards';

export const addBoardToStore = (boardId: string, data: any) => {
  let boards: Board[] = [];

  const store = getFromStore(boardsStoreName);
  if (store) {
    boards = store;
  }
  boards.push(data);
  updateStore(boardsStoreName, boards);

  return true;
};

export const getBoardFromStore = (id: string): Board | undefined => {
  let boards: Board[] = [];

  const store = getFromStore(boardsStoreName);
  if (store) {
    boards = store;
    return boards.find((board) => board.id === id);
  }
  return undefined;
};

export const getBoardsFromStore = (): Board[] => {
  let boards: Board[] = [];

  const store = getFromStore(boardsStoreName);
  if (store) {
    boards = store;
  }
  return boards;
};

export const updateBoardDataInStore = (boardId: string, data: any): boolean => {
  const boards = getBoardsFromStore();
  const filteredBoards = boards.filter((board) => board.id !== boardId);
  const newBoards = [...filteredBoards, data];
  updateStore(boardsStoreName, newBoards);
  return true;
};

const getFromStore = (storeName: string) => {
  const store = localStorage.getItem(storeName);
  if (store) {
    return JSON.parse(store);
  }
  return store;
};

const updateStore = (storeName: string, data: any) => {
  localStorage.setItem(storeName, JSON.stringify(data));
};
