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
    const [destination,d]=useState("/SignUp");
    const [newUser, setNewUser] = useState({
        name: '',
        pob: '',
        dob: '',
        email: '',
        password: '',
        tob: ''
    });
    console.log(UserProfile.getLocalStorageisLoggedIn());

    const [problem, setProblem] = useState({
        nameP:false,
        pobP: false,
        dobP: false,
        emailP: false,
        emailAt: false,
        password: false,
        tobP: false
    });

    useEffect(() => {
        console.log(newUser)
    }, [newUser], [destination]);


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


    async function handle(){
        let bool=false;
        let l="";

        console.log(newUser.dob);
        if(newUser.dob.length!==10){
            problem.dobP=true;
           bool=true;
           console.log("dob err");
        }


        if(newUser.pob.length===0){
            problem.pobP=true;
            bool=true;
            console.log("pob err");
        }

        if(newUser.name.length===0){
            problem.nameP=true;
            bool=true;
            console.log("name err");
        }

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
        if(newUser.tob.length===0){
            problem.tobP=true;
            bool=true;
        }
        let err="";

        if(bool){
            if(problem.nameP){
                err+="No name given\n";
                problem.nameP=false;
            }
            if(problem.emailAt){
                err+="Invalid email given\n";
                problem.emailAt=false;

            }
            if(problem.emailP){
                err+="No email given\n";
                problem.emailP=false;
            }


            if(problem.pobP){
                err+="No place of birth given\n";
                problem.pobP=false;
            }

            if(problem.dobP){
                err+="No date of birth given\n";
                problem.dobP=false;

            }

            if(problem.passwordP){
                err+="No password given\n";
                problem.passwordP=false;
            }
            if(problem.tobP){
                err+="No time of birth given\n";

            }
            console.log(UserProfile.getLocalStorageisLoggedIn());
            if(err==="" && UserProfile.getLocalStorageisLoggedIn())
                err+="You are already logged in with email "+UserProfile.getEmail();
            alert(err);

                    }



                    else{
                        console.log("move n");
                        UserProfile.loggingInWithoutGoogle();
                        UserProfile.setName(newUser.name);
                        UserProfile.setEmail(newUser.email);
                        UserProfile.setBirthday(newUser.dob);
                        UserProfile.setBirthplace(newUser.pob);
                        UserProfile.setBirthTime(newUser.tob);
                        UserProfile.setLocalStorageBTime();
                        UserProfile.setLocalStorageBDay();
                        UserProfile.setLocalStorageBPlace();
                        UserProfile.setLocalStorageEmail();
                        UserProfile.setLocalStorageName();
                        UserProfile.setLocalStorageisLoggedIn();
                        UserProfile.setLocalStorageisLoggedInWithoutGoogle();
                        console.log(destination);
                    }

    }
    const func=(a)=>{
        if(a.length==10 && newUser.name.length>0 && newUser.pob.length>0 && newUser.email.indexOf("@")>-1&& newUser.password.length>0&&newUser.tob.length>0)
            d('/User');
        else
            d('/SignUp');
        const user={
            name:newUser.name,
            pob: newUser.pob,
            dob: a,
            email:newUser.email,
            password:newUser.password,
            tob:newUser.tob
        }
        if(UserProfile.getLocalStorageisLoggedIn()===true)
            d('/SignUp');
        setNewUser(user);
        };

        const func2=(b)=>{
            if(newUser.dob.length==10 && newUser.name.length>0 && b.length>0 && newUser.email.indexOf("@")>-1&& newUser.password.length>0&&newUser.tob.length>0)
            d('/User');
        else
            d('/SignUp');
            const user={
                name:newUser.name,
                pob: b,
                dob: newUser.dob,
                email:newUser.email,
                password:newUser.password,
                tob:newUser.tob
            }
            if(UserProfile.getLocalStorageisLoggedIn()===true)
            d('/SignUp');
            setNewUser(user);
            };

            const func3=(c)=>{
                if(newUser.dob.length==10 && newUser.name.length>0 && newUser.pob.length>0 && newUser.email.indexOf("@")>-1&& c.length>0&&newUser.tob.length>0)
            d('/User');
        else
            d('/SignUp');
                const user={
                    name:newUser.name,
                    pob: newUser.pob,
                    dob: newUser.dob,
                    email:newUser.email,
                    password:c,
                    tob:newUser.tob
                }
                if(UserProfile.getLocalStorageisLoggedIn()===true)
            d('/SignUp');
                setNewUser(user);
                };

                const func4=(de)=>{
                    if(newUser.dob.length==10 && newUser.name.length>0 && newUser.pob.length>0 && de.indexOf("@")>-1&& newUser.password.length>0&&newUser.tob.length>0)
            d('/User');
        else
            d('/SignUp');
                    const user={
                        name:newUser.name,
                        pob: newUser.pob,
                        dob: newUser.dob,
                        email:de,
                        password:newUser.password,
                        tob:newUser.tob
                    }
                    if(UserProfile.getLocalStorageisLoggedIn()===true)
            d('/SignUp');
                    setNewUser(user);
                    };

                    const func5=(e)=>{
                        if(newUser.dob.length==10 && e.length>0 && newUser.pob.length>0 && newUser.email.indexOf("@")>-1&& newUser.password.length>0&&newUser.tob.length>0)
            d('/User');
        else
            d('/SignUp');
                        const user={
                            name:e,
                            pob: newUser.pob,
                            dob: newUser.dob,
                            email:newUser.email,
                            password:newUser.password,
                            tob:newUser.tob
                        }
                        if(UserProfile.getLocalStorageisLoggedIn()===true)
            d('/SignUp');
                        setNewUser(user);
                        };




                        const func6=(efg)=>{
                            if(newUser.dob.length==10 && newUser.name.length>0 && newUser.pob.length>0 && newUser.email.indexOf("@")>-1&& newUser.password.length>0&&efg.length>0)
                d('/User');
            else
                d('/SignUp');
                            const user={
                                name:newUser.name,
                                pob: newUser.pob,
                                dob: newUser.dob,
                                email:newUser.email,
                                password:newUser.password,
                                tob:efg
                            }
                            if(UserProfile.getLocalStorageisLoggedIn()===true)
                d('/SignUp');
                            setNewUser(user);
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
                <div>
                    <input type="text" placeholder="Name" name="name" ref={register} onChange={(e)=>func5(e.target.value)}/>
                    </div>
                    <div>
                        <input type="email" placeholder="Email Address" name="email" ref={register} onChange={(e)=>func4(e.target.value)}/>
                    </div>
                    <div>
                        <input type="text" placeholder="Password" name="password" ref={register} onChange={(e)=>func3(e.target.value)}/>
                    </div>
                    <div>
                    <input type="date" placeholder="Date of Birth" name="dob" ref={register} onChange={(e)=>func(e.target.value)} />
                    </div>
                    <div>
                        <input type="text" placeholder="Place of Birth" name="pob" ref={register} onChange={(e)=>func2(e.target.value)}/>
                    </div>
                    <div>
                        <input type="text" placeholder="Time of Birth" name="tob" ref={register} onChange={(e)=>func6(e.target.value)}/>
                    </div>
                    <div>
                    <ColorButton onClick={handle} className={classes.margin} component={Link} size="large" variant="outlined" to={{pathname: destination,state:newUser}}> Submit</ColorButton>
                        </div>

                <div>
                <SignUpWithGoogle></SignUpWithGoogle>
                </div>

                <p>
                    <br></br><br></br>
                    Already a User?
                </p>
                <div>
                    <ColorButton className={classes.margin} component={Link} size="large" variant="outlined" to={{pathname: '/Login',state:newUser}}> Go Login Now</ColorButton>
                        </div>

            </header>
        </div>
    );
}

export default SignUp;
