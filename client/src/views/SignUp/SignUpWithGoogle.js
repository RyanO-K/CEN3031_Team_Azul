import  GoogleLogin  from 'react-google-login';
import React, {useState, useEffect, Component} from 'react';
import {Redirect} from 'react-router-dom';
import config from './config.json';

class LoginWithGoogle extends Component {
   
    constructor() {
        super();
        this.state = {name:'', email:'',pob:'', dob:'', loggedIn:false};
    }

    googleResponse = (response) => {
        //if response.profileObj.email already exists in database, then don't allow them to sign up because theyve done it before
        //Other than that, requests only need to be worried about for google sign up in the signup2.js file
    if(this.state.name!=='')
        alert("you are already logged in with email " +this.state.email+".  Please log out if you would like to login with another account.");
    else{
    this.setState({name:response.profileObj.name, email:response.profileObj.email, pob:'', dob:'', loggedIn:true})
    console.log(this.state.name);
    console.log(this.state.email);
    }
  };

    render() {
        if (this.state.loggedIn) {
            return( <Redirect to={{pathname:'/SignUp2', 
            state:{name:this.state.name, email:this.state.email} }}/>
            );
          }
        let content = !!this.state.loggedIn ?
            (
                <div>
                    <p>Authenticated</p>
                    <div>
                        {this.state.email}
                    </div>
                </div>
            ) :
            (
                <div>
                   
                    <GoogleLogin
                        theme="dark"
  
                        clientId={config.GOOGLE_CLIENT_ID}
                        buttonText="Sign Up"
                        
                        onSuccess={this.googleResponse}
                        onFailure={this.onFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                        
                </div>
            );

        return (
            <div className="LoginWithGoogle">
                {content}
            </div>
        );
    }
}

export default LoginWithGoogle;