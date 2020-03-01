import React, {useState, useEffect, Component} from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import './SignUp.css';
import { useForm } from 'react-hook-form'
import SignUpWithGoogle from "./SignUpWithGoogle";


const ColorButton = withStyles(theme => ({
    root: {
        padding: '6px 12px',
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

function SignUp() {
    const { register, handleSubmit, errors } = useForm();
    const [newUser, setNewUser] = useState({
        name: '',
        pob: '',
        dob: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        console.log(newUser)
    }, [newUser]);

    const onSubmit = (data,e) => {
        const user = {
            name: data.name,
            pob: data.pob,
            dob: data.dob,
            email: data.email,
            password: data.password
        }
        // {...newUser,
        //     name: data.name,
        //     pob: data.pob,
        //     dob: data.dob,
        //     email: data.email,
        //     password: data.password
        // }
        setNewUser(user);
        e.target.reset();
        //send it here?
    };

    const classes = useStyles();

    return (

        <div className="SignIn">
            <header className="SignIn-header">
                <h1 className="signin-title">
                    User Information
                </h1>
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                {/* <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                </a> */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder="Name" name="name" ref={register} />
                    <div>
                        <input type="email" placeholder="Email Address" name="email" ref={register} />
                    </div>
                    <div>
                        <input type="text" placeholder="Password" name="password" ref={register} />
                    </div>
                    <div>
                        <input type="date" placeholder="Date of Birth" name="dob" ref={register} />
                    </div>
                    <div>
                        <input type="text" placeholder="Place of Birth" name="pob" ref={register} />
                    </div>
                  

                    <div>
                        <Button type="submit"> submit</Button>
                    </div>
                </form>
                <div>
                <SignUpWithGoogle></SignUpWithGoogle>
                </div>
            </header>
        </div>
    );
}

export default SignUp;
