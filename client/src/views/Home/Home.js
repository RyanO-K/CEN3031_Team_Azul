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


//button styling
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

//These session storage calls are responsible for determining which page to display on the buttons (admin, user, or log in).  
//hi is for which button to be seen.  It is set depending upon what our local storage userstate.js file determines.  
//if a valid email equal to that of the admin, next page is admin page.  Else, if valid, next page is user page.  Else next page is 
//log in page.  
//This is actually implemented by sending users in all 3 cases to the log in page, where the log in page then determines based upon
//local storage get email whether to keep the user on the log in page or otherwise where to put the user.  

sessionStorage.setItem('J', true);
if(sessionStorage.getItem('hi')===null)
sessionStorage.setItem('hi', 'Log In');



//This file and function are for the home page as seen on the front end.  
function Home() {
    const[home, setHome]=useState(sessionStorage.getItem('hi'));

    let arr=['Log In', 'User'];

    //on rendering, determine the next page of the user and whether they are logged in or not
    useEffect(()=>{
    if(UserProfile.getLocalStorageEmail()!=='null' && UserProfile.getLocalStorageEmail()!==null &&UserProfile.getLocalStorageEmail()!==''){
    if(UserProfile.getLocalStorageEmail()==='heavenlymoonflow@gmail.com' || UserProfile.getLocalStorageEmail()==='admin'){
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
    const classes = useStyles();

    //this is responsible for rendering.  it has background image, moon from react-spring, a message, and finally, 2 buttons, one whose 
    //value of what it says is determined above via use of session storage and one which will always route users to sign up page.  
    return (

        <div className="App">
            <header className="App-header" style={{backgroundImage: `url(${background})` }}>
                <div className="Moon">
                    <Moon></Moon>
                </div>
                <h1 className="MoonFlow">
                    Moon Flow
                    </h1>
                <div className="description">Sign Up to Receive Personalized Horoscopes Over</div>
                <div className="description" style={{marginBottom: 24}}>Email Every Change of the Moonphase</div>
                <p>
                    Because you are the skies in ecstatic motion
                </p>
                {}
                <div>
                    <ColorButton className={classes.margin} component={Link} size="large" variant="outlined" to='/SignUp'> Sign Up </ColorButton>
                    <ColorButton className={classes.margin} component={Link} size="large" variant="outlined" to='/Login'> {home}</ColorButton>
                </div>
            </header>
        </div>
    );
}

export default Home;
