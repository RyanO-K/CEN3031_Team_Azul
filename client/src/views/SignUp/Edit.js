import { Redirect } from "react-router-dom";
import React, {Component} from 'react';
import { withRouter} from 'react-router-dom';
import { Label, Input } from '@rebass/forms'
import { Flex, Box, Button, Heading, Text, Link } from 'rebass';
import UserProfile from './UserState';
import axiosPath from '../../axiosRequests';

class Edit extends Component{
constructor(){
    super();
    this.state={name:UserProfile.getLocalStorageName(), bday:UserProfile.getLocalStorageBDay(), bplace: UserProfile.getLocalStorageBPlace(), btime: UserProfile.getLocalStorageBTime()};
}



async log2(){
    const axiosUser = {
        Name: this.state.name,
        Sign: "Scorpio",
        Birthday: this.state.bday,
        TimeOfBirth: this.state.btime,
        LocationOfBirth: this.state.bplace,
        Email: UserProfile.getLocalStorageEmail()
    }
    console.log(axiosUser);
  const a=
  await (axiosPath.makeUpdateRequest('personal/'+UserProfile.getLocalStorageEmail(), axiosUser));
  console.log(a);
  console.log(axiosUser);
UserProfile.setName(this.state.name);
UserProfile.setBirthday(this.state.bday);
UserProfile.setBirthplace(this.state.bplace);
UserProfile.setBirthTime(this.state.btime);
UserProfile.setLocalStorageName();
UserProfile.setLocalStorageBDay();
UserProfile.setLocalStorageBPlace();
UserProfile.setLocalStorageBTime();
return a;
   };

handleSubmit = async (event) => {
    event.preventDefault();
    const { name, btime, bplace, bday } = this.state;
    if(name.length===0)
        alert("Name field cannot be empty");
    else if(bday.length!==10)
        alert("Must have valid birth date");
    else{
        await this.log2();
        console.log("update successful");
    }
}

handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

render(){
    if(UserProfile.getLocalStorageEmail()===''||UserProfile.getLocalStorageEmail()===null || UserProfile.getLocalStorageEmail()==='null'||UserProfile.getLocalStorageEmail()===undefined)
        return (<Redirect to='/Home'/>);
 const {name, bday, bplace, btime, error } = this.state;
 return(
    <div className="Signin-card">
    <p></p>
   
    <form on onSubmit={this.handleSubmit}>
             <Input type="text" name="name" placeholder="Name" value={name} onChange={this.handleInputChange} />
             <Input type="date" name="bday" placeholder="Birth Date" value={bday} onChange={this.handleInputChange} />
             <Input type="text" name="btime" placeholder="Birth Time" value={btime} onChange={this.handleInputChange} />
             <Input type="text" name="bplace" placeholder="Birth Place" value={bplace} onChange={this.handleInputChange} />
             <Button children="Log In" />
           </form>
    <div>
    <Link href='/User'>Back to User Page</Link>
        </div>
    </div>
 );
}
}

export default Edit;
