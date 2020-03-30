import  {GoogleLogin, GoogleLogout}  from 'react-google-login';
import React, {useState, useEffect, Component} from 'react';
import config from './config.json';
import UserProfile from './UserState.js';
import {Redirect} from 'react-router-dom';
import axiosPath from '../../axiosRequests';


class LoginWithGoogle extends Component {
    //be able to also store the birthday and birthplace as states, but this relies on the axios
       
    
   
    constructor() {
        
        super();
        UserProfile.name='';
        UserProfile.email='';
        UserProfile.isLoggedIn=false;
        this.state = {name:'', email:'', loggedIn:false, loggedInWithGoogle:false, nextPage:'/Home'};
   // console.log(UserProfile.getLocalStorageisLoggedIn());
     //  console.log(GoogleLogin.BasicProfile);
       //this.fun();
       //this.li();


    }
    /*
signOut2=()=>{
    console.log("HAHA");
    console.log(UserProfile.getLocalStorageisLoggedIn());
    UserProfile.loggingOut();
    this.setState({name:'', email:'', loggedIn:false, loggedInWithGoogle:false});
    UserProfile.setLocalStorageisLoggedIn();
    this.setState({name:'', email:'', loggedIn:false, loggedInWithGoogle:false});
    UserProfile.setLocalStorageisLoggedInWithGoogle();
    this.setState({name:'', email:'', loggedIn:false,loggedInWithGoogle:false});
    UserProfile.setLocalStorageisLoggedInWithoutGoogle();
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


*/
 async log2(){
        
    return (await axiosPath.makeGetRequest('personal/'+ this.state.email));

       };

       
/*
li=()=>{
    console.log("yep");
    UserProfile.setName(UserProfile.getLocalStorageName());
    UserProfile.setEmail(UserProfile.getLocalStorageEmail());
    UserProfile.loggingInWithGoogle();
    this.setState({name:UserProfile.getLocalStorageName(), email:UserProfile.getLocalStorageEmail(), loggedIn:UserProfile.getLocalStorageisLoggedIn()}); 
    
    console.log(this.state);
}
*/





    googleResponse = async(response) => {
        this.setState({name:this.state.name, email:response.profileObj.email, loggedIn:this.state.loggedIn, loggedInWithGoogle:true, nextPage:this.state.nextPage});
        //check if the login credentials were valid.  If they were, continue.  Else, throw an error message of sorts.  
        const obj=this.log2();
 if(obj.Email===response.profileObj.email && obj.Password.length===0){




        //response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
        //console.log(GoogleLogin.BasicProfile);
    //if(this.state.email!=null &&this.state.email===response.profileObj.email)
      //  alert("you are already logged in with email " +this.state.email+".  Please log out if you would like to login with another account.");
    //else{
    UserProfile.loggingInWithGoogle();
    //console.log(UserProfile.isLoggedIn());
    UserProfile.setName(response.profileObj.name);
    
    this.setState({name:response.profileObj.name, email:response.profileObj.email, loggedIn:true, loggedInWithGoogle:true, nextPage:'/User'});
    UserProfile.setEmail(response.profileObj.email); 
    this.setState({name:response.profileObj.name, email:response.profileObj.email, loggedIn:true, loggedInWithGoogle:true, nextPage:'/User'});
    UserProfile.setLocalStorageName();
    UserProfile.setLocalStorageEmail();
    UserProfile.setLocalStorageisLoggedInWithGoogle();
    UserProfile.setLocalStorageisLoggedIn();
    this.setState({name:response.profileObj.name, email:response.profileObj.email, loggedIn:true, loggedInWithGoogle:true, nextPage:'/User'});
    //console.log(response.profileObj.name);
    this.setState({name:response.profileObj.name, email:response.profileObj.email, loggedIn:true, loggedInWithGoogle:true, nextPage:'/User'});
    //console.log(this.state.name);
   // console.log(this.state.email);
   UserProfile.loggedIn=true;
   console.log(UserProfile.getLocalStorageName());
 }


 else{
this.setState({name:response.profileObj.name, email:response.profileObj.email, loggedIn:false, loggedInWithGoogle:true, nextPage:'/Home'});
UserProfile.loggedIn=false; 
}
          
    //  }
  };


  /*
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
  */

   /*fun=()=>{
    console.log(GoogleLogin.BasicProfile);
    console.log(UserProfile.getLocalStorageName());
  };*/
    render() {
       //send to user page here; choose user based upon value of this.state.email
     
        
 if(!this.state.loggedInWithGoogle){
return(
    <div className="LoginWithGoogle">
                <div>
                   
                    <GoogleLogin
                        theme="dark"

                       // isSignedIn={this.li}
                        clientId={config.GOOGLE_CLIENT_ID}
                        buttonText="Login"
                        onSuccess={this.googleResponse}
                       // onFailure={this.onFailure}
                      //  disabled={this.state.loggedIn}
                       
                       // cookiePolicy={document.cookie = 'same-site-cookie=http://localhost:3000; SameSite=Lax'}
                     //  cookiePolicy={"http://localhost:3000"}
                    />
                    
                  

                </div>
                </div>
            );
           


    }

else {//rather than loggedIn, in the future, change this to if credentials are valid
    if(!this.state.loggedIn){
        UserProfile.loggedIn=false;
    alert("Not a registered email");
    return( <Redirect to={{pathname:this.state.nextPage
    }}/>
    );

  }
}
}
}

export default LoginWithGoogle;
