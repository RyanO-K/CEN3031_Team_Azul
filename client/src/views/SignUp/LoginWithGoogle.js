import  {GoogleLogin, GoogleLogout}  from 'react-google-login';
import React, {useState, useEffect, Component, useImperativeHandle} from 'react';
import config from './config.json';
import UserProfile from './UserState.js';
import {Redirect} from 'react-router-dom';
import axiosPath from '../../axiosRequests';


//class for login with google on front end
class LoginWithGoogle extends Component {
   
  //constructor sets state variables
    constructor() {
         
        super();let bool=false;
        UserProfile.name='';
        UserProfile.email=null;
        UserProfile.isLoggedIn=false;
        this.state = {name:'', email:null, loggedIn:false, loggedInWithGoogle:false, nextPage:''};



    }


    //this method tries to find the authenticated user in the database.  If it does, they log in.  Else, they do not log in
 async log2(){
        
    return (await axiosPath.makeGetRequest('personal/'+ this.state.email).then(res=>{
        //set user session data such as email and also set the next page to go to (user)
        UserProfile.setEmail(this.state.email);
        UserProfile.loggingInWithGoogle();
        UserProfile.setLocalStorageisLoggedInWithGoogle();
        UserProfile.setLocalStorageisLoggedIn();
        UserProfile.setLocalStorageEmail();
        this.state.nextPage='/User';
        this.state.loggedInWithGoogle=true;
    }).catch(res2=>{
        //if unsuccessful login, alert the user, and ensure they remain logged out for now
        alert('Not a registered email');
        UserProfile.loggingOut();
        UserProfile.setLocalStorageisLoggedIn();
        UserProfile.setLocalStorageisLoggedInWithoutGoogle();
    }));


       };

       


//responds according to the response given by google
    googleResponse = async(response) => {
        //sets this state
        this.setState({name:this.state.name, email:response.profileObj.email, loggedIn:this.state.loggedIn, loggedInWithGoogle:false, nextPage:this.state.nextPage});

        //try to find user in db
        const obj=await this.log2();
//if user found
 if(obj!==undefined && obj.Email===response.profileObj.email && obj.Password===undefined){


    //log user in and set their email and name state from what is given by google.  Then route user to user page

    this.bool=true;



    UserProfile.loggingInWithGoogle();
    UserProfile.setName(response.profileObj.name);
    
    this.setState({name:response.profileObj.name, email:response.profileObj.email, loggedIn:true, loggedInWithGoogle:this.state.loggedInWithGoogle, nextPage:this.nextPage});
    UserProfile.setEmail(response.profileObj.email); 
    this.setState({name:response.profileObj.name, email:response.profileObj.email, loggedIn:true, loggedInWithGoogle:this.state.loggedInWithGoogle, nextPage:this.nextPage});
    UserProfile.setLocalStorageName();
    UserProfile.setLocalStorageEmail();
    UserProfile.setLocalStorageisLoggedInWithGoogle();
    UserProfile.setLocalStorageisLoggedIn();
    this.setState({name:response.profileObj.name, email:response.profileObj.email, loggedIn:true, loggedInWithGoogle:this.state.loggedInWithGoogle, nextPage:this.nextPage});
    this.setState({name:response.profileObj.name, email:response.profileObj.email, loggedIn:true, loggedInWithGoogle:this.state.loggedInWithGoogle, nextPage:this.nextPage});
   UserProfile.loggedIn=true;
   this.state.loggedIn=true;
   this.nextPage='/User';


   
 }

//if not in the db, user cannot log in
 else{
this.setState({name:response.profileObj.name, email:response.profileObj.email, loggedIn:false, loggedInWithGoogle:this.state.loggedInWithGoogle, nextPage:this.nextPage});
UserProfile.loggedIn=false; 
this.state.loggedIn=false;
}
          
  };


handle=async()=>{
    this.setState(null);
}

//render the state
    render() {
     
//if user isn't logged in with google, show the google login button
 if(!this.state.loggedInWithGoogle){
return(
    <div className="LoginWithGoogle">
                <div>
                   
                    <GoogleLogin
                        theme="dark"

                        clientId={config.GOOGLE_CLIENT_ID}
                        buttonText="Login"
                        onSuccess={this.googleResponse}
                    />
                    
                  

                </div>
                </div>
            );
           


    }

    //otherwise if logged in send the user to the user page

else {
this.handle();
    if(!this.bool){
        UserProfile.loggedIn=true;
        this.state.loggedIn=false;
        if(UserProfile.abc===undefined){UserProfile.abc='abc';
        }
    }
    else{
    UserProfile.loggedIn=true;
    }
    return( <Redirect to={{pathname:'/User', state:{user:this.state, g:true}
    }}/>
    );

  }
}
}

export default LoginWithGoogle;
