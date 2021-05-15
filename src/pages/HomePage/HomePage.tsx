import { Divider, Grid, Slide, Typography, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer';
import { CreateRoom } from '../../components/ChatRoom/CreateRoom/CreateRoom';
import { JoinRoom } from '../../components/ChatRoom/JoinRoom/JoinRoom';
import { RecentRooms } from '../../components/ChatRoom/RecentRooms/RecentRooms';
import LandingImage from './../../images/background.jpg';
import SessionControllerImage from './../../images/Session.jpg';
import './HomePage.css';

export const HomePage = () => {
  const isJoin = useRouteMatch('/join');
  const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down('xs'));

  return (
    <>
      <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
        <Grid container item sm={12} lg={9} justify='center' alignItems='center' spacing={3}>
          <Grid item sm={12} lg={6}>
            <Slide direction='down' in={true} timeout={1000}>
              <div className='HomePageContainer'>
                <Typography variant='h5'>Task Board</Typography>
                <img
                  alt='React Chat App'
                  style={{ transform: isSmallScreen ? 'scale(0.5)' : 'none' }}
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
            <div className='HomePageContainer'>{isJoin ? <JoinRoom /> : <CreateRoom />}</div>
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
                <RecentRooms />
              </div>
            </Slide>
          </Grid>

          <Grid item sm={12} lg={6}>
            <Slide in={true} direction='up' timeout={1500}>
              <div className='HomePageContainer'>
                <Typography variant='subtitle1'>
                  Here is your recent Planning/Refinement sessions, click on the session name to join the session again.
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
                <Typography variant='h5'> Intuitive UI Design</Typography>
                <Typography variant='subtitle1'>
                  Beautiful design for voting the story points, showing team members voting status with emojis(👍 -
                  Voting Done, 🤔 - Yet to Vote). Once the card values are revealed, the card color helps to understand
                  if the team's voting is sync or not. Session Moderator has full control on revealing story points and
                  restarting the session.
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
