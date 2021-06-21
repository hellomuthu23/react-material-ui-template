import {
  Card,
  CardContent,
  CardHeader,
  Grow,
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
import { getBoards } from '../../../service/boards';
import { Routes } from '../../../service/config';
import { Board } from '../../../types/board';
import './RecentBoards.css';

export const RecentBoards = () => {
  const history = useHistory();
  const [recentBoards, setRecentBoards] = useState<Board[] | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      const boards = getBoards();
      if (boards) {
        setRecentBoards(boards);
      }
    }
    fetchData();
  }, []);

  const isEmptyRecentBoards = (): boolean => {
    if (!recentBoards) {
      return true;
    }
    if (recentBoards && recentBoards.length === 0) {
      return true;
    }
    return false;
  };

  return (
    <Grow in={true} timeout={1000}>
      <Card variant='outlined' className='RecentBoardsCard'>
        <CardHeader
          className='RecentBoardsCardTitle'
          title='My Recent Task Boards'
          titleTypographyProps={{ variant: 'h6', noWrap: true }}
        />
        <CardContent className='RecentBoardsCardContent'>
          {isEmptyRecentBoards() && <Typography variant='body2'>No recent Task Board found</Typography>}
          {recentBoards && recentBoards.length > 0 && (
            <TableContainer className='RecentBoardsTableContainer'>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Created By</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentBoards.map((recentBoard) => (
                    <TableRow
                      hover
                      key={recentBoard.id}
                      className='RecentBoardsTableRow'
                      onClick={() => history.push(`${Routes.boards}/${recentBoard.id}`)}
                    >
                      <TableCell>{recentBoard.name}</TableCell>
                      <TableCell align='left'>{recentBoard.createdBy}</TableCell>
                      <TableCell align='left'></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Grow>
  );
};
