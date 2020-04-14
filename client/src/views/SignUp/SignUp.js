import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Flex, Box, Button, Heading, Text } from 'rebass';
import { Label, Input } from '@rebass/forms'
import firebase from './config2';
import UserProfile from './UserState';
import axiosPath from '../../axiosRequests';
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

function SignUp() {
    const { register, handleSubmit, errors } = useForm();
    const [destination,d]=useState("/SignUp");
    const [newUser, setNewUser] = useState({
        name: '',
        pob: '',
        dob: '',
        email: '',
        password: '',
        tob: '',
        ha:false
    });
    console.log(UserProfile.getLocalStorageisLoggedIn());

    const [problem, setProblem] = useState({
        nameP:false,
        pobP: false,
        dobP: false,
        emailP: false,
        emailAt: false,
        password: false,
        tobP: false,
        emailMatchesP:false
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


    const handle=async()=>{
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
        else
        problem.pobP=false;

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
        

/*
     const obj=  await log2.apply();
     console.log(obj);
    if(obj.Email===newUser.email){
        problem.emailMatchesP=true;
        bool=true;
    }
    console.log(bool);

*/
if(newUser.ha){
bool=true;
problem.emailMatchesP=true;
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
            
            if(!problem.emailMatchesP && problem.nameP){
                err+="No name given\n";
                problem.nameP=false;
            }
            if(!problem.emailMatchesP && problem.emailAt){
                err+="Invalid email given\n";
                problem.emailAt=false;

            }
            if(!problem.emailMatchesP && problem.emailP){
                err+="No email given\n";
                problem.emailMatchesP=false;
            }

            if(newUser.ha){
                err+="Already a user with this email\n";
                problem.emailMatchesP=false;
            }


            if(problem.pobP){
                err+="No place of birth given\n";
                problem.pobP=false;
            }

            if(!problem.emailMatchesP && problem.dobP){
                err+="No date of birth given\n";
                problem.dobP=false;

            }

            if(!problem.emailMatchesP && problem.passwordP){
                err+="No password given\n";
                problem.passwordP=false;
            }
            if(!problem.emailMatchesP && problem.tobP){
                err+="No time of birth given\n";

            }
            console.log(UserProfile.getLocalStorageisLoggedIn());
            if(err==="" && UserProfile.getLocalStorageisLoggedIn())
                err+="You are already logged in with email "+UserProfile.getEmail();
            alert(err);
            window.location.reload();
           

                    }



                    else{
                        
                        console.log("move n");
                        UserProfile.loggingInWithoutGoogle();
                        UserProfile.setName(newUser.name);
                        UserProfile.setEmail(newUser.email);
                        UserProfile.setBirthday(newUser.dob);
                        UserProfile.setBirthplace(newUser.pob);
                        UserProfile.setBirthTime(newUser.tob);
                        setNewUser(newUser);
                        UserProfile.loggedIn=true;
                        UserProfile.setLocalStorageBTime();
                        UserProfile.setLocalStorageBDay();
                        UserProfile.setLocalStorageBPlace();
                        UserProfile.setLocalStorageEmail();
                        UserProfile.setLocalStorageName();
                        UserProfile.setLocalStorageisLoggedIn();
                        UserProfile.setLocalStorageisLoggedInWithoutGoogle();
                        console.log(destination);
                        setNewUser(newUser);
                        
                    }
                  
                    console.log(destination);

=======
import SignUpWithGoogle from './SignUpWithGoogle';
import './SignUp.css';
class SignUp extends Component {
    constructor() {
        super();
        this.state = {name:'',email:'',pob:'', dob:'', tob:'',loggedIn:false, loggedInWithGoogle:false};
>>>>>>> Stashed changes
    }


    async log2(){
        let a= '';
        try{
            a=await axiosPath.makeGetRequest('personal/'+this.state.email)}
            catch{
                a=undefined;
            };
            const b=a;
console.log(b);
return b;
       };


handleInputChange = (event) => {
   this.setState({ [event.target.name]: event.target.value });
 };
handleSubmit = async (event) => {
   event.preventDefault();
   const obj=await this.log2();
   if(obj!==undefined){
   alert("Already a user with this email");
   return (<Redirect to={{pathname: '/Login'}}></Redirect>);
   }
   else{

   const { email, password } = this.state;
firebase
     .auth()
     .createUserWithEmailAndPassword(email, password)
     .then(async (user) => {
    this.state.loggedIn=true;
    
       UserProfile.loggingInWithoutGoogle();
       UserProfile.setName(this.state.name);
       UserProfile.setEmail(this.state.email);
       UserProfile.setBirthday(this.state.dob);
       UserProfile.setBirthplace(this.state.pob);
       UserProfile.setBirthTime(this.state.tob);
       UserProfile.loggedIn=true;
       UserProfile.setLocalStorageBTime();
       UserProfile.setLocalStorageBDay();
       UserProfile.setLocalStorageBPlace();
       UserProfile.setLocalStorageEmail();
       UserProfile.setLocalStorageName();
       UserProfile.setLocalStorageisLoggedIn();
       UserProfile.setLocalStorageisLoggedInWithoutGoogle();

       const axiosUser = {
        Name: this.state.name,
        Sign: "Scorpio",
        Birthday: this.state.dob,
        TimeOfBirth: this.state.tob,
        LocationOfBirth: this.state.pob,
        Email: this.state.email,
        Password: this.state.password
    }
    await axiosPath.makeCreateRequest('personal/', axiosUser);
    console.log("SUccess");
    if(this.state.email==='Admin@admin.com')
      this.props.history.push('/Admin');
    else
      this.props.history.push('/User');
     //  return (<Redirect to={{pathname: '/User',state:{user:this.state, g:false}}}/>);



<<<<<<< Updated upstream
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
                    <ColorButton onClick={handle} className={classes.margin} component={Link} size="large" variant="outlined" to={{pathname: destination,state:{user:newUser, g:false}}}> Submit</ColorButton>
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
=======
     })
     .catch((error) => {
       this.setState({ error: error });
     });
    }
 };


 componentDidUpdate(){
   console.log(30);
   console.log(this.state.loggedIn);
  if(this.state.loggedIn)
  return (<Redirect to={{pathname: '/User',state:{user:this.state, g:false}}}></Redirect>);
>>>>>>> Stashed changes

}

 render() {
   const { email, password, error , name, dob, tob, pob} = this.state;
console.log(10);
   return (
       <div>
       <Flex>
         <Box>
           <Heading>Register</Heading>
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
           <form onSubmit={this.handleSubmit}>
             <Input type="text" name="email" placeholder="Email" value={email} onChange={this.handleInputChange} />
             <Input
               type="password"
               name="password"
               placeholder="Password"
               value={password}
               onChange={this.handleInputChange}
             />
            <Input
               type="date"
               name="dob"
               placeholder="date of birth"
               value={dob}
               onChange={this.handleInputChange}
             />

            <Input
               type="text"
               name="tob"
               placeholder="time of birth"
               value={tob}
               onChange={this.handleInputChange}
             />

            <Input
               type="text"
               name="pob"
               placeholder="place of birth"
               value={pob}
               onChange={this.handleInputChange}
             />

            <Input
               type="text"
               name="name"
               placeholder="name"
               value={name}
               onChange={this.handleInputChange}
             />

             <Button children="Register" />
           </form>
         </Box>
       </Flex>
       or 
       <SignUpWithGoogle></SignUpWithGoogle>

       </div>
   );
   console.log(this.state.email);


 }
}
export default withRouter(SignUp);