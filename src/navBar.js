import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Button, Avatar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {signIn, signOut} from './Firestore';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      el: null,
    };
  }

  toHome = () => {
    window.history.pushState({}, 'home', '?')
    this.props.setAppState({
      session: null,
      player: null
    })
  }
  render() {
    const classes = {
      grow: {
        flexGrow: 1,
      },
      sectionDesktop: {
        display: 'none'
      },
    };
    return (
      <div className="grow">
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton> */}
            <Typography className={classes.title} variant="h6" noWrap>
              {this.props.name}
            </Typography>
            <div className="grow" />
            <div className="sectionDesktop">
              <PopupState variant="popover" popupId="menu-popup">
                {(popupState) => (
                  <React.Fragment>
                    <IconButton color="inherit" {...bindTrigger(popupState)}>
                      <AddIcon />
                    </IconButton>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem>New Board</MenuItem>
                      <MenuItem>New Team</MenuItem>
                      <MenuItem>New Task</MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            </div>
            <div>
              {
                this.props.user?

                  <PopupState variant="popover" popupId="profile-popup">
                    {(popupState) => (
                      <React.Fragment>
                        <IconButton color="inherit" {...bindTrigger(popupState)}>
                          <Avatar src={this.props.user.photoURL}/>
                        </IconButton>
                        <Menu {...bindMenu(popupState)}>
                          
                          <MenuItem onClick={() => signOut(this.props.setValue)}>Log out</MenuItem>
                        </Menu>
                      </React.Fragment>
                    )}
                </PopupState>
              :
                <Button color="inherit" onClick={() => signIn(this.props.setValue)}>Login</Button>
              }
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default NavBar;
