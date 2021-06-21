import { Button, Slide, useMediaQuery, useTheme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import AppToolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import GithubIcon from '@material-ui/icons/GitHub';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MergeTypeOutlinedIcon from '@material-ui/icons/MergeTypeOutlined';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './Toolbar.css';
import { Routes } from '../../service/config';
export const title = 'Task Board';

export const Toolbar = () => {
  const history = useHistory();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Slide direction='down' in={true} timeout={800}>
      <AppBar position='sticky' className='AppBar' color='inherit'>
        <AppToolbar>
          <div className='HeaderContainer'>
            <div className='HeaderLeftContainer' onClick={() => history.push(Routes.home)}>
              <AssignmentTurnedInIcon color='primary' className='HeaderIcon' />
              <Typography variant={isSmallScreen ? 'subtitle1' : 'h5'} color='inherit' noWrap>
                {title}
              </Typography>
            </div>
            <div>
              <Button
                title='New Board'
                startIcon={<AddCircleOutlineIcon />}
                color='primary'
                onClick={() => history.push(Routes.home)}
              >
                {!isSmallScreen ? 'New Board' : null}
              </Button>
              <Button
                startIcon={<MergeTypeOutlinedIcon />}
                size={isSmallScreen ? 'small' : 'large'}
                color='primary'
                onClick={() => history.push(Routes.join)}
              >
                {!isSmallScreen ? 'Open Board' : null}
              </Button>
              <Button
                id='github-button'
                color='primary'
                onClick={() => (window.location.href = 'https://github.com/hellomuthu23/react-material-ui-template')}
              >
                <GithubIcon></GithubIcon>
              </Button>
            </div>
          </div>
        </AppToolbar>
      </AppBar>
    </Slide>
  );
};
