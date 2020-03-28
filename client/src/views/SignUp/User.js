import React, {useState, useEffect, Component} from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import { useForm } from 'react-hook-form'
import SignUpWithGoogle from "./SignUpWithGoogle";
import SignUp2 from "./SignUp2";

function User(props){
    console.log(props);
    const [newUser, setNewUser] = useState({
        name: props.location.user.na.name,
        pob: props.location.user.na.pob,
        dob: props.location.user.na.dob,
        email: props.location.user.na.email
    });
    return(
  <p>
        {newUser.name}<br></br>
        {newUser.email}<br></br>
        {newUser.dob}<br></br>
        {newUser.pob}<br></br>

   </p>
    );
}
export default User;
