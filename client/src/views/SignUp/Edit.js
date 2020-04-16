import { Redirect } from "react-router-dom";
import React, {Component} from 'react';
import { withRouter} from 'react-router-dom';
import { Label, Input } from '@rebass/forms'
import { Flex, Box, Button, Heading, Text, Link } from 'rebass';
import UserProfile from './UserState';
import axiosPath from '../../axiosRequests';


class Edit extends Component{
 constructor(props){
    super();
    console.log("Update");
    console.log(props);
    if(this.props!==undefined)
    this.state={name:props.location.state.name, bday:props.location.state.bday, bplace:props.location.state.bplace, btime:props.location.state.btime};
    else
    this.state={name:UserProfile.getLocalStorageName(), bday:UserProfile.getLocalStorageBDay(), bplace: UserProfile.getLocalStorageBPlace(), btime: UserProfile.getLocalStorageBTime()};
console.log(this.state);
    if((this.state.btime==='undefined' && this.state.bday==='undefined' && this.state.bplace==='undefined')||(this.state.btime==='' && this.state.bday==='' && this.state.bplace==='')){
 //this.doSomething();
UserProfile.setBirthday(this.state.bday);
UserProfile.setBirthplace(this.state.bplace);
UserProfile.setBirthTime(this.state.btime);
UserProfile.setLocalStorageBDay();
UserProfile.setLocalStorageBPlace();
UserProfile.setLocalStorageBTime();
//window.location.reload();
}
}



async log3(){
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


   async log2(){
    const a= (await axiosPath.makeGetRequest('personal/'+UserProfile.getLocalStorageEmail()));
console.log(a);
return a;
   };

handleSubmit = async (event) => {
    event.preventDefault();
    const { name, btime, bplace, bday } = this.state;
    if(name.length===0)
        alert("Name field cannot be empty");
    else if(bplace.length===0)
        alert("Must have valid birth location");
    else if(bplace==='undefined')
        alert('undefined is an invalid birthplace');
    else{
        await this.log3();
        console.log("update successful");
    }
}

handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };


  async componentWillMount(){
      if(this.state.bplace==='undefined'){
    const obj=  await this.log2();
    console.log(obj);
    this.state.btime=obj.TimeOfBirth;
    this.state.bday=obj.Birthday;
    this.state.bplace=obj.LocationOfBirth;
    UserProfile.setBirthday(this.state.bday);
UserProfile.setBirthplace(this.state.bplace);
UserProfile.setBirthTime(this.state.btime);
UserProfile.setLocalStorageBDay();
UserProfile.setLocalStorageBPlace();
UserProfile.setLocalStorageBTime();
console.log(obj);
window.location.reload();
      }


      if(this.state.bplace===''){
        const obj=  await this.log2();
        console.log(obj);
        this.state.btime=obj.TimeOfBirth;
        this.state.bday=obj.Birthday;
        this.state.name=obj.Name;
        this.state.bplace=obj.LocationOfBirth;
        UserProfile.setBirthday(this.state.bday);
    UserProfile.setBirthplace(this.state.bplace);
    UserProfile.setBirthTime(this.state.btime);
    UserProfile.setName(this.state.name);
    UserProfile.setLocalStorageBDay();
    UserProfile.setLocalStorageName();
    UserProfile.setLocalStorageBPlace();
    UserProfile.setLocalStorageBTime();
    console.log(obj);
    window.location.reload();
          }
  }

 render(){
    console.log(UserProfile.getLocalStorageBPlace());
    if(UserProfile.getLocalStorageEmail()===''||UserProfile.getLocalStorageEmail()===null || UserProfile.getLocalStorageEmail()==='null'||UserProfile.getLocalStorageEmail()===undefined)
        return (<Redirect to='/Home'/>);
    if(this.state.LocationOfBirth==='undefined'){
    return (<Redirect to={{pathname:'/Edit', state:this.state}}/>);
    }
       
 return(
    <div className="Signin-card">
    <p></p>
   
    <form on onSubmit={this.handleSubmit}>
             <Input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleInputChange} />
             <Input type="date" name="bday" placeholder="Birth Date" value={this.state.bday} onChange={this.handleInputChange} />
             <Input type="text" name="btime" placeholder="Birth Time" value={this.state.btime} onChange={this.handleInputChange} />
             <Input type="text" name="bplace" placeholder="Birth Place" value={this.state.bplace} onChange={this.handleInputChange} />
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
