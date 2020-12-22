import {createMuiTheme} from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import orange from '@material-ui/core/colors/orange';
import cyan from '@material-ui/core/colors/cyan';
import teal from '@material-ui/core/colors/teal';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#5a94af',
      },
      secondary: {
        main: '#ffe0b2',
      },
      background: orange[50],
      textPrimary: '#fafafa',
    },
});

export default theme;
