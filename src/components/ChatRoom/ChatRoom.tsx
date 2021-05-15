import { CircularProgress, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { streamRoom, streamUsers } from '../../service/chatRooms';
import { getCurrentUserId } from '../../service/users';
import { Room } from '../../types/room';
import { User } from '../../types/user';
import { RoomArea } from './RoomArea/RoomArea';
import './ChatRoom.css';

export const ChatRoom = () => {
  let { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [chatRoom, setRoom] = useState<Room | undefined>(undefined);
  const [players, setUsers] = useState<User[] | undefined>(undefined);
  const [loading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchData(id: string) {
      setIsLoading(true);
      streamRoom(id).onSnapshot((snapshot) => {
        if (snapshot.exists) {
          const data = snapshot.data();
          if (data) {
            setRoom(data as Room);
            setIsLoading(false);
            return;
          }
        }
        setIsLoading(false);
      });
      streamUsers(id).onSnapshot((snapshot) => {
        const players: User[] = [];
        snapshot.forEach((snapshot) => {
          players.push(snapshot.data() as User);
        });
        setUsers(players);
      });

      const currentUserId = getCurrentUserId(id);
      if (!currentUserId) {
        history.push(`/join/${id}`);
      }
      setCurrentUserId(currentUserId);
    }
    fetchData(id);
  }, [id, history]);

  if (loading) {
    return (
      <div className='PokerLoading'>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      {chatRoom && players && currentUserId ? (
        <RoomArea chatRoom={chatRoom} players={players} currentUserId={currentUserId} />
      ) : (
        <Typography>chatRoom not found</Typography>
      )}
    </>
  );
};

export default Room;
