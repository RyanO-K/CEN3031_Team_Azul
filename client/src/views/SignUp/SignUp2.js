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


//this file is for signing a user up if they chose to sign up with google
function SignUp2(props) {
    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm();
    const [newUser, setNewUser] = useState({
        name: null,
        pob: '',
        dob: '',
        tob:'',
        email: null,
        house:'',
        sign:''

    });
    //use variables to represent if there were invalid input fields for any inputs
    const [problem, setProblem] = useState({
        pobP: false,
        dobP: false,
        tobP: false
    });

    //start with the next page being set to this page
    const [destination,d]=useState("/SignUp2");

    //if the user was not supposed to be here (they didn't enter a valid google email from sign up page) send them back to home page
    if(props.location.state===undefined)
    return <Redirect to='/Home'/>;

    //if the user refreshed this page, we get the user information back from our temporary user session data
    if(props.location.state.email===undefined){
        newUser.name=UserProfile.getLocalStorageTempName();
        newUser.email=UserProfile.getLocalStorageTempEmail();
    }
    //otherwise, this is our first time on this page, so set user temporary session data to what we got from the previous page
    else{
    newUser.name=props.location.state.name;
    newUser.email=props.location.state.email;
    UserProfile.setTempEmail(newUser.email);
    UserProfile.setTempName(newUser.name);
    UserProfile.setLocalStorageTempEmail();
    UserProfile.setLocalStorageTempName();
    }




    //when a user submits, this method is called
    async function handle(){
        let bool=false;
        let l="";



//if invalid date of birth, we set an error
        if(newUser.dob===undefined || newUser.dob.length!==10){
            problem.dobP=true;
            bool=true;

        }

        //if no errors so far and user chooses undefined as birth location, alert them not to do that
        if(!bool)
        if(newUser.pob==='undefined'){
            bool=true;
            alert('Please enter a valid location of birth (or leave it blank)');
        }





        let err="";
//and then if the date of birth was invalid, we alert the user of the error
        if(bool){
            if(problem.dobP){
                err+="No date of birth given\n";
                problem.dobP=false;
                alert(err);

            }



                    }
                    else{

                       
                       

                        //otherwise, there are no problems, so we set user session variables so user may be logged in
                        UserProfile.loggedIn=true;
                        UserProfile.setName(newUser.name);
                        UserProfile.setEmail(newUser.email);
                        UserProfile.loggingInWithGoogle();
                        UserProfile.setBirthplace(newUser.pob);
                        UserProfile.setBirthday(newUser.dob);
                        UserProfile.setBirthTime(newUser.tob);
                        UserProfile.setSubscribed(true);
                        UserProfile.setSign('');
                        UserProfile.setHouse('');

                        UserProfile.setLocalStorageBTime();
                        UserProfile.setLocalStorageEmail();
                        UserProfile.setLocalStorageisLoggedInWithGoogle();
                        UserProfile.setLocalStorageName();
                        UserProfile.setLocalStorageBPlace();
                        UserProfile.setLocalStorageBDay();
                        UserProfile.setLocalStorageSubscribed();
                        UserProfile.setLocalStorageHouse();
                        
                        const axiosUser = {
                            Name: newUser.name,
                            Sign: '',
                            Birthday: newUser.dob,
                            TimeOfBirth: newUser.tob,
                            LocationOfBirth: newUser.pob,
                            Email: newUser.email,
                            House:'',
                            Subscribed:true
                        }
                        //we then create a corresponding user in our database
                        axiosPath.makeCreateRequest('personal/', axiosUser)
                    }

    }

//when a user puts in a birth date, this method handles it
   const func=(a)=>{

//if valid birth date, make the next page the user page.  Else, keep it this page
    if(a.length===10 && newUser.pob!=='undefined')
    d('/User');
else
    d('/SignUp2');
    const user={
        name:newUser.name,
        pob: newUser.pob,
        dob: a,
        email:newUser.email,
        tob: newUser.tob,
        house:newUser.house,
        sign:newUser.sign
    }
    UserProfile.setBirthday(a);
    setNewUser(user);
    };


//this method handles birth place 
    const func2=(b)=>{
        //if valid birth date, make the next page the user page.  Else, keep it this page
        if(newUser.dob.length===10 && b!=='undefined')
        d('/User');
    else
        d('/SignUp2');
        const user={
            name:newUser.name,
            pob: b,
            dob: newUser.dob,
            email:newUser.email,
            tob:newUser.tob,
            house:newUser.house,
            sign:newUser.sign
        }
        UserProfile.setBirthplace(b);
        setNewUser(user);
        };

        //this method handles time of birth
        const func6=(efg)=>{
            //if valid birth date, make the next page the user page.  Else, keep it this page
            if(newUser.dob.length===10 && newUser.pob!=='undefined')
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
                house:newUser.house,
                sign:newUser.sign
            }
            if(UserProfile.getLocalStorageisLoggedIn()===true)
d('/SignUp2');
            setNewUser(user);
            };
    

            //here we have our styling (background, text boxes, and button for submitting)
    return (

        <div className="SignIn2">
            <header className="SignIn2-header" style={{backgroundImage: `url(${background})` }}>
                <h1 className="signin2-title">
                    Additional User Information
                </h1>
                {}
                {}

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
                    <ColorButton onClick={handle} className={classes.margin} component={Link} size="large" variant="outlined" to={{pathname:destination, state:{user:newUser, g:true}}}> Submit</ColorButton>


                </div>
            </div>


            </header>
        </div>
    );


}

export default SignUp2;
