import { Redirect } from "react-router-dom";
import React, {Component} from 'react';
import { withRouter} from 'react-router-dom';
import { Label, Input } from '@rebass/forms'
import { Flex, Box, Heading, Text, Link } from 'rebass';
import UserProfile from './UserState';
import axiosPath from '../../axiosRequests';
import Button from "@material-ui/core/Button";
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import background from '../../assets/moonbackground.jpg';
import "./Edit.css";

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
  

  /* This class is the one responsible for allowing users to edit their fields when signed in (on the front end) */

class Edit extends Component{

/* Constructor sets the state of the variables to what they currently are from the user's session */
constructor(){
    super();
    this.state={name:UserProfile.getLocalStorageName(), bday:UserProfile.getLocalStorageBDay(), bplace: UserProfile.getLocalStorageBPlace(), btime: UserProfile.getLocalStorageBTime(), subscribed:UserProfile.getLocalStorageSubscribed()};
if(this.state.bplace===undefined)
this.state.bplace='';
if(this.state.btime===undefined)
this.state.btime='';
}


//This function updates user information in the database.  Then, it sets the user's session data to what they just updated it to.  
async log2(){
    const axiosUser = {
        Name: this.state.name,
        Sign: UserProfile.getLocalStorageSign(),
        Birthday: this.state.bday,
        TimeOfBirth: this.state.btime,
        LocationOfBirth: this.state.bplace,
        Email: UserProfile.getLocalStorageEmail(),
        House:UserProfile.getLocalStorageHouse(),
        Subscribed:this.state.subscribed
    }


    //send user information to update to the database
  const a=
  await (axiosPath.makeUpdateRequest('personal/'+UserProfile.getLocalStorageEmail(), axiosUser));


/* Sets the User session name, birthday, birth place, birth time, and whether they are subscribed to what the user updated them to */
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


/* When a user hits the save button, this function is called, which if the name and birthday are valid, updates the user information in the database*/
handleSubmit = async (event) => {
    event.preventDefault();
    const { name, btime, bplace, bday, subscribed } = this.state;
    if(name.length===0)
        alert("Name field cannot be empty");
    else if(bday.length!==10)
        alert("Must have valid birth date");
    else if(bplace==='undefined')
        alert("Please enter a valid location of birth (or leave it blank)");
    else{
        await this.log2(); //save user to db

    }
}

//function for handling unsubscribed checkbox
handleInputChange2 = (event) => {
    this.setState({ subscribed: !this.state.subscribed }); 
};

//function for handling all other inputs to change user information in db.  
handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
};

//function for actually rendering current user information for them to change
render(){
    if(this.state.subscribed==='true' || this.state.subscribed===true)
    this.state.subscribed=true;
    else
    this.state.subscribed=false;
   
    //if the user is not actually logged in, they should not be here, so send them back to the home page
    if(UserProfile.getLocalStorageEmail()===''||UserProfile.getLocalStorageEmail()===null || UserProfile.getLocalStorageEmail()==='null'||UserProfile.getLocalStorageEmail()===undefined)
        return (<Redirect to='/Home'/>);

        //otherwise, show them the edit page, which has fields for them to fill out and edit user information as well as the background
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
