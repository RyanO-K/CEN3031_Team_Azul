import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.svg';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import background from '../../assets/moonbackground.jpg';
import Button from '@material-ui/core/Button'
import { green, purple } from '@material-ui/core/colors';
import './Home.css';
import LoginWithGoogle from '../SignUp/LoginWithGoogle';
import UserProfile from '../SignUp/UserState';
import Moon from '../../components/Moon/Moon'

const ColorButton = withStyles(theme => ({
    root: {
        borderRadius: 20,
        padding: '3px 10px',
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
sessionStorage.setItem('J', true);
//console.log(sessionStorage.getItem('hi'));
//UserProfile.abc=localStorage.getItem('hi');
if(sessionStorage.getItem('hi')===null)
sessionStorage.setItem('hi', 'Log In');
function Home() {
    //console.log(UserProfile.abc);
    const[home, setHome]=useState(sessionStorage.getItem('hi'));

    let arr=['Log In', 'User'];
    //console.log(UserProfile.loggedIn);

    useEffect(()=>{
    if(UserProfile.getLocalStorageEmail()!=='null' && UserProfile.getLocalStorageEmail()!==null &&UserProfile.getLocalStorageEmail()!==''){
    if(UserProfile.getLocalStorageEmail()==='Admin@admin.com'){
        setHome('Admin');
    sessionStorage.setItem('hi','Admin');
    }
    else{
        setHome('User');
    sessionStorage.setItem('hi','User');
    }
    
    }
    else if((UserProfile.getLocalStorageEmail()==='null' || UserProfile.getLocalStorageEmail()===null ||UserProfile.getLocalStorageEmail()==='')){
        setHome('Log In');
    sessionStorage.setItem('hi','Log In');
    UserProfile.loggedIn=false;
    }
    });
    
    sessionStorage.setItem('J', false);
    /*
    window.beforeunload = (e) => {console.log(home);
        sessionStorage.setItem('hi', home);
      };
  
    window.afterunload = (e) => {console.log(home);
        home=sessionStorage.getItem('hi');
      };
    
*/const classes = useStyles();
    return (

        <div className="App">
            <header className="App-header" style={{backgroundImage: `url(${background})` }}>
                <div className="Moon">
                    <Moon></Moon>
                </div>
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
                    <ColorButton className={classes.margin} component={Link} size="large" variant="outlined" to='/Login'> {home}</ColorButton>
                </div>
            </header>
        </div>
    );
}

export default Home;
