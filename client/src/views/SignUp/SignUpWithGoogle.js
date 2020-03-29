import  GoogleLogin  from 'react-google-login';
import React, {useState, useEffect, Component} from 'react';
import {Redirect} from 'react-router-dom';
import config from './config.json';
import UserProfile from './UserState.js';

class LoginWithGoogle extends Component {
   
    constructor() {
        super();
        this.state = {name:'', email:'',pob:'', dob:'', loggedIn:false};
    }

    googleResponse = (response) => {
        //if response.profileObj.email already exists in database, then don't allow them to sign up because theyve done it before
        //Other than that, requests only need to be worried about for google sign up in the signup2.js file
    if(UserProfile.getLocalStorageisLoggedIn())
        alert("you are already logged in with email " +UserProfile.getEmail()+".  Please log out if you would like to login with another account.");
    else{
    UserProfile.setName(response.profileObj.name);
    UserProfile.setEmail(response.profileObj.email);
    UserProfile.loggingInWithGoogle();
    UserProfile.setLocalStorageEmail();
    UserProfile.setLocalStorageisLoggedInWithGoogle();
    UserProfile.setLocalStorageName();
    this.setState({name:response.profileObj.name, email:response.profileObj.email, pob:'', dob:'', loggedIn:true})
    
    console.log(this.state.name);
    console.log(this.state.email);
    }
  };

    render() {
        if (this.state.loggedIn) {
            return( <Redirect to={{pathname:'/SignUp2', 
            }}/>
            );
          }
       let content=
                <div>
                   
                    <GoogleLogin
                    
                        theme="dark"
  
                        clientId={config.GOOGLE_CLIENT_ID}
                        buttonText="Sign Up"
                        disabled={!(UserProfile.getLocalStorageisLoggedIn)}
                        onSuccess={this.googleResponse}
                        onFailure={this.onFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                        
                </div>
            

        return (
            <div className="LoginWithGoogle">
                {content}
            </div>
        );
    }
}

export default LoginWithGoogle;
