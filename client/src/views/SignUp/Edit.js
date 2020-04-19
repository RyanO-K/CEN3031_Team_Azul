import { Redirect } from "react-router-dom";
import React, {Component} from 'react';
import { withRouter} from 'react-router-dom';
import { Label, Input } from '@rebass/forms'
import { Flex, Box, Heading, Text, Link } from 'rebass';
import UserProfile from './UserState';
import axiosPath from '../../axiosRequests';
import background from '../../assets/moonbackground.jpg';
import "./Edit.css";
import Button from "@material-ui/core/Button";
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';

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
  

class Edit extends Component{
constructor(){
    super();
    this.state={name:UserProfile.getLocalStorageName(), bday:UserProfile.getLocalStorageBDay(), bplace: UserProfile.getLocalStorageBPlace(), btime: UserProfile.getLocalStorageBTime(), subscribed:UserProfile.getLocalStorageSubscribed()};
console.log(this.state.subscribed);
let change=this.state.subscribed;
if(this.state.bplace===undefined)
this.state.bplace='';
if(this.state.btime===undefined)
this.state.btime='';
}



async log2(){
    const axiosUser = {
        Name: this.state.name,
        Sign: "Scorpio",
        Birthday: this.state.bday,
        TimeOfBirth: this.state.btime,
        LocationOfBirth: this.state.bplace,
        Email: UserProfile.getLocalStorageEmail(),
        House:UserProfile.getLocalStorageHouse(),
        Subscribed:this.state.subscribed
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
UserProfile.setSubscribed(this.state.subscribed);
UserProfile.setLocalStorageName();
UserProfile.setLocalStorageBDay();
UserProfile.setLocalStorageBPlace();
UserProfile.setLocalStorageBTime();
UserProfile.setLocalStorageSubscribed();
return a;
   };


handleSubmit = async (event) => {
    event.preventDefault();
    const { name, btime, bplace, bday, subscribed } = this.state;
    if(name.length===0)
        alert("Name field cannot be empty");
    else if(bday.length!==10)
        alert("Must have valid birth date");
    else{
        await this.log2();
        console.log("update successful");

    }
}
handleInputChange2 = (event) => {
    this.setState({ subscribed: !this.state.subscribed });
};

handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
};
componentWillMount(){
    console.log(this.state.subscribed);
}
render(){
    if(this.state.subscribed==='true' || this.state.subscribed===true)
    this.state.subscribed=true;
    else
    this.state.subscribed=false;
    console.log(this.state.subscribed);
    if(UserProfile.getLocalStorageEmail()===''||UserProfile.getLocalStorageEmail()===null || UserProfile.getLocalStorageEmail()==='null'||UserProfile.getLocalStorageEmail()===undefined)
        return (<Redirect to='/Home'/>);
        console.log(UserProfile.getLocalStorageEmail());
 const {name, bday, bplace, btime, subscribed, error } = this.state;
 return(
    <div className="Edit">
        <header className="Edit-header" style={{backgroundImage: `url(${background})` }}>
            <div className="Edit-title">
                    Edit Your Account Information Here
            </div>
            <div className="Edit-card">
                <form onSubmit={this.handleSubmit}>
                    <Input type="text" name="name" placeholder="Name" value={name} onChange={this.handleInputChange} />
                    <Input type="date" name="bday" placeholder="Birth Date" value={bday} onChange={this.handleInputChange} />
                    <Input type="time" name="btime" placeholder="Birth Time" value={btime} onChange={this.handleInputChange} />
                    <Input type="text" name="bplace" placeholder="Birth Place" value={bplace} onChange={this.handleInputChange} />
                <div>
                    <input type="checkbox" id="sendEmail" name="subscribed"  placeholder="subscribed" onChange={this.handleInputChange2}checked={!subscribed}/>
                    <label for="sendEmail">Check this box to unsubscribe {subscribed}</label>
                </div>
                <div className="submit-button">
                    <ColorButton type="submit" children="Submit" />
                </div>
                </form>
                <div>
                <Link href='/User'>Back to User Page</Link>
                </div>
            </div>
        </header>
    </div>
);
}
}

export default Edit;
