import  GoogleLogin  from 'react-google-login';
import React, {useState, useEffect, Component} from 'react';
import {Redirect} from 'react-router-dom';
import config from './config.json';
import UserProfile from './UserState.js';
import axiosPath from '../../axiosRequests';

//this is the sign up with google class 
class LoginWithGoogle extends Component {
   //set state variables in constructor
    constructor() {
        super();
        this.state = {name:'', email:'',pob:'', dob:'', tob:'',loggedIn:false, loggedInWithGoogle:false};
    }


    //check if this email exists already in the database
    async log2(){
        
        return (await axiosPath.makeGetRequest('personal/'+ this.state.email));
    
           };


    //this method is called if a user logged in with google
    googleResponse =async (response) => {
        //set user states to those given by google sign up
        this.setState({name:this.state.name, email:response.profileObj.email, pob:this.state.pob, dob:this.state.dob, tob:this.state.tob, loggedIn:this.state.loggedIn, loggedInWithGoogle:true, nextPage:this.state.nextPage});

        let obj='';
        try{
            obj=await this.log2();
        }
        catch(e){
            obj="10";
        }
        //if already a user, alert the user of the error
 if(obj.Email===response.profileObj.email){
     alert("This email is already registered");
 }
 else{

      //if there is already a user session ongoing, inform the user they are already signed in with some account  
    if(UserProfile.getLocalStorageisLoggedIn())
        alert("you are already logged in with email " +UserProfile.getLocalStorageEmail()+".  Please log out if you would like to login with another account.");
   
    //otherwise, sign up the user by setting loggedIn to true so they can be sent to the sign up 2 page
    else{

    this.setState({name:response.profileObj.name, email:response.profileObj.email, pob:'', dob:'', tob:'', loggedIn:true})
    this.state.loggedIn=true;
    }
}
  };

    render() {
        //if logged in, send user to sign up 2 page
        if (this.state.loggedIn) {
            return( <Redirect to={{pathname:'/SignUp2', state:{name:this.state.name, email:this.state.email}
            }}/>
            );
          }
          //otherwise, just show the google sign up button
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
