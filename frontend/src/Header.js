/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, {useState} from 'react'
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Context from './Context'
import {useContext} from 'react';
import Logo from "./logo.svg";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = (theme) => ({
  header: {
    height: '60px',
    borderStyle: 'inset',
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color:'#fafafa',
  },
})

export default ({
  drawerToggleListener
  }) => {
  const {drawerVisible, setDrawerVisible} = useContext(Context)
  const handleDrawerToggle = (e) => {
    setDrawerVisible(!drawerVisible)
  }
  const styles = useStyles(useTheme())
 
return (
  <header css={styles.header}>
    <div css={styles.root}>
      <AppBar position="static">
        <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          css={styles.menu}
        >
        <MenuIcon />
        </IconButton>
          <img src={Logo} width="40" height="40"></img>
          <Typography variant="h6" style={{color:'#f1f0ea'}}>
              Welcome to your company's chart !
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  </header>
    );
}
