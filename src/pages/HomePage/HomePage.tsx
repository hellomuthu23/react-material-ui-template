import { Divider, Grid, Slide, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer';
import { CreateBoard } from '../../components/Boards/CreateBoard/CreateBoard';
import { RecentBoards } from '../../components/Boards/RecentBoards/RecentBoards';
import LandingImage from './../../images/background.jpg';
import SessionControllerImage from './../../images/Session.jpg';
import './HomePage.css';
import { Routes } from '../../service/config';

export const HomePage = () => {
  const isJoin = useRouteMatch(Routes.join);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
        <Grid container item sm={12} lg={9} justify='center' alignItems='center' spacing={3}>
          <Grid item sm={12} lg={6}>
            <Slide direction='down' in={true} timeout={1000}>
              <div className='HomePageContainer'>
                <Typography variant='h5'>Task Board App</Typography>
                <img
                  alt='React Task board App'
                  style={{ height: '400px', width: '500px', transform: isSmallScreen ? 'scale(0.5)' : 'none' }}
                  src={LandingImage}
                ></img>
                <Typography variant='subtitle1'>
                  Free / Open source React MaterialUI Template - Task Board App. Template comes with most essential
                  things of Typescript, Lint, prettier, React Router, Material-UI and Cool Landing Page to bootstrap
                  your web app. Just clone the Repo and start building your app.
                </Typography>
              </div>
            </Slide>
          </Grid>
          <Grid item sm={12} lg={6}>
            <div className='HomePageContainer'>{isJoin ? <RecentBoards /> : <CreateBoard />}</div>
          </Grid>
        </Grid>
        <Grid container item sm={12} lg={9} justify='center' alignItems='center' spacing={3}>
          <Grid item sm={12} lg={6}>
            <Slide in={true} direction='up' timeout={1000}>
              <Divider variant='middle'></Divider>
            </Slide>
          </Grid>
        </Grid>

        <Grid container item sm={12} lg={9} justify='center' alignItems='center' spacing={3}>
          <Grid item sm={12} lg={6}>
            <Slide in={true} direction='up' timeout={1500}>
              <div className='HomePageContainer'>
                <RecentBoards />
              </div>
            </Slide>
          </Grid>

          <Grid item sm={12} lg={6}>
            <Slide in={true} direction='up' timeout={1500}>
              <div className='HomePageContainer'>
                <Typography variant='subtitle1'>
                  Here is your recent Task Boards, click on the Board name to view the tasks.
                </Typography>
              </div>
            </Slide>
          </Grid>
        </Grid>
        <Grid container item sm={12} lg={9} justify='center' alignItems='center' spacing={3}>
          <Grid item sm={12} lg={6}>
            <Slide in={true} direction='up' timeout={2000}>
              <Divider variant='middle'></Divider>
            </Slide>
          </Grid>
        </Grid>
        <Grid container item sm={12} lg={9} justify='center' alignItems='center' spacing={3}>
          <Grid item sm={12} lg={6}>
            <Slide in={true} direction='up' timeout={2000}>
              <div className='HomePageContainer'>
                <Typography variant='h5'>Intuitive UI Design</Typography>
                <Typography variant='subtitle1'>
                  Beautiful design for managing tasks, ability to add and delete tasks. Drag and Drop feature to move
                  the task across different stage in the Kanban board.
                </Typography>
              </div>
            </Slide>
          </Grid>

          <Grid item sm={12} lg={6}>
            <Slide in={true} direction='up' timeout={2000}>
              <div className='HomePageContainer'>
                <img
                  className='SessionImage'
                  alt='Session controller'
                  style={{ transform: isSmallScreen ? 'scale(0.6)' : 'none' }}
                  src={SessionControllerImage}
                ></img>
              </div>
            </Slide>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default HomePage;
