<<<<<<< Updated upstream
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
=======
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Label, Input } from '@rebass/forms'
import { Flex, Box, Button, Heading, Text, Link } from 'rebass';
import firebase from './config2';
import UserProfile from './UserState';
>>>>>>> Stashed changes
import axiosPath from '../../axiosRequests';
import LoginWithGoogle from './LoginWithGoogle';
import { Route, Switch, Redirect  } from 'react-router-dom';
import User from './User';

class Login extends Component {
    constructor(){
    super();

<<<<<<< Updated upstream
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
                if(newUser.email!=='admin'||newUser.password!=='admin')
            alert(err);
            
                    }
                }


=======
    UserProfile.name='';
    UserProfile.email=null;
    UserProfile.isLoggedIn=false;
    this.state = {name:'', email:null, loggedIn:false, loggedInWithGoogle:false, nextPage:''};
    }
handleInputChange = (event) => {
   this.setState({ [event.target.name]: event.target.value });
 };


 async log2(){
        const a= (await axiosPath.makeGetRequest('personal/'+this.state.email));
console.log(a);
return a;
       };



handleSubmit = async (event) => {
   event.preventDefault();
   const { email, password } = this.state;
firebase
     .auth()
     .signInWithEmailAndPassword(email, password)
     .then(async(user) => {
       this.setState({name:this.state.name, email:this.state.email, loggedIn:this.state.loggedIn, loggedInWithGoogle:false, nextPage:this.state.nextPage});
       const obj=await this.log2();
 console.log(obj);
 UserProfile.setEmail(this.state.email);
        UserProfile.loggingInWithoutGoogle();
        UserProfile.setLocalStorageisLoggedInWithGoogle();
        UserProfile.setLocalStorageisLoggedIn();
        UserProfile.setLocalStorageEmail();
        console.log(UserProfile.getLocalStorageEmail());
        this.state.nextPage='/User';
        console.log(this.state.nextPage);
        console.log(UserProfile.getLocalStorageEmail());
        this.state.loggedInWithGoogle=false;


       if(obj!==undefined && obj.Email===this.state.email){
>>>>>>> Stashed changes
   
        this.bool=true;
        console.log(this.bool);
        
        
                //response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
                //console.log(GoogleLogin.BasicProfile);
            //if(this.state.email!=null &&this.state.email===this.state.email)
              //  alert("you are already logged in with email " +this.state.email+".  Please log out if you would like to login with another account.");
            //else{
            UserProfile.loggingInWithoutGoogle();
            //console.log(UserProfile.isLoggedIn());
            
            this.setState({name:this.state.name, email:this.state.email, loggedIn:true, loggedInWithGoogle:this.state.loggedInWithGoogle, nextPage:this.nextPage});
            UserProfile.setEmail(this.state.email); 
            UserProfile.loggedIn=true;
            this.setState({name:this.state.name, email:this.state.email, loggedIn:true, loggedInWithGoogle:this.state.loggedInWithGoogle, nextPage:this.nextPage});
            UserProfile.setLocalStorageName();
            UserProfile.setLocalStorageEmail();
            console.log(UserProfile.getLocalStorageEmail());
            UserProfile.setLocalStorageisLoggedInWithGoogle();
            UserProfile.setLocalStorageisLoggedIn();
            this.setState({name:this.state.name, email:this.state.email, loggedIn:true, loggedInWithGoogle:this.state.loggedInWithGoogle, nextPage:this.nextPage});
            //console.log(this.state.name);
            this.setState({name:this.state.name, email:this.state.email, loggedIn:true, loggedInWithGoogle:this.state.loggedInWithGoogle, nextPage:this.nextPage});
            //console.log(this.state.name);
           // console.log(this.state.email);
           UserProfile.loggedIn=true;
           this.state.loggedIn=true;
           this.nextPage='/User';
        
<<<<<<< Updated upstream
                        boo:bo,
                        correctPassword:obj.password
                    }
                    if(UserProfile.getLocalStorageisLoggedIn()===true)
            d('/Login');
                    setNewUser(user2);
                    };



   

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
                    <ColorButton onClick={handle} className={classes.margin} component={Link} size="large" variant="outlined" to={{pathname: destination,state:{user: {name:newUser.name, email:newUser.email, dob:newUser.dob, pob:newUser.pob, tob:newUser.tob}, g:false}}}> Login</ColorButton>
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
=======
           console.log(this.state.nextPage);window.location.reload();  
           if(this.state.email==='Admin@admin.com')
           this.props.history.push('/Admin');
          else
           return <Redirect to={{pathname: '/User',state:{user: {name:this.state.name, email:this.state.email, dob:this.state.dob, pob:this.state.pob, tob:this.state.tob}, g:false}}}></Redirect>
         
         }
     })
     .catch((error) => {
       this.setState({ error: error });
       this.setState({name:this.state.name, email:this.state.email, loggedIn:false, loggedInWithGoogle:this.state.loggedInWithGoogle, nextPage:this.nextPage});
        UserProfile.loggedIn=false; 
        this.state.loggedIn=false;
        alert('Invalid Username or Password');
        UserProfile.loggingOut();
        UserProfile.setLocalStorageisLoggedIn();
        UserProfile.setLocalStorageisLoggedInWithoutGoogle();
        this.state.nextPage='/Login';
         console.log("Faile");
         return <Redirect to="/Login"/>
>>>>>>> Stashed changes

       
     });
 };
 render() {
    console.log(UserProfile.getLocalStorageEmail());
    if(UserProfile.getLocalStorageEmail()!=='' && UserProfile.getLocalStorageEmail()!==null && UserProfile.getLocalStorageEmail()!=='null')
    if(UserProfile.getLocalStorageEmail()==='Admin@admin.com')
    return <Redirect to='/Admin'/>
    else
    return <Redirect to='/User'/>
   const { email, password, error } = this.state;
   return (
     <div>
       <Flex>
         <Box>
           <Heading>Log In</Heading>
         </Box>
       </Flex>
       {error ? (
         <Flex>
           <Box>
             <Text>{error.message}</Text>
           </Box>
         </Flex>
       ) : null}
       <Flex>
         <Box>
           <form on onSubmit={this.handleSubmit}>
             <Input type="text" name="email" placeholder="Email" value={email} onChange={this.handleInputChange} />
             <Input
               type="password"
               name="password"
               placeholder="Password"
               value={password}
               onChange={this.handleInputChange}
             />
             <Button children="Log In" />
           </form>

         </Box>
       </Flex>
       Forgot Password?
       <Link href='/PasswordReset'>Reset Password</Link>


       or
       <LoginWithGoogle></LoginWithGoogle>
     </div>
   );
 }
}
<<<<<<< Updated upstream

export default Login;

=======
export default withRouter(Login);
>>>>>>> Stashed changes
