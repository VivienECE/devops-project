/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
/*import Departments from './Departments'
import Department from './Department'
import Welcome from './Welcome'*/
import Context from './Context'
import React, { useContext } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Departments from './Departments'
import Department from './Department'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {
  Route,
  Switch,
} from 'react-router-dom'


const useStyles = (theme) => ({
  root: {
    backgroundColor: 'rgba(255,255,255,.1)',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  drawer: {
    width: '200px',
    display: 'none',
  },
  drawerVisible: {
    display: 'block',
  },
})

export default () => {
  const { drawerVisible } = useContext(Context)
  const theme = useTheme()
  const styles = useStyles(theme)
  const alwaysOpen = useMediaQuery(theme.breakpoints.up('sm'))
  const isDrawerVisible = alwaysOpen || drawerVisible

    return (
      <main css={styles.root}>
        <Drawer
          PaperProps={{ style: { position: 'relative' } }}
          BackdropProps={{ style: { position: 'relative' } }}
          ModalProps={{
            style: { position: 'relative' }
          }}
          variant="persistent"
          open={isDrawerVisible}
          css={[styles.drawer, isDrawerVisible && styles.drawerVisible]}
        > 
            <Departments />
        </Drawer>
            <Department />
      </main>
    );
}
