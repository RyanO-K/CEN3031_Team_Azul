import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Label, Input } from '@rebass/forms'
import { Flex, Box, Heading, Text, Link } from 'rebass';
import firebase from './config2';
import UserProfile from './UserState';
import axiosPath from '../../axiosRequests';
import LoginWithGoogle from './LoginWithGoogle';
import { Route, Switch, Redirect  } from 'react-router-dom';
import User from './User';
import background from '../../assets/moonbackground.jpg';
import "./Login.css";
import Button from "@material-ui/core/Button";
import logo from '../../assets/logo.svg';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';

//button styling
const ColorButton = withStyles(theme => ({
  root: {
      borderRadius: 20,
      fontSize: 12,
      padding: '3px 10px',
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


//class for logging in (on front end)
class Login extends Component {
  //constructor initializes variables
    constructor(){
    super();

    UserProfile.name='';
    UserProfile.email=null;
    UserProfile.isLoggedIn=false;
    this.state = {name:'', email:null, loggedIn:false, loggedInWithGoogle:false, nextPage:''};
    }

    //if the username or password changes, this function changes their variable's values
handleInputChange = (event) => {
   this.setState({ [event.target.name]: event.target.value });
 };

//get request made to the database to find the user's information so it may be displayed on the user page
 async log2(){
        const a= (await axiosPath.makeGetRequest('personal/'+this.state.email));
return a;
       };


//method called to send user to sign up page on the click of the sign up page button
toSignUpPage=()=>{
  this.props.history.push('/SignUp');
}

//when the user clicks the login button, this method checks if they are a user, and if they are, logs them in.  Else it gives them an error message
handleSubmit = async (event) => {
   event.preventDefault();
   const { email, password } = this.state;
   //first, firebase tries log a user in
firebase
     .auth()
     .signInWithEmailAndPassword(email, password)
     .then(async(user) => {

      //then, if successful, we start a user session by setting our session's variables equal to the user's variables from our database (that match the email authenticated by firebase)
       this.setState({name:this.state.name, email:this.state.email, loggedIn:this.state.loggedIn, loggedInWithGoogle:false, nextPage:this.state.nextPage});
       const obj=await this.log2();

        UserProfile.setEmail(this.state.email);
        UserProfile.loggingInWithoutGoogle();
        UserProfile.setLocalStorageisLoggedInWithGoogle();
        UserProfile.setLocalStorageisLoggedIn();
        UserProfile.setLocalStorageEmail();

        //set user's next page to user page on successful login
        this.state.nextPage='/User';
        this.state.loggedInWithGoogle=false;

        //if we found the user in our database, set the email and name (required fields) of the user now and reload page
       if(obj!==undefined && obj.Email===this.state.email){
   
        this.bool=true;
        
        
               
            UserProfile.loggingInWithoutGoogle();
            
            
            this.setState({name:this.state.name, email:this.state.email, loggedIn:true, loggedInWithGoogle:this.state.loggedInWithGoogle, nextPage:this.nextPage});
            UserProfile.setEmail(this.state.email); 
            UserProfile.loggedIn=true;
            this.setState({name:this.state.name, email:this.state.email, loggedIn:true, loggedInWithGoogle:this.state.loggedInWithGoogle, nextPage:this.nextPage});
            UserProfile.setLocalStorageName();
            UserProfile.setLocalStorageEmail();
            UserProfile.setLocalStorageisLoggedInWithGoogle();
            UserProfile.setLocalStorageisLoggedIn();
            this.setState({name:this.state.name, email:this.state.email, loggedIn:true, loggedInWithGoogle:this.state.loggedInWithGoogle, nextPage:this.nextPage});
            this.setState({name:this.state.name, email:this.state.email, loggedIn:true, loggedInWithGoogle:this.state.loggedInWithGoogle, nextPage:this.nextPage});
           UserProfile.loggedIn=true;
           this.state.loggedIn=true;
           this.nextPage='/User';
        
           window.location.reload();  
           if(this.state.email==='Admin@admin.com')
           this.props.history.push('/Admin');
          else
           return <Redirect to={{pathname: '/User',state:{user: {name:this.state.name, email:this.state.email, dob:this.state.dob, pob:this.state.pob, tob:this.state.tob}, g:false}}}></Redirect>
         
         }
     })//if firebase was unsuccessful, log the user out and show them the error
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
         return <Redirect to="/Login"/>

       
     });
 };
 render() {
   //if user is set and is the admin, send to admin page.  Else, send to User page
    if(UserProfile.getLocalStorageEmail()!=='' && UserProfile.getLocalStorageEmail()!==null && UserProfile.getLocalStorageEmail()!=='null')
    if(UserProfile.getLocalStorageEmail()==='Admin@admin.com' || UserProfile.getLocalStorageEmail()==='admin')
    return <Redirect to='/Admin'/>
    else
    return <Redirect to='/User'/>
   const { email, password, error } = this.state;
   
   //styling and background image as well as text boxes for login here.  Lastly, reset password page link and sign in with google
   return (
     <div className="Login">
       <header className="Login-header" style={{backgroundImage: `url(${background})` }}>
                <h1 className="login-title">
                    Welcome to MoonFlow
                </h1>
                
       
      
       <div className="Login-card">
                    <p style={{marginBottom:5}}>Login</p>
                    
           <form on onSubmit={this.handleSubmit}>
             <input type="text" name="email" placeholder="Email" value={email} onChange={this.handleInputChange} />
             <div style={{marginBottom:7,marginTop:1}}>   <input
               type="password"
               name="password"
               placeholder="Password"
               value={password}
               onChange={this.handleInputChange}
             />
             </div>
             <div>
             <ColorButton children="Login" variant="outlined"size="large" className={useStyles.margin} onClick={this.handleSubmit}/>
           </div>
           </form>
           <div style={{fontSize:15, marginTop:5}}>       Forgot Password?
       <Link href='/PasswordReset'><br></br>Reset Password</Link>
</div>

<p style={{marginTop: 6, marginBottom: 8, fontSize:25}}>or</p>
       <LoginWithGoogle></LoginWithGoogle>
       </div>
       <div>
                    <br></br><br></br>
                    <p style={{marginBottom:5}}>
                        Don't have an account?
                    </p>
                    <ColorButton onClickCapture={this.toSignUpPage}className={useStyles.margin} size="large" variant="outlined" >Sign Up Here</ColorButton>
</div>
       </header>
     </div>
   );
 }
}
export default withRouter(Login);
