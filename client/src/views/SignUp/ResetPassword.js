import firebase from './config2';
import { Label, Input } from '@rebass/forms'
import { Link } from "react-router-dom";
import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import background from '../../assets/moonbackground.jpg';



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
  

  //password reset class (shows the password resetting on the front end)
class PasswordReset extends Component{
  //constructor sets the email's state (and the error state)
constructor(){
    super();
    this.state={email:'', error:''};
}

//when a user changes their input email, this changes the state of their input accordingly
handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //when  user submits their email for a password reset email, this method is called
handleSubmit = async (event) => {
    
    event.preventDefault();
    const { email, error} = this.state;

var auth = firebase.auth();
var emailAddress = email;

//firebase sends an email to reset the password of the user who forgot their email and if there is such a user, they are alerted when the email is sent
auth.sendPasswordResetEmail(email).then(function() {
    alert("A reset email has been sent");
}).catch(function(error) {
  //otherwise the error message alerts the user
  let mes='';
  if(error.message.indexOf('There is no user record corresponding to this identifier.')>=0)
   mes=error.message+" Or You may have signed up with google sign in"; 
 else
 mes=error.message;
   alert(mes);
});
}


//the render function shows the reset email information and has the background image
render(){
const { email, error } = this.state;
return(
  <header className="SignIn-header" style={{backgroundImage: `url(${background})` }}>

<form on onSubmit={this.handleSubmit}>
             <Input type="text" name="email" placeholder="Email" value={email} onChange={this.handleInputChange} />
             <ColorButton children="Send Email"  className={useStyles.margin} size="large" onClick={this.handleSubmit}/>
           </form>
</header>
);
}
}
export default PasswordReset;
