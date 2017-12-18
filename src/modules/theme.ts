import { createMuiTheme } from 'material-ui/styles';

import purple from 'material-ui/colors/purple';


import { lightBlue } from 'material-ui/colors';

const theme = createMuiTheme({
    palette: {
        type: 'dark',

        primary: lightBlue,
        secondary: purple,
    },
});

export default theme;