import logo from './logo.svg';
import Footer from './Footer';
import Header from './Header'
import Main from './Main'
import { useTheme } from '@material-ui/core/styles';
import React, {useState} from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import './App.css';

const useStyles = (theme) => ({
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#565E71',
    padding: '50px',
  },
})

function App() {
  const theme = useTheme()
  const styles = useStyles(theme)
  const [drawerMobileVisible, setDrawerMobileVisible] = useState(false)
  const drawerToggleListener = () => {
    setDrawerMobileVisible(!drawerMobileVisible)
  }
  const alwaysOpen = useMediaQuery(theme.breakpoints.up('sm'))
  const isDrawerVisible = alwaysOpen || drawerMobileVisible
  return (
    <div className="App" css={styles.root}>
      <Header drawerToggleListener={drawerToggleListener}/>
        <Main drawerMobileVisible={drawerMobileVisible} isDrawerVisible={isDrawerVisible}/>
      <Footer />
    </div>
  );
}

export default App;
