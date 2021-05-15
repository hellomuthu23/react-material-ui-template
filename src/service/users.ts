import { ulid } from 'ulid';
import {
  addUserToRoomInStore,
  getRoomFromStore,
  getUserFromStore,
  getUsersFromStore,
  updateUserInStore,
} from '../repository/firebase';
import { getUserRoomsFromCache, isRoomInUserCache, updateUserRoomsInCache } from '../repository/localStorage';
import { Room } from '../types/room';
import { User, UserChatRoom } from '../types/user';
import { Status } from '../types/status';
import { updateRoomStatus } from './chatRooms';

export const addUser = async (roomId: string, player: User) => {
  const room = await getRoomFromStore(roomId);
  if (room) {
    addUserToRoomInStore(roomId, player);
  }
};

export const updateUserValue = async (roomId: string, playerId: string, value: number) => {
  const player = await getUserFromStore(roomId, playerId);

  if (player) {
    const updatedUser = {
      ...player,
      value: value,
      status: Status.Finished,
    };
    await updateUserInStore(roomId, updatedUser);
    await updateRoomStatus(roomId);
    return true;
  }
  return false;
};

export const getUserRecentRooms = async (): Promise<Room[]> => {
  let playerRooms: UserChatRoom[] = getUserRoomsFromCache();
  let rooms: Room[] = [];

  await Promise.all(
    playerRooms.map(async (playerRoom: UserChatRoom) => {
      const room = await getRoomFromStore(playerRoom.roomId);
      room && rooms.push(room);
    })
  );

  rooms.sort((a: Room, b: Room) => +b.createdAt - +a.createdAt);
  return rooms;
};

export const getCurrentUserId = (roomId: string): string | undefined => {
  let playerRooms: UserChatRoom[] = getUserRoomsFromCache();

  const room = playerRooms.find((playerRoom) => playerRoom.roomId === roomId);

  return room && room.playerId;
};

export const updateUserRooms = (roomId: string, playerId: string) => {
  let playerRooms: UserChatRoom[] = getUserRoomsFromCache();

  playerRooms.push({ roomId, playerId });

  updateUserRoomsInCache(playerRooms);
};

export const isCurrentUserInRoom = (roomId: string): boolean => {
  return isRoomInUserCache(roomId);
};

export const addUserToRoom = async (roomId: string, playerName: string): Promise<boolean> => {
  const joiningRoom = await getRoomFromStore(roomId);

  if (!joiningRoom) {
    console.log('Room not found');
    return false;
  }
  const newUser = { name: playerName, id: ulid(), status: Status.NotStarted };

  updateUserRooms(roomId, newUser.id);
  await addUserToRoomInStore(roomId, newUser);

  return true;
};

export const resetUsers = async (roomId: string) => {
  const players = await getUsersFromStore(roomId);

  players.forEach(async (player) => {
    const updatedUser: User = {
      ...player,
      status: Status.NotStarted,
      value: 0,
    };
    await updateUserInStore(roomId, updatedUser);
  });
};
