import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getUserRecentRooms } from '../../../service/users';
import { Room } from '../../../types/room';
import './RecentRooms.css';

export const RecentRooms = () => {
  const history = useHistory();
  const [recentRooms, setRecentRooms] = useState<Room[] | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      const chatRooms = await getUserRecentRooms();
      if (chatRooms) {
        setRecentRooms(chatRooms);
      }
    }
    fetchData();
  }, []);

  const isEmptyRecentRooms = (): boolean => {
    if (!recentRooms) {
      return true;
    }
    if (recentRooms && recentRooms.length === 0) {
      return true;
    }
    return false;
  };

  return (
    <Card variant='outlined' className='RecentRoomsCard'>
      <CardHeader
        className='RecentRoomsCardTitle'
        title='Recent Session'
        titleTypographyProps={{ variant: 'h6', noWrap: true }}
      />
      <CardContent className='RecentRoomsCardContent'>
        {isEmptyRecentRooms() && <Typography variant='body2'>No recent sessions found</Typography>}
        {recentRooms && recentRooms.length > 0 && (
          <TableContainer className='RecentRoomsTableContainer'>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Created By</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentRooms.map((recentRoom) => (
                  <TableRow
                    hover
                    key={recentRoom.id}
                    className='RecentRoomsTableRow'
                    onClick={() => history.push(`/chatRoom/${recentRoom.id}`)}
                  >
                    <TableCell>{recentRoom.name}</TableCell>
                    <TableCell align='left'>{recentRoom.createdBy}</TableCell>
                    <TableCell align='left'></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};
