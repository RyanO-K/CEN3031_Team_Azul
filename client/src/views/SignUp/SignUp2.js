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
import background from '../../assets/moonbackground.jpg';
import axiosPath from '../../axiosRequests';


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

function SignUp2(props) {
    const classes = useStyles();
    console.log(UserProfile.getName());
    const { register, handleSubmit, errors } = useForm();
    const [newUser, setNewUser] = useState({
        name: null,
        pob: '',
        dob: '',
        tob:'',
        email: null,
        house:''

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
    
    if(props.location.state===undefined)
    return <Redirect to='/Home'/>;

    if(props.location.state.email===undefined){
        newUser.name=UserProfile.getLocalStorageTempName();
        newUser.email=UserProfile.getLocalStorageTempEmail();
    }
    else{
    newUser.name=props.location.state.name;
    newUser.email=props.location.state.email;
    UserProfile.setTempEmail(newUser.email);
    UserProfile.setTempName(newUser.name);
    UserProfile.setLocalStorageTempEmail();
    UserProfile.setLocalStorageTempName();
    }
    console.log(newUser);

    const onSubmit = (data,e) => {
        const user = {
            name:newUser.name,
            pob: data.pob,
            dob: data.dob,
            email:newUser.email,
            tob:newUser.tob,
            house:newUser.house
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

       // console.log(newUser.dob);
        //if(newUser.dob.length!==10){
          //  problem.dobP=true;
           //bool=true;
           //console.log("dob err");
        //}


        if(newUser.dob===undefined || newUser.dob.length!==10){
            problem.dobP=true;
            bool=true;
            console.log("dob err");
        }

     //   if(newUser.tob.length===0){
       //     problem.tobP=true;
         //   bool=true;
           // console.log("tob err");
        //}



        let err="";

        if(bool){
            if(problem.dobP){
                err+="No place of birth given\n";
                problem.dobP=false;
                alert(err);

            }

           // if(problem.dobP){
             //   err+="No date of birth given\n";
              //  problem.dobP=false;

            //}

           // if(problem.tobP){
             //   err+="No time of birth given\n";
               // problem.tobP=false;

            //}


          //  alert(err);

                    }
                    else{

                       
                       

                        
                        UserProfile.loggedIn=true;
                        UserProfile.setName(newUser.name);
                        UserProfile.setEmail(newUser.email);
                        UserProfile.loggingInWithGoogle();
                        UserProfile.setBirthplace(newUser.pob);
                        UserProfile.setBirthday(newUser.dob);
                        UserProfile.setBirthTime(newUser.tob);
                        UserProfile.setSubscribed(true);

                        UserProfile.setLocalStorageBTime();
                        UserProfile.setLocalStorageEmail();
                        UserProfile.setLocalStorageisLoggedInWithGoogle();
                        UserProfile.setLocalStorageName();
                        UserProfile.setLocalStorageBPlace();
                        UserProfile.setLocalStorageBDay();
                        UserProfile.setLocalStorageSubscribed();

                        const axiosUser = {
                            Name: newUser.name,
                            Sign: "Scorpio",
                            Birthday: newUser.dob,
                            TimeOfBirth: newUser.tob,
                            LocationOfBirth: newUser.pob,
                            Email: newUser.email,
                            House:'',
                            Subscribed:true
                        }
                        axiosPath.makeCreateRequest('personal/', axiosUser)
                    }

    }


   const func=(a)=>{
    if(a.length===10)
    d('/User');
else
    d('/SignUp2');
    const user={
        name:newUser.name,
        pob: newUser.pob,
        dob: a,
        email:newUser.email,
        tob: newUser.tob,
        house:newUser.house
    }
    UserProfile.setBirthday(a);
    setNewUser(user);
    };

    const func2=(b)=>{
console.log(newUser);
        if(newUser.dob.length===10)
        d('/User');
    else
        d('/SignUp2');
        const user={
            name:newUser.name,
            pob: b,
            dob: newUser.dob,
            email:newUser.email,
            tob:newUser.tob,
            house:newUser.house
        }
        UserProfile.setBirthplace(b);
        setNewUser(user);
        };

        const func6=(efg)=>{
            if(newUser.dob.length===10)
d('/User');
else
d('/SignUp2');
            const user={
                name:newUser.name,
                pob: newUser.pob,
                dob: newUser.dob,
                email:newUser.email,
                password:newUser.password,
                tob:efg,
                house:newUser.house
            }
            if(UserProfile.getLocalStorageisLoggedIn()===true)
d('/SignUp2');
            setNewUser(user);
            };
    

    return (

        <div className="SignIn2">
            <header className="SignIn2-header" style={{backgroundImage: `url(${background})` }}>
                <h1 className="signin2-title">
                    Additional User Information
                </h1>
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                {/* <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                </a> */}

            <div className="Signin2-card">
                <div style={{marginTop:'20px'}}>
                        <input type="date" placeholder="Date of Birth" name="dob" ref={register} onChange={(e)=>func(e.target.value)} />
                    </div>
                    <div>
                        <input type="text" placeholder="Place of Birth" name="pob" ref={register} onChange={(e)=>func2(e.target.value)}/>
                    </div>

                    <div>
                        <input type="time" placeholder="Time of Birth" name="tob" ref={register} onChange={(e)=>func6(e.target.value)}/>
                    </div>

                    <div>
                    <ColorButton onClickCapture={handle}  onClick={handle} className={classes.margin} component={Link} size="large" variant="outlined" to={{pathname:destination, state:{user:newUser, g:true}}}> Submit</ColorButton>


                </div>
            </div>


            </header>
        </div>
    );


}

export default SignUp2;
