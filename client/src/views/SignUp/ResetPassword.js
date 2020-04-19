import firebase from './config2';
import { Label, Input } from '@rebass/forms'
import { Link } from "react-router-dom";
import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import background from '../../assets/moonbackground.jpg';
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
  

class PasswordReset extends Component{
constructor(){
    super();
    this.state={email:'', error:''};
}
handleInputChange = (event) => {
    console.log(this.state.email);
    this.setState({ [event.target.name]: event.target.value });
  };

  
handleSubmit = async (event) => {
    
    event.preventDefault();
    const { email, error} = this.state;
    console.log(email);

var auth = firebase.auth();
var emailAddress = email;

auth.sendPasswordResetEmail(email).then(function() {
    alert("A reset email has been sent");
  // Email sent.
}).catch(function(error) {
  console.log(error.message);
  let mes='';
  if(error.message.indexOf('There is no user record corresponding to this identifier.')>=0)
   mes=error.message+" Or You may have signed up with google sign in"; 
 else
 mes=error.message;
   alert(mes);
  // An error happened.
});
}

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
