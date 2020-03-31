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
import axiosPath from '../../axiosRequests';


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
            if(newUser.email!=='admin'|| newUser.password!=='admin'){
                err="Invalid Username or Password";
            if(newUser.email!=='admin' || newUser.password!=='admin')
            alert(err);
            }
            
                    }
                }


   



    
 


           const func3=async(c)=>{
               if(newUser.boo)
                newUser.boo=false;
            const user={
                email:newUser.email,
                password:c,
                boo:newUser.boo
            }
            setNewUser(user);
            newUser.password=c;
            setNewUser({
                email:newUser.email,
                password:newUser.password,
                boo:newUser.boo
            });
            console.log("DE: "+newUser.email);

            let ob=await log2.apply();
            let obj='';
            if(ob.length>=0){
                obj=await log.apply();
            }
            let bo=(obj.Email===newUser.email && obj.Password===newUser.password);
           
console.log(newUser.password);
console.log(newUser.email);
console.log(obj);
            if(obj.Email!==undefined&&newUser.email===obj.Email&& newUser.password===obj.Password){
    d('/User');
    bo=true;
            }
else{
    d('/Login');
bo=false;
}
            const user2={
                email:newUser.email,
                password:c,
                boo:bo
            }
            setNewUser(user2);
             };

                const func4=async(de)=>{
                        if(newUser.boo)
                        newUser.boo=false;
                    const user={
                        email:de,
                        password:newUser.password,
                        boo:newUser.boo
                    }
                    setNewUser(user);
                    newUser.email=de;
                    setNewUser({
                        email:newUser.email,
                        password:newUser.password,
                        boo:newUser.boo
                    });
                    console.log("DE: "+newUser.email);

                    let ob=await log2.apply();
                    let obj='';
                    if(ob.length>=0){
                        obj=await log.apply();
                    }
                    console.log(obj);
                    let bo=(obj.Email===newUser.email && obj.Password===newUser.password);
                   

                    if(obj.Email!==undefined&&de===obj.Email&& newUser.password===obj.Password&&!newUser.boo){
            d('/User');
            bo=true;
                    }
        else{
            d('/Login');
bo=false;
    }
                    const user2={
                        email:de,
                        password:newUser.password,
                        boo:bo
                    }
                    if(UserProfile.getLocalStorageisLoggedIn()===true)
            d('/Login');
                    setNewUser(user2);
                    };



   
                    const log = async () => {
                        return await axiosPath.makeGetRequest('personal/'+ newUser.email);   
                     };
                 
                     const log2 = async () => {
                         console.log("H: "+newUser.email);
                         let ob;
                        (await axiosPath.makeGetRequest('personal/'+ newUser.email).then(ob='hi').catch(ob=''));
                     return ob;    
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

                </div>
            </header>
        </div>
    );
}

export default Login;

