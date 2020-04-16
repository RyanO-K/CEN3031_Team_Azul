import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Flex, Box, Heading, Text } from 'rebass';
import { Label, Input } from '@rebass/forms'
import firebase from './config2';
import UserProfile from './UserState';
import axiosPath from '../../axiosRequests';
import SignUpWithGoogle from './SignUpWithGoogle';
import logo from '../../assets/logo.svg';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import './SignUp.css';
import Button from "@material-ui/core/Button"
import background from '../../assets/moonbackground.jpg';
import { useForm } from 'react-hook-form';

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

class SignUp extends Component {
    constructor() {
        super();
        this.state = {name:'',email:'',pob:'', dob:'', tob:'',loggedIn:false, loggedInWithGoogle:false};
    }


    async log2(){
        let a= '';
        try{
            a=await axiosPath.makeGetRequest('personal/'+this.state.email)}
            catch{
                a=undefined;
            };
            const b=a;
console.log(b);
return b;
       };


       LoginPage=()=>{
         console.log("click clack");
        this.props.history.push('/Login');
      }

      
handleInputChange = (event) => {
   this.setState({ [event.target.name]: event.target.value });
 };
handleSubmit = async (event) => {
   event.preventDefault();
   if(!(UserProfile.getLocalStorageEmail()==='' ||UserProfile.getLocalStorageEmail()==='null' || UserProfile.getLocalStorageEmail()===null || UserProfile.getLocalStorageEmail()===undefined || UserProfile.getLocalStorageEmail()==='undefined'))
              alert("You are already logged in with email "+UserProfile.getLocalStorageEmail()+".  Please log out before creating a new account");
   else{
              if(this.state.email.length===0)
   alert("Please provide an email");
   else{
   const obj=await this.log2();
   if(obj!==undefined){
   alert("Already a user with this email");
   return (<Redirect to={{pathname: '/Login'}}></Redirect>);
   }
   else{
   const { email, password } = this.state;
   if(password===undefined || password.length<6)
   alert("Please use a password of 6 or more characters");
   else{
     if(this.state.name===undefined || this.state.name.length===0)
     alert("Please provide a name");
     else{
       if(this.state.pob===undefined ||this.state.pob.length===0)
       alert("Please provide a birth location");
       else{
         if(this.state.pob !== undefined && this.state.pob==='undefined')
         alert('undefined is an invalid birth location');
         else{
console.log(this.state.pob);
firebase
     .auth()
     .createUserWithEmailAndPassword(email, password)
     .then(async (user) => {
    this.state.loggedIn=true;
    
       UserProfile.loggingInWithoutGoogle();
       UserProfile.setName(this.state.name);
       UserProfile.setEmail(this.state.email);
       UserProfile.setBirthday(this.state.dob);
       UserProfile.setBirthplace(this.state.pob);
       UserProfile.setBirthTime(this.state.tob);
       UserProfile.loggedIn=true;
       UserProfile.setLocalStorageBTime();
       UserProfile.setLocalStorageBDay();
       UserProfile.setLocalStorageBPlace();
       UserProfile.setLocalStorageEmail();
       UserProfile.setLocalStorageName();
       UserProfile.setLocalStorageisLoggedIn();
       UserProfile.setLocalStorageisLoggedInWithoutGoogle();

       const axiosUser = {
        Name: this.state.name,
        Sign: "Scorpio",
        Birthday: this.state.dob,
        TimeOfBirth: this.state.tob,
        LocationOfBirth: this.state.pob,
        Email: this.state.email,
    }
    await axiosPath.makeCreateRequest('personal/', axiosUser);
    console.log("SUccess");
    if(this.state.email==='Admin@admin.com')
      this.props.history.push('/Admin');
    else
      this.props.history.push('/User');
     //  return (<Redirect to={{pathname: '/User',state:{user:this.state, g:false}}}/>);



     })
     .catch((error) => {
       this.setState({ error: error });
     });
    }
  }
  }
  }
}
}
   }
 };


 componentDidUpdate(){
   console.log(30);
   console.log(this.state.loggedIn);
  if(this.state.loggedIn)
  return (<Redirect to={{pathname: '/User',state:{user:this.state, g:false}}}></Redirect>);

}

 render() {
   const { email, password, error , name, dob, tob, pob} = this.state;
console.log(10);
   return (
       <div className="SignIn">
            <header className="SignIn-header" style={{backgroundImage: `url(${background})` }}>
                <h1 className="signin-title">
                    User Information
                </h1>
               
       
                  <div className="Signin-card">  <p></p> 

           <form onSubmit={this.handleSubmit}>

           <div>
            <input
               type="text"
               name="name"
               placeholder="name"

               value={name}
               onChange={this.handleInputChange}
             />
             </div>

<div>
           <input type="text" name="email" placeholder="Email" value={email} onChange={this.handleInputChange} />
           </div>
             <div>
             <input
               type="password"
               name="password"
               placeholder="Password"

               value={password}
               onChange={this.handleInputChange}
             />
             </div>


             <div>
            <input
               type="text"
               name="pob"
               placeholder="place of birth"

               value={pob}
               onChange={this.handleInputChange}
             />
             </div>

             <div>
            <input
               type="text"
               name="tob"
               placeholder="time of birth"
                      
               value={tob}
               onChange={this.handleInputChange}
             />
             </div>

             <div>
            <input
               type="date"
               name="dob"
               placeholder="date of birth"
               value={dob}
               onChange={this.handleInputChange}
             />
             </div>


             <p style={{marginBottom:-15}}></p>
             <div>
             <ColorButton children="Register" className={useStyles.margin} size="large" onClick={this.handleSubmit}/>
</div>
           </form>
<p style={{marginTop: 5, marginBottom: 10, fontSize:25}}>or</p>
       <SignUpWithGoogle></SignUpWithGoogle>
           </div>
           
       
       
       <p style={{marginBottom:5}}>
                    <br></br><br></br>
                    Already a User?
                </p>
                <div>
                <ColorButton onClickCapture={this.LoginPage}className={useStyles.margin} size="large" variant="outlined" >GO LOGIN NOW</ColorButton>
                        </div>
</header>
       </div>

       
                
   );
   console.log(this.state.email);


 }
}
export default withRouter(SignUp);
