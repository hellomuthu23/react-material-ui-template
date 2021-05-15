import { ulid } from 'ulid';
import {
  addRoomToStore,
  addUserToRoomInStore,
  getRoomFromStore,
  getUsersFromStore,
  streamData,
  streamUsersFromStore,
  updateRoomDataInStore,
} from '../repository/firebase';
import { NewRoom } from '../types/room';
import { User } from '../types/user';
import { Status } from '../types/status';
import { resetUsers, updateUserRooms } from './users';

export const addNewRoom = async (newRoom: NewRoom): Promise<string> => {
  const player = {
    name: newRoom.createdBy,
    id: ulid(),
    status: Status.NotStarted,
  };
  const chatRoomData = {
    ...newRoom,
    id: ulid(),
    average: 0,
    createdById: player.id,
    chatRoomStatus: Status.Started,
  };
  await addRoomToStore(chatRoomData.id, chatRoomData);
  await addUserToRoomInStore(chatRoomData.id, player);
  updateUserRooms(chatRoomData.id, player.id);

  return chatRoomData.id;
};

export const streamRoom = (id: string) => {
  return streamData(id);
};

export const streamUsers = (id: string) => {
  return streamUsersFromStore(id);
};

export const getRoom = (id: string) => {
  return getRoomFromStore(id);
};

export const updateRoom = async (chatRoomId: string, updatedRoom: any): Promise<boolean> => {
  await updateRoomDataInStore(chatRoomId, updatedRoom);
  return true;
};

export const resetRoom = async (chatRoomId: string) => {
  const chatRoom = await getRoomFromStore(chatRoomId);
  if (chatRoom) {
    const updatedRoom = {
      average: 0,
      chatRoomStatus: Status.Started,
    };
    updateRoom(chatRoomId, updatedRoom);
    await resetUsers(chatRoomId);
  }
};

export const finishRoom = async (chatRoomId: string) => {
  const chatRoom = await getRoomFromStore(chatRoomId);
  const players = await getUsersFromStore(chatRoomId);

  if (chatRoom && players) {
    const updatedRoom = {
      average: getAverage(players),
      chatRoomStatus: Status.Finished,
    };
    updateRoom(chatRoomId, updatedRoom);
  }
};

export const getAverage = (players: User[]): number => {
  let values = 0;
  let numberOfUsersPlayed = 0;
  players.forEach((player) => {
    if (player.status === Status.Finished && player.value && player.value >= 0) {
      values = values + player.value;
      numberOfUsersPlayed++;
    }
  });
  return Math.round(values / numberOfUsersPlayed);
};

export const getRoomStatus = (players: User[]): Status => {
  let numberOfUsersPlayed = 0;
  players.forEach((player: User) => {
    if (player.status === Status.Finished) {
      numberOfUsersPlayed++;
    }
  });
  if (numberOfUsersPlayed === 0) {
    return Status.Started;
  }
  return Status.InProgress;
};

export const updateRoomStatus = async (chatRoomId: string): Promise<boolean> => {
  const chatRoom = await getRoom(chatRoomId);
  if (!chatRoom) {
    console.log('chatRoom not found');
    return false;
  }
  const players = await getUsersFromStore(chatRoomId);
  if (players) {
    const status = getRoomStatus(players);
    const dataToUpdate = {
      chatRoomStatus: status,
    };
    const result = await updateRoomDataInStore(chatRoomId, dataToUpdate);
    return result;
  }
  return false;
};
