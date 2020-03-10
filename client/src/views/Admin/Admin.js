import React, {useState, useEffect, Component} from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import background from '../../assets/moonbackground.jpg';

const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
}));

function Admin(){
    return (
        <div className="App">
            <header className="Header" >
                <h2>
                    You are on the admin page, there's nothing here yet.
                </h2>
            </header>
        </div>
    );

}

export default Admin;