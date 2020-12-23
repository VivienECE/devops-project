import {useState} from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
// Layout
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Button} from '@material-ui/core'
import Input from '@material-ui/core/Input';
import Modal from '@material-ui/core/Modal';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import axios from 'axios';
import Context from './Context'
import {useContext} from 'react';



const useStyles = (theme) => ({
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    background: 'rgba(164,219,181,.3)',
    color:'#646e6e',
    '& Button':{
      color:'#646e6e'
    },
  },
  card: {
    textAlign: 'center',
  },
  icon: {
    width: '30%',
    fill: '#fff',
  }
})


export default () => {
  const styles = useStyles(useTheme())

  return (
    <div css={styles.root}>
      <h1 textAlign='center'>Welcome</h1>
    </div>
  );
}
