import  GoogleLogin  from 'react-google-login';
import React, {useState, useEffect, Component} from 'react';
import {Redirect} from 'react-router-dom';
import config from './config.json';
import UserProfile from './UserState.js';
import axiosPath from '../../axiosRequests';

class LoginWithGoogle extends Component {
   
    constructor() {
        super();
        this.state = {name:'', email:'',pob:'', dob:'', tob:'',loggedIn:false, loggedInWithGoogle:false};
    }


    async log2(){
        
        return (await axiosPath.makeGetRequest('personal/'+ this.state.email));
    
           };


    
    googleResponse =async (response) => {
        this.setState({name:this.state.name, email:response.profileObj.email, pob:this.state.pob, dob:this.state.dob, tob:this.state.tob, loggedIn:this.state.loggedIn, loggedInWithGoogle:true, nextPage:this.state.nextPage});
        //check if the login credentials were valid.  If they were, continue.  Else, throw an error message of sorts.  
        let obj='';
        try{
            obj=await this.log2();
        }
        catch(e){
            console.log(10);
            obj="10";
        }
        console.log('l');
 if(obj.Email===response.profileObj.email){
     alert("This email is already registered");
 }
 else{
     console.log(obj.Email);
        //if response.profileObj.email already exists in database, then don't allow them to sign up because theyve done it before
        //Other than that, requests only need to be worried about for google sign up in the signup2.js file
    if(UserProfile.getLocalStorageisLoggedIn())
        alert("you are already logged in with email " +UserProfile.getEmail()+".  Please log out if you would like to login with another account.");
    else{

    this.setState({name:response.profileObj.name, email:response.profileObj.email, pob:'', dob:'', tob:'', loggedIn:true})
    this.state.loggedIn=true;
    console.log(this.state.name);
    console.log(this.state.email);
    }
}
  };

    render() {
        if (this.state.loggedIn) {
            return( <Redirect to={{pathname:'/SignUp2', state:{name:this.state.name, email:this.state.email}
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
