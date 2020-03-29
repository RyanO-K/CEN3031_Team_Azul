import  {GoogleLogin, GoogleLogout}  from 'react-google-login';
import React, {useState, useEffect, Component} from 'react';
import config from './config.json';
import UserProfile from './UserState.js';
const writeJsonFile = require('write-json-file');
class LoginWithGoogle extends Component {
    //be able to also store the birthday and birthplace as states, but this relies on the axios

    
   
    constructor() {
        super();
        UserProfile.name=UserProfile.getLocalStorageName();
        UserProfile.email=UserProfile.getLocalStorageEmail();
        UserProfile.isLoggedIn=UserProfile.getLocalStorageisLoggedIn();
        this.state = {name:UserProfile.getLocalStorageName(), email:UserProfile.getLocalStorageEmail(), loggedIn:UserProfile.getLocalStorageisLoggedIn(), loggedInWithGoogle:UserProfile.getLocalStorageisLoggedInWithGoogle()};
    console.log(UserProfile.getLocalStorageisLoggedIn());
       console.log(GoogleLogin.BasicProfile);
       this.fun();
       //this.li();

        
    }
signOut2=()=>{
    console.log("HAHA");
    console.log(UserProfile.getLocalStorageisLoggedIn());
    UserProfile.loggingOut();
    this.setState({name:'', email:'', loggedIn:false, loggedInWithGoogle:false});
    UserProfile.setLocalStorageisLoggedIn();
    this.setState({name:'', email:'', loggedIn:false, loggedInWithGoogle:false});
    UserProfile.setLocalStorageisLoggedInWithGoogle();
    this.setState({name:'', email:'', loggedIn:false,loggedInWithGoogle:false});
    UserProfile.setName('');
    this.setState({name:'', email:'', loggedIn:false, loggedInWithGoogle:false});
    UserProfile.setEmail('');
    this.setState({name:'', email:'', loggedIn:false, loggedInWithGoogle:false});
    UserProfile.setLocalStorageName();
    this.setState({name:'', email:'', loggedIn:false, loggedInWithGoogle:false});
    UserProfile.setLocalStorageEmail();
    this.setState({name:'', email:'', loggedIn:false, loggedInWithGoogle:false});
    console.log(UserProfile.getLocalStorageisLoggedIn());
}

li=()=>{
    console.log("yep");
    UserProfile.setName(UserProfile.getLocalStorageName());
    UserProfile.setEmail(UserProfile.getLocalStorageEmail());
    UserProfile.loggingInWithGoogle();
    this.setState({name:UserProfile.getLocalStorageName(), email:UserProfile.getLocalStorageEmail(), loggedIn:UserProfile.getLocalStorageisLoggedIn()}); 
    
    console.log(this.state);
}

    googleResponse = (response) => {
        //response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
        //console.log(GoogleLogin.BasicProfile);
    //if(this.state.email!=null &&this.state.email===response.profileObj.email)
      //  alert("you are already logged in with email " +this.state.email+".  Please log out if you would like to login with another account.");
    //else{
    UserProfile.loggingInWithGoogle();
    //console.log(UserProfile.isLoggedIn());
    UserProfile.setName(response.profileObj.name);
    this.setState({name:response.profileObj.name, email:response.profileObj.email, loggedIn:true, loggedInWithGoogle:true});
    UserProfile.setEmail(response.profileObj.email); 
    this.setState({name:response.profileObj.name, email:response.profileObj.email, loggedIn:true, loggedInWithGoogle:true});
    UserProfile.setLocalStorageName();
    UserProfile.setLocalStorageEmail();
    UserProfile.setLocalStorageisLoggedInWithGoogle();
    UserProfile.setLocalStorageisLoggedIn();
    //console.log(response.profileObj.name);
    this.setState({name:response.profileObj.name, email:response.profileObj.email, loggedIn:true, loggedInWithGoogle:true});//changing loggedIn to true here removes the google login button (at least until reloaded page)
    //console.log(this.state.name);
   // console.log(this.state.email);
  
      
          
    //  }
  };
  getLocalStorageisLoggedIn2=()=>{
      console.log(UserProfile.getLocalStorageisLoggedIn());
      if(UserProfile.getLocalStorageisLoggedIn())
      return 'true';
      else
      return 'false';
  }
  f2=()=>{
      if(this.state.loggedIn)
        return true;
        return false;
  }

   fun=()=>{
    console.log(GoogleLogin.BasicProfile);
    console.log(UserProfile.getLocalStorageName());
  };
    render() {
        //send to user page here; choose user based upon value of this.state.email
return(
    <div className="LoginWithGoogle">
                <div>
                   
                    <GoogleLogin
                        theme="dark"

                        isSignedIn={this.li}
                        clientId={config.GOOGLE_CLIENT_ID}
                        buttonText="Login"
                        onSuccess={this.googleResponse}
                        onFailure={this.onFailure}
                        disabled={this.state.loggedIn}
                       
                       // cookiePolicy={document.cookie = 'same-site-cookie=http://localhost:3000; SameSite=Lax'}
                       cookiePolicy={"http://localhost:3000"}
                    />
                    
                   <GoogleLogout
                   clientId={config.GOOGLE_CLIENT_ID}
                   theme="dark"
                  onLogoutSuccess={this.signOut2}
                  disabled={!this.state.loggedInWithGoogle}
         />

                </div>
                </div>
            );
           


    }
}

export default LoginWithGoogle;
