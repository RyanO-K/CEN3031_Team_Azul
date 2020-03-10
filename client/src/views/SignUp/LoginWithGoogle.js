import  GoogleLogin  from 'react-google-login';
import React, {useState, useEffect, Component} from 'react';
import config from './config.json';
class LoginWithGoogle extends Component {
   
    constructor() {
        super();
        this.state = {name:'', email:'', loggedIn:false};
    }

    googleResponse = (response) => {
    if(this.state.email!=null &&this.state.email===response.profileObj.email)
        alert("you are already logged in with email " +this.state.email+".  Please log out if you would like to login with another account.");
    else{
    this.setState({name:response.profileObj.name, email:response.profileObj.email, loggedIn:false})//changing loggedIn to true here removes the google login button (at least until reloaded page)
    console.log(this.state.name);
    console.log(this.state.email);
      
          
      }
  };

    render() {
        //send to user page here; choose user based upon value of this.state.email
        let content = !!this.state.loggedIn ?
            (
                <div>
                  </div>
            ) :
            (
                <div>
                   
                    <GoogleLogin
                        theme="dark"
  
                        clientId={config.GOOGLE_CLIENT_ID}
                        buttonText="Login"
                        
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