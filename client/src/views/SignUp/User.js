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
import  {GoogleLogin, GoogleLogout}  from 'react-google-login';
import config from './config.json';



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
        email: UserProfile.getLocalStorageEmail(),
        b:false
    });
    //if(newUser.name!==null && newUser.name.length===0)
      //  window.location.reload();
    
    const classes = useStyles();


    function handle(){
        console.log("Hi");
        UserProfile.setEmail('');
        UserProfile.setName('');
        UserProfile.loggingOut();
        UserProfile.setBirthday('');
        UserProfile.setBirthplace('');
        let a={
            name: '',
            pob: '',
            dob: '',
            email: '',
            b:true
            };
            setNewUser(a);
        UserProfile.setLocalStorageBDay();
        UserProfile.setLocalStorageBPlace();
        UserProfile.setLocalStorageEmail();
        UserProfile.setLocalStorageName();
        UserProfile.setLocalStorageisLoggedIn();
        UserProfile.setLocalStorageisLoggedInWithGoogle();
        UserProfile.setLocalStorageisLoggedInWithoutGoogle();

        let q={
        name: '',
        pob: '',
        dob: '',
        email: '',
        b:true
        };
        setNewUser(q);

    }
    console.log(newUser.name);
    if(newUser.b && UserProfile.getLocalStorageName()!==''){
        console.log(newUser.b);
    return( <Redirect to={{pathname:'/Home', 
}}/>
);
    }
    else if(UserProfile.getLocalStorageisLoggedInWithGoogle()){//google login
        console.log("Google");
    return(
  <p>
        {newUser.name}<br></br>
        {newUser.email}<br></br>
        {newUser.dob}<br></br>
        {newUser.pob}<br></br>
        <br></br>
        <div>


        <GoogleLogout 
        onLogoutSuccess={handle}
                   clientId={config.GOOGLE_CLIENT_ID}
                   theme="dark"
                 
         />                        </div>
   </p>
    );
   
                   } 
                   else if(UserProfile.getLocalStorageisLoggedInWithoutGoogle()) {//regular login
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
                        ); }
                        else{
                            return <p>{newUser.name}</p>;
                        }
}
export default User;
