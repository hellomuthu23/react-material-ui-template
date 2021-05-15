import { Card, CardContent, CardHeader, Divider, Grow, IconButton, Snackbar, Typography } from '@material-ui/core';
import { blue, green } from '@material-ui/core/colors';
import RefreshIcon from '@material-ui/icons/Autorenew';
import ExitToApp from '@material-ui/icons/ExitToApp';
import LinkIcon from '@material-ui/icons/Link';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Alert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { finishRoom, resetRoom } from '../../../service/chatRooms';
import { Room } from '../../../types/room';
import './RoomController.css';

interface RoomControllerProps {
  chatRoom: Room;
  currentUserId: string;
}

export const RoomController: React.FC<RoomControllerProps> = ({ chatRoom, currentUserId }) => {
  const history = useHistory();
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const copyInviteLink = () => {
    const dummy = document.createElement('input');
    const url = `${window.location.origin}/join/${chatRoom.id}`;
    document.body.appendChild(dummy);
    dummy.value = url;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    setShowCopiedMessage(true);
  };

  const leaveRoom = () => {
    history.push(`/`);
  };

  const isModerator = (moderatorId: string, currentUserId: string) => {
    return moderatorId === currentUserId;
  };
  return (
    <Grow in={true} timeout={2000}>
      <div className='RoomController'>
        <Card variant='outlined' className='RoomControllerCard'>
          <CardHeader
            title={chatRoom.name}
            titleTypographyProps={{ variant: 'h6' }}
            action={
              <div className='RoomControllerCardHeaderAverageContainer'>
                <Typography variant='subtitle1'>{chatRoom.roomStatus}</Typography>
                <Divider className='RoomControllerDivider' orientation='vertical' flexItem />
                <Typography variant='subtitle1'>Average:</Typography>
                <Typography variant='subtitle1' className='RoomControllerCardHeaderAverageValue'>
                  {chatRoom.average || 0}
                </Typography>
              </div>
            }
            className='RoomControllerCardTitle'
          ></CardHeader>
          <CardContent className='RoomControllerCardContentArea'>
            {isModerator(chatRoom.createdById, currentUserId) && (
              <>
                <div className='RoomControllerButtonContainer'>
                  <div className='RoomControllerButton'>
                    <IconButton onClick={() => finishRoom(chatRoom.id)} data-testid='reveal-button' color='primary'>
                      <VisibilityIcon fontSize='large' color='error' />
                    </IconButton>
                  </div>
                  <Typography variant='caption'>Reveal</Typography>
                </div>

                <div className='RoomControllerButtonContainer'>
                  <div className='RoomControllerButton'>
                    <IconButton data-testid={'restart-button'} onClick={() => resetRoom(chatRoom.id)}>
                      <RefreshIcon fontSize='large' color='primary' />
                    </IconButton>
                  </div>
                  <Typography variant='caption'>Restart</Typography>
                </div>
              </>
            )}
            <div className='RoomControllerButtonContainer'>
              <div className='RoomControllerButton'>
                <IconButton data-testid='exit-button' onClick={() => leaveRoom()}>
                  <ExitToApp fontSize='large' style={{ color: green[500] }} />
                </IconButton>
              </div>
              <Typography variant='caption'>Exit</Typography>
            </div>
            <div title='Copy invite link' className='RoomControllerButtonContainer'>
              <div className='RoomControllerButton'>
                <IconButton data-testid='invite-button' onClick={() => copyInviteLink()}>
                  <LinkIcon fontSize='large' style={{ color: blue[500] }} />
                </IconButton>
              </div>
              <Typography variant='caption'>Invite</Typography>
            </div>
          </CardContent>
        </Card>
        <Snackbar
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          open={showCopiedMessage}
          autoHideDuration={5000}
          onClose={() => setShowCopiedMessage(false)}
        >
          <Alert severity='success'>Invite Link copied to clipboard!</Alert>
        </Snackbar>
      </div>
    </Grow>
  );
};
