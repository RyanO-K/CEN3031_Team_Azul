import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Label, Input } from '@rebass/forms'
import { Flex, Box, Button, Heading, Text, Link } from 'rebass';
import firebase from './config2';
import UserProfile from './UserState';
import axiosPath from '../../axiosRequests';
import LoginWithGoogle from './LoginWithGoogle';
import { Route, Switch, Redirect  } from 'react-router-dom';
import User from './User';

class Login extends Component {
    constructor(){
    super();

    UserProfile.name='';
    UserProfile.email=null;
    UserProfile.isLoggedIn=false;
    this.state = {name:'', email:null, loggedIn:false, loggedInWithGoogle:false, nextPage:''};
    }
handleInputChange = (event) => {
   this.setState({ [event.target.name]: event.target.value });
 };


 async log2(){
        const a= (await axiosPath.makeGetRequest('personal/'+this.state.email));
console.log(a);
return a;
       };



handleSubmit = async (event) => {
   event.preventDefault();
   const { email, password } = this.state;
firebase
     .auth()
     .signInWithEmailAndPassword(email, password)
     .then(async(user) => {
       this.setState({name:this.state.name, email:this.state.email, loggedIn:this.state.loggedIn, loggedInWithGoogle:false, nextPage:this.state.nextPage});
       const obj=await this.log2();
 console.log(obj);
 UserProfile.setEmail(this.state.email);
        UserProfile.loggingInWithoutGoogle();
        UserProfile.setLocalStorageisLoggedInWithGoogle();
        UserProfile.setLocalStorageisLoggedIn();
        UserProfile.setLocalStorageEmail();
        console.log(UserProfile.getLocalStorageEmail());
        this.state.nextPage='/User';
        console.log(this.state.nextPage);
        console.log(UserProfile.getLocalStorageEmail());
        this.state.loggedInWithGoogle=false;


       if(obj!==undefined && obj.Email===this.state.email){
   
        this.bool=true;
        console.log(this.bool);
        
        
                //response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
                //console.log(GoogleLogin.BasicProfile);
            //if(this.state.email!=null &&this.state.email===this.state.email)
              //  alert("you are already logged in with email " +this.state.email+".  Please log out if you would like to login with another account.");
            //else{
            UserProfile.loggingInWithoutGoogle();
            //console.log(UserProfile.isLoggedIn());
            
            this.setState({name:this.state.name, email:this.state.email, loggedIn:true, loggedInWithGoogle:this.state.loggedInWithGoogle, nextPage:this.nextPage});
            UserProfile.setEmail(this.state.email); 
            UserProfile.loggedIn=true;
            this.setState({name:this.state.name, email:this.state.email, loggedIn:true, loggedInWithGoogle:this.state.loggedInWithGoogle, nextPage:this.nextPage});
            UserProfile.setLocalStorageName();
            UserProfile.setLocalStorageEmail();
            console.log(UserProfile.getLocalStorageEmail());
            UserProfile.setLocalStorageisLoggedInWithGoogle();
            UserProfile.setLocalStorageisLoggedIn();
            this.setState({name:this.state.name, email:this.state.email, loggedIn:true, loggedInWithGoogle:this.state.loggedInWithGoogle, nextPage:this.nextPage});
            //console.log(this.state.name);
            this.setState({name:this.state.name, email:this.state.email, loggedIn:true, loggedInWithGoogle:this.state.loggedInWithGoogle, nextPage:this.nextPage});
            //console.log(this.state.name);
           // console.log(this.state.email);
           UserProfile.loggedIn=true;
           this.state.loggedIn=true;
           this.nextPage='/User';
        
           console.log(this.state.nextPage);window.location.reload();  
           if(this.state.email==='Admin@admin.com')
           this.props.history.push('/Admin');
          else
           return <Redirect to={{pathname: '/User',state:{user: {name:this.state.name, email:this.state.email, dob:this.state.dob, pob:this.state.pob, tob:this.state.tob}, g:false}}}></Redirect>
         
         }
     })
     .catch((error) => {
       this.setState({ error: error });
       this.setState({name:this.state.name, email:this.state.email, loggedIn:false, loggedInWithGoogle:this.state.loggedInWithGoogle, nextPage:this.nextPage});
        UserProfile.loggedIn=false; 
        this.state.loggedIn=false;
        alert('Invalid Username or Password');
        UserProfile.loggingOut();
        UserProfile.setLocalStorageisLoggedIn();
        UserProfile.setLocalStorageisLoggedInWithoutGoogle();
        this.state.nextPage='/Login';
         console.log("Faile");
         return <Redirect to="/Login"/>

       
     });
 };
 render() {
    console.log(UserProfile.getLocalStorageEmail());
    if(UserProfile.getLocalStorageEmail()!=='' && UserProfile.getLocalStorageEmail()!==null && UserProfile.getLocalStorageEmail()!=='null')
    if(UserProfile.getLocalStorageEmail()==='Admin@admin.com')
    return <Redirect to='/Admin'/>
    else
    return <Redirect to='/User'/>
   const { email, password, error } = this.state;
   return (
     <div>
       <Flex>
         <Box>
           <Heading>Log In</Heading>
         </Box>
       </Flex>
       {error ? (
         <Flex>
           <Box>
             <Text>{error.message}</Text>
           </Box>
         </Flex>
       ) : null}
       <Flex>
         <Box>
           <form on onSubmit={this.handleSubmit}>
             <Input type="text" name="email" placeholder="Email" value={email} onChange={this.handleInputChange} />
             <Input
               type="password"
               name="password"
               placeholder="Password"
               value={password}
               onChange={this.handleInputChange}
             />
             <Button children="Log In" />
           </form>

         </Box>
       </Flex>
       Forgot Password?
       <Link href='/PasswordReset'>Reset Password</Link>


       or
       <LoginWithGoogle></LoginWithGoogle>
     </div>
   );
 }
}
export default withRouter(Login);
