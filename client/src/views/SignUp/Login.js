import React, {useState, useEffect, Component} from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import './Login.css';
import { useForm } from 'react-hook-form'
import SignUpWithGoogle from "./SignUpWithGoogle";
import UserProfile from './UserState';
import LoginWithGoogle from './LoginWithGoogle';
import SignUp from './SignUp';
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

function Login(){
    console.log("email is: "+UserProfile.getLocalStorageEmail());

    const [destination,d]=useState("/Login");
    const [newUser, setNewUser] = useState({
        email: '',
        password: '',
        name:'',
        dob:'',
        tob:'',
        pob:'',
        boo:false,
        correctPassword:''
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

    useEffect(()=>{
        console.log(newUser.boo);
        if(newUser.boo)
            d('/User');
            else if(newUser.email==='admin' && newUser.password==='admin'){
            d('/Admin');
            UserProfile.setEmail('admin');
            UserProfile.setLocalStorageEmail();
            }
            else
            d('/Login');
        

    }
    );
    const classes = useStyles();
    if(UserProfile.getLocalStorageisLoggedIn()){
        return <Redirect to="/User"/>
    }
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
        console.log("ya");
        let bool=false;
        let l="";
        
       
        if(newUser.boo){ const obj=await log2.apply();
            console.log("move n");
                        UserProfile.loggingInWithoutGoogle();
                        UserProfile.setName(obj.Name);
                        UserProfile.setEmail(newUser.email);

                        //get dob and pob from backend
                        UserProfile.setBirthday(obj.Birthday);
                        UserProfile.setBirthplace(obj.LocationOfBirth);
                        UserProfile.setBirthTime(obj.TimeOfBirth);



                        UserProfile.setLocalStorageBDay();
                        UserProfile.setLocalStorageBPlace();
                        UserProfile.setLocalStorageEmail();
                        UserProfile.setLocalStorageName();
                        UserProfile.setLocalStorageisLoggedIn();
                        UserProfile.setLocalStorageisLoggedInWithoutGoogle();
                        console.log(destination);

                        const user={
                            email:newUser.email,
                            password:newUser.password,
                            boo:newUser.boo,
                            pob:obj.LocationOfBirth,
                            tob:obj.TimeOfBirth,
                            dob:obj.Birthday,
                            correctPassword:newUser.correctPassword
                        }
                        setNewUser(user);

            }
        else{
console.log("no");
        let err="";

       
            console.log(UserProfile.getLocalStorageisLoggedIn());
                err="Invalid Username or Password";
            if(newUser.password!=='admin' || newUser.email!=='admin')
            alert(err);
            
                    }
                }


   



    
    const log2 = async () => {
        
        return (await axiosPath.makeGetRequest('personal/'+ newUser.email));
  
           };



           const func3=async(c)=>{

            const user={
               
                email:newUser.email,
                password:c,
                
                boo:newUser.boo,
                correctPassword:newUser.correctPassword
            }
            setNewUser(user);

            const obj=await log2.apply();
            let bo=(obj.Email!==undefined && obj.Password===c);
console.log(obj);
console.log(bo);
console.log(obj.email===undefined);
console.log(newUser.password);        
console.log(obj.Password);   

            if(newUser.password===obj.Password && obj.Email===newUser.email)
    d('/User');
    
else
    d('/Login');
            const user2={
 
                email:newUser.email,
                password:c,

                boo:bo,
                correctPassword:obj.password
            }
            if(UserProfile.getLocalStorageisLoggedIn()===true)
    d('/Login');
            setNewUser(user2);
            };

                const func4=async(de)=>{

                    const user={
                       
                        email:de,
                        password:newUser.password,
                        
                        boo:newUser.boo,
                        correctPassword:newUser.correctPassword
                    }
                    setNewUser(user);

                    const obj=await log2.apply();
                    let bo=(obj.Email!==undefined && obj.Password===newUser.password);

                   

                    if(newUser.password===obj.Password && obj.Email===newUser.email)
            d('/User');
            
        else
            d('/Login');
                    const user2={
         
                        email:de,
                        password:newUser.password,
        
                        boo:bo,
                        correctPassword:obj.password
                    }
                    if(UserProfile.getLocalStorageisLoggedIn()===true)
            d('/Login');
                    setNewUser(user2);
                    };



   

    return (

        <div className="Login">
            <header className="Login-header" style={{backgroundImage: `url(${background})` }}>
                <h1 className="login-title">
                    Welcome to MoonFlow
                </h1>
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                {/* <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                </a> */}
                <div className="Login-card">
                    <p style={{marginBottom:5}}>Login</p>
                    <div>
                        {/* <p style={{marginLeft:5, font:5, marginBottom:5}}>Email</p> */}
                        <input type="email" placeholder="Email Address" name="email" ref={register} onChange={(e)=>func4(e.target.value)}/>
                    </div>
                    <div style={{marginBottom:7,marginTop:1}}>
                        <input type="text" placeholder="Password" name="password" ref={register} onChange={(e)=>func3(e.target.value)}/>
                    </div>
                    <div>
                    <ColorButton onClick={handle} className={classes.margin} component={Link} size="large" variant="outlined" to={{pathname: destination,state:{user: {name:newUser.name, email:newUser.email, dob:newUser.dob, pob:newUser.pob, tob:newUser.tob}, g:false}}}> Login</ColorButton>
                        </div>
                    <p style={{marginTop: 10, marginBottom: 15, fontSize:25}}>or</p>
                <LoginWithGoogle></LoginWithGoogle>
                </div>
                <div>
                    <br></br><br></br>
                    <p style={{marginBottom:5}}>
                        Don't have an account?
                    </p>
                    <ColorButton className={classes.margin} component={Link} size="large" variant="outlined" to={{pathname: '/SignUp'}}>Sign Up Here</ColorButton>

                </div>
            </header>
        </div>
    );
}

export default Login;

