import firebase from './config2';
import { Label, Input } from '@rebass/forms'
import { Link } from "react-router-dom";
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
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
    console.log(error);
  // An error happened.
});
}

render(){
const { email, error } = this.state;
return(

<form on onSubmit={this.handleSubmit}>
             <Input type="text" name="email" placeholder="Email" value={email} onChange={this.handleInputChange} />
             <Button children="Send Email" />
           </form>

);
}
}
export default PasswordReset;