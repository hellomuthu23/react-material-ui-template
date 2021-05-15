import 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Room } from '../types/room';
import { User } from '../types/user';
const firebaseConfig = {
  apiKey: 'AIzaSyDynbX3QT9x8e8qMtTsD6vnVMD6wHXe4Ug',
  authDomain: 'planning-poker-b946f.firebaseapp.com',
  projectId: 'planning-poker-b946f',
  storageBucket: 'planning-poker-b946f.appspot.com',
  messagingSenderId: '905950444049',
  appId: '1:905950444049:web:e3e56171532bfe47b20fb0',
  measurementId: 'G-LEK1503CC0',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const chatRoomsCollectionName = 'chatRooms';
const playersCollectionName = 'players';
const db = firebase.firestore();

export const addRoomToStore = async (chatRoomId: string, data: any) => {
  await db.collection(chatRoomsCollectionName).doc(chatRoomId).set(data);
  return true;
};

export const getRoomFromStore = async (id: string): Promise<Room | undefined> => {
  const response = db.collection(chatRoomsCollectionName).doc(id);
  const result = await response.get();
  let chatRoom = undefined;
  if (result.exists) {
    chatRoom = result.data();
  }
  return chatRoom as Room;
};

export const getUsersFromStore = async (chatRoomId: string): Promise<User[]> => {
  const db = firebase.firestore();
  const response = db.collection(chatRoomsCollectionName).doc(chatRoomId).collection(playersCollectionName);
  const results = await response.get();
  let players: User[] = [];
  results.forEach((result) => players.push(result.data() as User));
  return players;
};

export const getUserFromStore = async (chatRoomId: string, playerId: string): Promise<User | undefined> => {
  const db = firebase.firestore();
  const response = db
    .collection(chatRoomsCollectionName)
    .doc(chatRoomId)
    .collection(playersCollectionName)
    .doc(playerId);
  const result = await response.get();
  let player = undefined;
  if (result.exists) {
    player = result.data();
  }
  return player as User;
};

export const streamData = (id: string) => {
  return db.collection(chatRoomsCollectionName).doc(id);
};
export const streamUsersFromStore = (id: string) => {
  return db.collection(chatRoomsCollectionName).doc(id).collection(playersCollectionName);
};

export const updateRoomDataInStore = async (chatRoomId: string, data: any): Promise<boolean> => {
  const db = firebase.firestore();
  await db.collection(chatRoomsCollectionName).doc(chatRoomId).update(data);
  return true;
};

export const addUserToRoomInStore = async (chatRoomId: string, player: User) => {
  await db
    .collection(chatRoomsCollectionName)
    .doc(chatRoomId)
    .collection(playersCollectionName)
    .doc(player.id)
    .set(player);
  return true;
};

export const updateUserInStore = async (chatRoomId: string, player: User) => {
  await db
    .collection(chatRoomsCollectionName)
    .doc(chatRoomId)
    .collection(playersCollectionName)
    .doc(player.id)
    .update(player);

  return true;
};
