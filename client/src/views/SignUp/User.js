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
function User(props){




  const classes = useStyles();
  const [newUser, setNewUser] = useState({
    name: '',
    pob: '',
    dob: '',
    email: '',
    tob: '',
    b:false
});
  let p1='';
  let p2='';
  let p3='';
  let p4='';
  let p5='';
  let p6='';
  let p7='';
  let p8='';
  console.log(props);
  if(props===undefined || props.location.state===undefined || props.location.state.pob===undefined){
    p1=UserProfile.getLocalStorageEmail();
    p2=UserProfile.getLocalStorageName();
    p3=UserProfile.getLocalStorageBDay();
    p4=UserProfile.getLocalStorageBTime();
    p5=UserProfile.getLocalStorageBPlace();
    p6=UserProfile.getLocalStorageisLoggedIn();
    p7=UserProfile.getLocalStorageisLoggedInWithGoogle();
    p8=UserProfile.getLocalStorageisLoggedInWithoutGoogle();
    UserProfile.loggedIn=true;

  }
  else{
    p1=props.location.state.user.email;
    p2=props.location.state.user.name;
    p3=props.location.state.user.dob;
    p4=props.location.state.user.tob;
    p5=props.location.state.user.pob;
    p6=true;
    UserProfile.loggedIn=true;

    p7=props.location.state.g;
    p8=!p7;
  }



  

  newUser.name=p2;
  newUser.email=p1;
  newUser.dob=p3;
  newUser.tob=p4;
  newUser.pob=p5;
  console.log(p5);
  const [st, newStat]=useState(0);


  useEffect(()=>{
    if(newUser.b){

      UserProfile.setEmail('');
      UserProfile.setName('');
      UserProfile.loggingOut();
      UserProfile.setBirthday('');
      UserProfile.setBirthplace('');
      UserProfile.setBirthTime('');
      UserProfile.setLocalStorageBTime();
      UserProfile.setLocalStorageBDay();
      UserProfile.setLocalStorageBPlace();
      UserProfile.setLocalStorageEmail();
      UserProfile.setLocalStorageName();
      UserProfile.setLocalStorageisLoggedIn();
      UserProfile.setLocalStorageisLoggedInWithGoogle();
      UserProfile.setLocalStorageisLoggedInWithoutGoogle();

      



    }

  });


  if(p1===null)
    return(<Redirect to="/Home"/>);
    console.log(UserProfile.getLocalStorageName());

    if(p7===false)
      UserProfile.loggingInWithoutGoogle();
    else
      UserProfile.loggingInWithGoogle();
UserProfile.loggedIn=true;
    UserProfile.setEmail(p1);
    UserProfile.setName(p2);
    UserProfile.setBirthplace(p5);
    UserProfile.setBirthTime(p4);
    UserProfile.setBirthday(p3);
    UserProfile.setLocalStorageBDay();
    UserProfile.setLocalStorageBPlace();
    UserProfile.setLocalStorageEmail();
    UserProfile.setLocalStorageisLoggedIn();
    UserProfile.setLocalStorageisLoggedInWithoutGoogle();
    UserProfile.setLocalStorageBTime();
    UserProfile.setLocalStorageName();

      
    //if(newUser.name!==null && newUser.name.length===0)
      //  window.location.reload();
      console.log(st);


  function handle2(){
    UserProfile.loggedIn=false;
      const auth2 = window.gapi.auth2.getAuthInstance();
      if (auth2 !== null) {
      
      
        auth2.signOut().then(
          auth2.disconnect().then(GoogleLogout.onLogoutSuccess)
        )
      }
      console.log(auth2);
        
      UserProfile.loggedIn=false;

  
      UserProfile.setEmail('');
      UserProfile.setName('');
      UserProfile.loggingOut();
      UserProfile.setBirthday('');
      UserProfile.setBirthplace('');
      UserProfile.setBirthTime('');
      let a={
          name: '',
          pob: '',
          dob: '',
          email: '',
          tob:'',
          b:true
          };
          setNewUser(a);
          newStat(3);
          setTimeout(3000);
          UserProfile.loggedIn=false;
      UserProfile.setLocalStorageBTime();
      UserProfile.setLocalStorageBDay();
      UserProfile.setLocalStorageBPlace();
      UserProfile.setLocalStorageEmail();
      UserProfile.setLocalStorageName();
      UserProfile.setLocalStorageisLoggedIn();
      UserProfile.setLocalStorageisLoggedInWithGoogle();
      UserProfile.setLocalStorageisLoggedInWithoutGoogle();
      newStat(2);

      let r={
          name: '',
          pob: '',
          dob: '',
          email: '',
          tob:'',
          b:true
          };
          setNewUser(r);
          UserProfile.loggedIn=false;
        
    }

  function handle(){
        console.log("Hi");
        UserProfile.setEmail('');
        UserProfile.setName('');
        UserProfile.loggingOut();
        UserProfile.setBirthday('');
        UserProfile.setBirthplace('');
        UserProfile.setBirthTime('');
        let a={
            name: '',
            pob: '',
            dob: '',
            email: '',
            tob:'',
            b:true
            };
            setNewUser(a);
            newStat(3);
            setTimeout(3000);
            UserProfile.loggedIn=false;
        UserProfile.setLocalStorageBTime();
        UserProfile.setLocalStorageBDay();
        UserProfile.setLocalStorageBPlace();
        UserProfile.setLocalStorageEmail();
        UserProfile.setLocalStorageName();
        UserProfile.setLocalStorageisLoggedIn();
        UserProfile.setLocalStorageisLoggedInWithGoogle();
        UserProfile.setLocalStorageisLoggedInWithoutGoogle();
        newStat(2);

        let r={
            name: '',
            pob: '',
            dob: '',
            email: '',
            tob:'',
            b:true
            };
            setNewUser(r);
            console.log(UserProfile.getLocalStorageisLoggedIn())

    }
    console.log(newUser.b);console.log(GoogleLogin.BasicProfile);
    if(newUser.b && GoogleLogin.BasicProfile===undefined){
      UserProfile.loggedIn=false;
      UserProfile.abc='hi';
    return( <Redirect to={{pathname:'/Home', 
}}/>
);
    }

    if(p7){//google login
        console.log("Google");
    return(
  <p>
        {newUser.name}<br></br>
        {newUser.email}<br></br>
        {newUser.dob}<br></br>
        {newUser.pob}<br></br>
        {newUser.tob}<br></br>
        <br></br>
        <div>


        <GoogleLogout 
        onLogoutSuccess={handle2}
                   clientId={config.GOOGLE_CLIENT_ID}
                   theme="dark"
                 
         />                        </div>
   </p>
    );
   
                   } 
                   else if(!p7) {//regular login
                  if(newUser.name===""&& newUser.email===""){
      UserProfile.setEmail('');
      UserProfile.setName('');
      UserProfile.loggingOut();
      UserProfile.setBirthday('');
      UserProfile.setBirthplace('');
      UserProfile.setBirthTime('');
      if(props!==undefined)
      if(props.location.state!==undefined)
      if(props.location.state.user.email!==undefined)
      if(props.location.state.user.email.length>0)
      UserProfile.loggedIn=true;
      else
      UserProfile.loggedIn=false;
      else
      UserProfile.loggedIn=false;
      UserProfile.setLocalStorageBTime();
      UserProfile.setLocalStorageBDay();
      UserProfile.setLocalStorageBPlace();
      UserProfile.setLocalStorageEmail();
      UserProfile.setLocalStorageName();
      UserProfile.setLocalStorageisLoggedIn();
      UserProfile.setLocalStorageisLoggedInWithGoogle();
      UserProfile.setLocalStorageisLoggedInWithoutGoogle();
      return(<Redirect to="/Home"/>);
      }
                       return(
                        <p>
                        {newUser.name}<br></br>
                        {newUser.email}<br></br>
                        {newUser.dob}<br></br>
                        {newUser.pob}<br></br>
                        {newUser.tob}<br></br>
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
