import React, {useState, useEffect} from 'react';
import {TextField} from '@material-ui/core'
import { Route, Switch, Redirect  } from 'react-router-dom';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import UserProfile from '../SignUp/UserState';
import Button from '@material-ui/core/Button'
import axiosPath from '../../axiosRequests';
import background from '../../assets/moonbackground.jpg';
import './Admin.css';
import img from '../../components/Moon/moon.png'
import { Link } from 'react-router-dom';
import { grey } from '@material-ui/core/colors';


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


const Admin = () =>{

  if(UserProfile.getLocalStorageEmail()==='Admin@admin.com'){
    UserProfile.loggingInWithoutGoogle();
    UserProfile.setLocalStorageisLoggedIn();
    UserProfile.setEmail('admin');
    UserProfile.setLocalStorageEmail();
    }
    const ColorText = withStyles(theme => ({
        root: {
            backgroundColor: '#DCDCDC'
        },
    }))(TextField);

    const [data, setData] = useState({
        sun: '',
        moon: '',
        house: '',
        interpretation: 'No Info',
    });

    const [info, setInfo] = useState('');

    const [currMoonPhase, setCurrMoonPhase] = useState('');

    const changeMoonPhase = (event) => {
        setCurrMoonPhase(event.target.id)
    }

    useEffect(() => {
        console.log(currMoonPhase)
    }, [currMoonPhase]);

    const sendEmail = (event) => {
        event.preventDefault();
        try{
            console.log("submit")
            // let result = await axiosPath.makeUpdateRequest('horoscopeInfo/?moonphase='+moonphase+'&house='+house+'&sign='+sign,{
            //     "house": house,
            //     "sign": sign,
            //     "moonphase": moonphase,
            //     "description": description
            //     });
        }catch(err){
        }
    }

    const handleChange = (event) => {
        setInfo(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setData({...data, interpretation: info})
        createInterpretation(data.moon,data.house,data.sun,info);
    }
const classes = useStyles();
    const getInterpretation = async (moonphase, house, sign) => {
        let result = await axiosPath.makeGetRequest('horoscopeInfo/search/?moonphase='+moonphase+'&house='+house+'&sign='+sign);
        return result
      };

    const createInterpretation = async (moonphase, house, sign, description) => {
        try{
            let result = await axiosPath.makeUpdateRequest('horoscopeInfo/?moonphase='+moonphase+'&house='+house+'&sign='+sign,{
                "house": house,
                "sign": sign,
                "moonphase": moonphase,
                "description": description
                });
        }catch(err){
            let result = await axiosPath.makeCreateRequest('horoscopeInfo/',{
            "house": house,
            "sign": sign,
            "moonphase": moonphase,
            "description": description
            });
        }

    };

    function signOff(){
        UserProfile.loggingOut();
        UserProfile.setLocalStorageisLoggedIn();
        UserProfile.setLocalStorageisLoggedInWithoutGoogle();
        UserProfile.loggedIn=false;
        UserProfile.setEmail('');
        UserProfile.setLocalStorageEmail();
        }
    if(UserProfile.getLocalStorageEmail()!=='admin')
    return(<Redirect to="/Home"/>);

    const dispSunSign = async (clicked) =>
    {
        const newSign = clicked.target.id;
        try{
            let result = await getInterpretation(data.moon,data.house,newSign,data.interpretation);
            setData({...data, sun: newSign, interpretation: result.description})
        }catch(err){
            setData({...data, sun: newSign, interpretation: ""})
        }
    }
    const dispMoonPhase = async (clicked) =>
    {
        const newMoon = clicked.target.id;
        try{
            let result = await getInterpretation(newMoon,data.house,data.sun,data.interpretation);
            setData({...data, moon: newMoon, interpretation: result.description})

        }catch(err){
            setData({...data, moon: newMoon, interpretation: ""})
        }
    }
    const dispHouses = async (clicked) =>
    {
        const newHouse = clicked.target.id;
        
        try{
            let result = await getInterpretation(data.moon,newHouse,data.sun,data.interpretation);
            setData({...data, house: newHouse, interpretation: result.description})

        }catch(err){
            setData({...data, house: newHouse, interpretation: ""})
        }

        
        
    }
    return (

<header className="Header" style={{backgroundImage: `url(${background})` }}>
    <h1 style={{marginBottom:5}}>Welcome, Admin!</h1>
    <p style={{marginTop:5,fontSize:25}}>You can make changes to the horoscope data here:</p>
    <div>
        <div className="Admin-card">
            <p style={{marginLeft:40}}className='column1' >
                <div>
                    <div className="flot1">
                        <DropdownButton id="dropdown-basic-button" title="Sun Signs">
                            <div>
                                <Dropdown.Item as="button" id="Aquarius" onClick={(e) => dispSunSign(e)}>Aquarius</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item as="button" id="Aries" onClick={(e) => dispSunSign(e)}>Aries</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item as="button" id="Taurus" onClick={(e) => dispSunSign(e)}>Taurus</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item as="button" id="Gemini" onClick={(e) => dispSunSign(e)}>Gemini</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item as="button" id="Cancer" onClick={(e) => dispSunSign(e)}>Cancer</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item as="button" id="Leo" onClick={(e) => dispSunSign(e)}>Leo</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item as="button" id="Virgo" onClick={(e) => dispSunSign(e)}>Virgo</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item as="button" id="Libra" onClick={(e) => dispSunSign(e)}>Libra</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item as="button" id="Scorpio" onClick={(e) => dispSunSign(e)}>Scorpio</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item as="button" id="Sagittarius" onClick={(e) => dispSunSign(e)}>Sagitarrius</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item as="button" id="Capricorn" onClick={(e) => dispSunSign(e)}>Capricon</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item as="button" id="Pisces" onClick={(e) => dispSunSign(e)}>Pisces</Dropdown.Item>
                            </div>

                        </DropdownButton>
                    </div>
                    <div className="flot1">
                        <DropdownButton id="dropdown-basic-button" title="Lunar Phase">
                            <div>
                                <Dropdown.Item as="button" id="NewMoon" onClick={(e) => dispMoonPhase(e)}>New Moon</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item as="button" id="WaxingCrescent" onClick={(e) => dispMoonPhase(e)}>Waxing Crescent</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item as="button" id="FirstQuarter" onClick={(e) => dispMoonPhase(e)}>First Quarter</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item as="button" id="WaxingGibbous" onClick={(e) => dispMoonPhase(e)}>Waxing Gibbous</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item as="button" id="FullMoon" onClick={(e) => dispMoonPhase(e)}>Full Moon</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item as="button" id="WaningGibbous" onClick={(e) => dispMoonPhase(e)}>Waning Gibbous</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item as="button" id="LastQuarter" onClick={(e) => dispMoonPhase(e)}>Last Quarter</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item as="button" id="WaningCrescent" onClick={(e) => dispMoonPhase(e)}>Waning Crescent</Dropdown.Item>
                            </div>
                        </DropdownButton>
                    </div>
                    <div className="flot1">
                        <DropdownButton id="dropdown-basic-button" title="Houses">
                            <div>
                                <Dropdown.Item as="button" id="1st" onClick={(e) => dispHouses(e)}>1st</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item as="button" id="2nd" onClick={(e) => dispHouses(e)}>2nd</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item as="button" id="3rd" onClick={(e) => dispHouses(e)}>3rd</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item as="button" id="4th" onClick={(e) => dispHouses(e)}>4th</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item as="button" id="5th" onClick={(e) => dispHouses(e)}>5th</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item as="button" id="6th" onClick={(e) => dispHouses(e)}>6th</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item as="button" id="7th" onClick={(e) => dispHouses(e)}>7th</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item as="button" id="8th" onClick={(e) => dispHouses(e)}>8th</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item as="button" id="9th" onClick={(e) => dispHouses(e)}>9th</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item as="button" id="10th" onClick={(e) => dispHouses(e)}>10th</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item as="button" id="11th" onClick={(e) => dispHouses(e)}>11th</Dropdown.Item>
                            </div>
                            <div>
                                <Dropdown.Item as="button" id="12th" onClick={(e) => dispHouses(e)}>12th</Dropdown.Item>
                            </div>
                        </DropdownButton>
                    </div>
                </div>
            </p>

            <p className="column2">

                <div style={{marginBottom:5}}>Sun: 
                    <div style={{fontSize:17}}>
                        {data.sun}
                    </div>
                </div>
                <div style={{marginBottom:5}}>Moon: 
                    <div style={{fontSize:17}}>
                        {data.moon}
                    </div>
                </div>
                <div style={{marginBottom:5}}>House: 
                    <div style={{fontSize:17}}>
                        {data.house}
                    </div>
                </div>
                <div style={{marginBottom:5}}>Interpretation: 
                    <div style={{fontSize:17}}>
                        {data.interpretation}
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={{marginTop:20}}>
                        <TextField
                            id="standard-multiline-static"
                            onChange={handleChange}
                            label="Interpretation"
                            multiline
                            rows="4"
                        />
                    </div>
                    <input type="submit" value="Submit" />
                </form>

            </p>
        </div>
        <div className="Email-card">
            <div>
                <input type="image" id="NewMoon" src="https://i.imgur.com/DCrZonl.png" onClick={(e) => changeMoonPhase(e)}/>
                New Moon
            </div>
            <div>
                <input type="image" id="WaxingCrescent" src="https://i.imgur.com/PWhVPg5.png" onClick={(e) => changeMoonPhase(e)}/>
                Waxing Crescent
            </div>
            <div>
                <input type="image" id="FirstQuarter" src="https://i.imgur.com/nAQ95qN.png" onClick={(e) => changeMoonPhase(e)}/>
                First Quarter
            </div><div>
                <input type="image" id="WaxingGibbous" src="https://i.imgur.com/d7C4UrE.png" onClick={(e) => changeMoonPhase(e)}/>
                Waxing Gibbous
            </div>
            <div>
                <input type="image" id="FullMoon" src="https://i.imgur.com/zWy3vSU.png" onClick={(e) => changeMoonPhase(e)}/>
                Full Moon
            </div>
            <div>
                <input type="image" id="WaningGibbous" src="https://i.imgur.com/vOqxYrM.png" onClick={(e) => changeMoonPhase(e)}/>
                Waning Gibbous
            </div>
            <div>
                <input type="image" id="LastQuarter" src="https://i.imgur.com/kxIicxI.png" onClick={(e) => changeMoonPhase(e)}/>
                Last Quarter
            </div>
            <div>
                <input type="image" id="WaningCrescent" src="https://i.imgur.com/xwZUmoR.png" onClick={(e) => changeMoonPhase(e)}/>
                Waning Crescent
            </div>
            <ColorButton onClick={sendEmail}>Submit</ColorButton>
         </div>
         <div>
         <ColorButton onClick={signOff} className={classes.margin} component={Link} size="large" variant="outlined" to={{pathname: '/Home'}}>Log Out</ColorButton>
         </div>
         </div>
        </header>


    );

}
export default Admin;
