import { Task } from '../types/board';
import { getBoard, updateBoard } from './boards';

export const addTask = (task: Task, boardId: string) => {
  const board = getBoard(boardId);
  if (board) {
    board.tasks = [...board.tasks, task];
    updateBoard(boardId, board);
    return true;
  }
  console.log('board not found');
  return false;
};

export const deleteTask = (taskId: string, boardId: string) => {
  const board = getBoard(boardId);
  if (board) {
    board.tasks = board.tasks.filter((task) => task.id !== taskId);
    updateBoard(boardId, board);
    return true;
  }
  console.log('board not found');
  return false;
};
