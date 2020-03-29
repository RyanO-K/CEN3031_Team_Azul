import React, {useState, useEffect, Component} from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import { useForm } from 'react-hook-form'
import SignUpWithGoogle from "./SignUpWithGoogle";
import SignUp2 from "./SignUp2";
import UserProfile from './UserState';



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
function User(){
    console.log(UserProfile.getLocalStorageName());
    const [newUser, setNewUser] = useState({
        name: UserProfile.getLocalStorageName(),
        pob: UserProfile.getLocalStorageBPlace(),
        dob: UserProfile.getLocalStorageBDay(),
        email: UserProfile.getLocalStorageEmail()
    });
    
    const classes = useStyles();


    function handle(){
        UserProfile.setEmail('');
        UserProfile.setName('');
        UserProfile.loggingOut();
        UserProfile.setBirthday('');
        UserProfile.setBirthplace('');
        UserProfile.setLocalStorageBDay();
        UserProfile.setLocalStorageBPlace();
        UserProfile.setLocalStorageEmail();
        UserProfile.setLocalStorageName();
        UserProfile.setLocalStorageisLoggedIn();
        UserProfile.setLocalStorageisLoggedInWithGoogle();
        UserProfile.setLocalStorageisLoggedInWithoutGoogle();

        let a={
        name: '',
        pob: '',
        dob: '',
        email: ''
        };
        setNewUser(a);

    }
    return(
  <p>
        {newUser.name}<br></br>
        {newUser.email}<br></br>
        {newUser.dob}<br></br>
        {newUser.pob}<br></br>
        <br></br>
        <div>
                    <ColorButton onClick={handle} className={classes.margin} component={Link} size="large" variant="outlined" to={{pathname: '/Home'}}>Log Out</ColorButton>
                        </div>
   </p>
    );
}
export default User;
