import { UserChatRoom } from '../types/user';

const playerRoomsStoreName = 'playerRooms';

export const getUserRoomsFromCache = (): UserChatRoom[] => {
  let playerRooms: UserChatRoom[] = [];

  const store = localStorage.getItem(playerRoomsStoreName);
  if (store) {
    playerRooms = JSON.parse(store);
  }
  return playerRooms;
};

export const isRoomInUserCache = (chatRoomId: string): boolean => {
  const playerRooms = getUserRoomsFromCache();
  const found = playerRooms.find((playerRooms) => playerRooms.roomId === chatRoomId);
  if (found) {
    return true;
  }
  return found ? true : false;
};

export const updateUserRoomsInCache = (playerRooms: UserChatRoom[]) => {
  localStorage.setItem(playerRoomsStoreName, JSON.stringify(playerRooms));
};
