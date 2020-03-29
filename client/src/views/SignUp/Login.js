import React, {useState, useEffect, Component} from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import './SignUp.css';
import { useForm } from 'react-hook-form'
import SignUpWithGoogle from "./SignUpWithGoogle";
import UserProfile from './UserState';
import LoginWithGoogle from './LoginWithGoogle';
import SignUp from './SignUp';


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

function Login(){
    const [destination,d]=useState("/Login");
    const [newUser, setNewUser] = useState({
        email: '',
        password: ''
    });

    const [problem, setProblem] = useState({
        emailP: false,
        emailAt: false,
        password: false,
    });
    const { register, handleSubmit, errors } = useForm();
    useEffect(() => {
        console.log(newUser)
    }, [newUser], [destination]);


    const onSubmit = (data,e) => {
        const user = {
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


    async function handle(){
        let bool=false;
        let l="";

        console.log(newUser.dob);

        //check if correct, not if 0
        if(newUser.email.length===0){
            problem.emailP=true;
            bool=true;
            console.log("email1 err");
        }

        if(newUser.email.indexOf("@")===-1){
            problem.emailAt=true;
            bool=true;
            console.log("email2 err");
        }

        if(newUser.password.length===0){
            problem.passwordP=true;
            bool=true;
            console.log("pword err");
        }
        let err="";

        if(bool){
           
            if(problem.emailAt){
                err+="Invalid email given\n";
                problem.emailAt=false;
            }
            if(problem.emailP){
                err+="No email given\n";
                problem.emailP=false;
            }
         

            if(problem.passwordP){
                err+="No password given\n";
                problem.passwordP=false;
            }
            console.log(UserProfile.getLocalStorageisLoggedIn());
            if(err==="" && UserProfile.getLocalStorageisLoggedIn())
                err+="You are already logged in with email "+UserProfile.getEmail();
            else if(err!=="")
                err="Invalid Username or Password";
            alert(err);
            
                    }



                    else{
                        console.log("move n");
                        UserProfile.loggingInWithoutGoogle();
                        UserProfile.setName(newUser.name);
                        UserProfile.setEmail(newUser.email);

                        //get dob and pob from backend
                        UserProfile.setBirthday("10");
                        UserProfile.setBirthplace("America");


                        UserProfile.setLocalStorageBDay();
                        UserProfile.setLocalStorageBPlace();
                        UserProfile.setLocalStorageEmail();
                        UserProfile.setLocalStorageName();
                        UserProfile.setLocalStorageisLoggedIn();
                        UserProfile.setLocalStorageisLoggedInWithoutGoogle();
                        console.log(destination);
                    }

    }
    

            const func3=(c)=>{ 
                //change this line to check if valid username and password instead
                if(newUser.email.indexOf("@")>-1&& c.length>0)
            d('/User');
        else
            d('/Login');
                const user={
                    email:newUser.email,
                    password:c
                }
                if(UserProfile.getLocalStorageisLoggedIn()===true)
            d('/Login');
                setNewUser(user);
                };

                const func4=(de)=>{
                    //change this line to check if valid username and password instead
                    if(de.indexOf("@")>-1&& newUser.password.length>0)
            d('/User');
        else
            d('/Login');
                    const user={
                        email:de,
                        password:newUser.password
                    }
                    if(UserProfile.getLocalStorageisLoggedIn()===true)
            d('/Login');
                    setNewUser(user);
                    };

    const classes = useStyles();

    return (

        <div className="Login">
            <header className="Login-header">
                <h1 className="login-title">
                    User Login
                </h1>
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                {/* <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                </a> */}
                <div>
                        <input type="email" placeholder="Email Address" name="email" ref={register} onChange={(e)=>func4(e.target.value)}/>
                    </div>
                    <div>
                        <input type="text" placeholder="Password" name="password" ref={register} onChange={(e)=>func3(e.target.value)}/>
                    </div>
                    <div>
                    <ColorButton onClick={handle} className={classes.margin} component={Link} size="large" variant="outlined" to={{pathname: destination,state:newUser}}> Login</ColorButton>
                        </div>
                <div>
                    <br></br>
                <LoginWithGoogle></LoginWithGoogle>
                </div>
                <div>
                    <br></br><br></br>
                    <p>
                        Don't have an account?
                    </p>
                    <ColorButton className={classes.margin} component={Link} size="large" variant="outlined" to={{pathname: '/SignUp'}}>Sign Up Here</ColorButton>

                </div>
            </header>
        </div>
    );
}

export default Login;

