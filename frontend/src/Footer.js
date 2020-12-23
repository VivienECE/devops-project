/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';


const useStyles = (theme) => ({
  footer: {
    height: '30px',
    backgroundColor: '#5a94af',
    flexShrink: 0,
    
  },
})

export default () => { 
  const styles = useStyles(useTheme())
	return (
      <footer css={styles.footer}>
        <div align="center"> 
          <Typography style={{color:'#f1f0ea'}}>
          Nice to see you !
        </Typography>
        </div>
      </footer>
  	);
}
