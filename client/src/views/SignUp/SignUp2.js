import React, {useState, useEffect, Component} from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import './SignUp2.css';
import { useForm } from 'react-hook-form'
import SignUpWithGoogle from "./SignUpWithGoogle";
import '../Home/Home.css';
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

function SignUp2(props) {
    console.log(UserProfile.getName());
    const { register, handleSubmit, errors } = useForm();
    const [newUser, setNewUser] = useState({
        name: props.location.state.name,
        pob: '',
        dob: '',
        tob:'',
        email: props.location.state.email

    });
    const [problem, setProblem] = useState({
        pobP: false,
        dobP: false,
        tobP: false
    });
    const [destination,d]=useState("/SignUp2");

    useEffect(() => {
        console.log(newUser)
    }, [newUser]);

    const onSubmit = (data,e) => {
        const user = {
            name:newUser.name,
            pob: data.pob,
            dob: data.dob,
            email:newUser.email,
            tob:newUser.tob
        }
        console.log("User"+data);
        // {...newUser,
        //     name: data.name,
        //     pob: data.pob,
        //     dob: data.dob,
        //     email: data.email,
        //     password: data.password
        // }
        setNewUser(user);
        e.target.reset();
        console.log(user);

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

        if(newUser.tob.length===0){
            problem.tobP=true;
            bool=true;
            console.log("tob err");
        }



        let err="";

        if(bool){
            if(problem.pobP){
                err+="No place of birth given\n";
                problem.pobP=false;

            }

            if(problem.dobP){
                err+="No date of birth given\n";
                problem.dobP=false;

            }

            if(problem.tobP){
                err+="No time of birth given\n";
                problem.tobP=false;

            }


            alert(err);

                    }
                    else{
                        UserProfile.setName(props.location.state.name);
                        UserProfile.setEmail(props.location.state.email);
                        UserProfile.loggingInWithGoogle();
                        UserProfile.setBirthTime(newUser.tob);
                        UserProfile.setLocalStorageBTime();
                        UserProfile.setLocalStorageEmail();
                        UserProfile.setLocalStorageisLoggedInWithGoogle();
                        UserProfile.setLocalStorageName();
                        UserProfile.setLocalStorageBPlace(newUser.pob);
                        UserProfile.setLocalStorageBDay(newUser.dob);
                    }

    }


   const func=(a)=>{
    if(a.length==10 && newUser.pob.length>0 && newUser.tob.length>0)
    d('/User');
else
    d('/SignUp2');
    const user={
        name:newUser.name,
        pob: newUser.pob,
        dob: a,
        email:newUser.email,
        tob: newUser.tob
    }
    UserProfile.setBirthday(a);
    setNewUser(user);
    };

    const func2=(b)=>{
console.log(newUser);
        if(newUser.dob.length==10 && b.length>0 && newUser.tob.length>0)
        d('/User');
    else
        d('/SignUp2');
        const user={
            name:newUser.name,
            pob: b,
            dob: newUser.dob,
            email:newUser.email,
            tob:newUser.tob
        }
        UserProfile.setBirthplace(b);
        setNewUser(user);
        };

        const func6=(efg)=>{
            if(newUser.dob.length==10 && newUser.pob.length>0 && efg.length>0)
d('/User');
else
d('/SignUp2');
            const user={
                name:newUser.name,
                pob: newUser.pob,
                dob: newUser.dob,
                email:newUser.email,
                password:newUser.password,
                tob:efg
            }
            if(UserProfile.getLocalStorageisLoggedIn()===true)
d('/SignUp2');
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
                        <input type="date" placeholder="Date of Birth" name="dob" ref={register} onChange={(e)=>func(e.target.value)} />
                    </div>
                    <div>
                        <input type="text" placeholder="Place of Birth" name="pob" ref={register} onChange={(e)=>func2(e.target.value)}/>
                    </div>

                    <div>
                        <input type="text" placeholder="Time of Birth" name="tob" ref={register} onChange={(e)=>func6(e.target.value)}/>
                    </div>

                    <div>
                    <ColorButton onClick={handle} className={classes.margin} component={Link} size="large" variant="outlined" to={{pathname:destination, state:{name:newUser.name, email:newUser.email}}}> Submit</ColorButton>


                    </div>


            </header>
        </div>
    );


}

export default SignUp2;
