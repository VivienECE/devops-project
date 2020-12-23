import {useState} from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
// Layout
import { useTheme } from '@material-ui/core/styles';
import Logo from "./logo.svg";



const useStyles = (theme) => ({
  root: {
    height: '500',
    flex: '1 1 auto',
    display: 'flex',
    background: 'rgba(164,219,181,.3)',
    color:'#646e6e',
  },
})


export default () => {
  const styles = useStyles(useTheme())

  return (
    <div css={styles.root}>
    </div>
  );
}
