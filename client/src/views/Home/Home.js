import React from 'react';
import logo from '../../assets/logo.svg';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import background from '../../assets/moonbackground.jpg';
import Button from '@material-ui/core/Button'
import { green, purple } from '@material-ui/core/colors';
import './Home.css';

const ColorButton = withStyles(theme => ({
    root: {
        padding: '6px 12px',
        border: '1px solid',
        backgroundColor: '#E28222',
      '&:hover': {
        backgroundColor: '#C6721D',
      },
    },
}))(Button);

const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
}));

function Home() {

    const classes = useStyles();

    return (

        <div className="App">
            <header className="App-header" style={{backgroundImage: `url(${background})` }}>
                <h1 className="MoonFlow">
                    Moon Flow
                    </h1>
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                <p>
                    Because you are the skies in ecstatic motion
                </p>
                {/* <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                </a> */}
                <div>
                    <ColorButton className={classes.margin} component={Link} size="large" variant="outlined" to='/SignUp'> Sign Up </ColorButton>
                    <ColorButton className={classes.margin} component={Link} size="large" variant="outlined" to='/LogIn'> Log In</ColorButton>
                </div>
            </header>
        </div>
    );
}

export default Home;
