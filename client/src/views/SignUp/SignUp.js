import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Flex, Box, Button, Heading, Text } from 'rebass';
import { Label, Input } from '@rebass/forms'
import firebase from './config2';
import UserProfile from './UserState';
import axiosPath from '../../axiosRequests';
import SignUpWithGoogle from './SignUpWithGoogle';
import './SignUp.css';
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


handleInputChange = (event) => {
   this.setState({ [event.target.name]: event.target.value });
 };
handleSubmit = async (event) => {
   event.preventDefault();
   const obj=await this.log2();
   if(obj!==undefined){
   alert("Already a user with this email");
   return (<Redirect to={{pathname: '/Login'}}></Redirect>);
   }
   else{

   const { email, password } = this.state;
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
        Password: this.state.password
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
       <div>
       <Flex>
         <Box>
           <Heading>Register</Heading>
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
           <form onSubmit={this.handleSubmit}>
             <Input type="text" name="email" placeholder="Email" value={email} onChange={this.handleInputChange} />
             <Input
               type="password"
               name="password"
               placeholder="Password"
               value={password}
               onChange={this.handleInputChange}
             />
            <Input
               type="date"
               name="dob"
               placeholder="date of birth"
               value={dob}
               onChange={this.handleInputChange}
             />

            <Input
               type="text"
               name="tob"
               placeholder="time of birth"
               value={tob}
               onChange={this.handleInputChange}
             />

            <Input
               type="text"
               name="pob"
               placeholder="place of birth"
               value={pob}
               onChange={this.handleInputChange}
             />

            <Input
               type="text"
               name="name"
               placeholder="name"
               value={name}
               onChange={this.handleInputChange}
             />

             <Button children="Register" />
           </form>
         </Box>
       </Flex>
       or 
       <SignUpWithGoogle></SignUpWithGoogle>

       </div>
   );
   console.log(this.state.email);


 }
}
export default withRouter(SignUp);