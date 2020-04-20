import React, {useState, useEffect} from 'react';
import {TextField} from '@material-ui/core'
import { Route, Switch, Redirect  } from 'react-router-dom';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import UserProfile from '../SignUp/UserState';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import SendIcon from '@material-ui/icons/Send';
import axiosPath from '../../axiosRequests';
import background from '../../assets/moonbackground.jpg';
import './Admin.css';
import img from '../../components/Moon/moon.png'
import { Link } from 'react-router-dom';
import { grey } from '@material-ui/core/colors';


const ColorButton = withStyles(theme => ({
    root: {
        borderRadius: 20,
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


const Admin = () =>{

  if(UserProfile.getLocalStorageEmail()==='heavenlymoonflow@gmail.com'){
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
        sun: 'Not Selected',
        moon: 'Not Selected',
        house: 'Not Selected',
        interpretation: 'No Info',
    });

    const [info, setInfo] = useState('');

    const [currMoonPhase, setCurrMoonPhase] = useState('No Selection');

    const changeMoonPhase = (event) => {
        setCurrMoonPhase(event.target.id)
    }

    useEffect(() => {
        console.log(currMoonPhase)
    }, [currMoonPhase]);

    const sendEmail = async(event) => {
        event.preventDefault();
        try{
            console.log("submit")
            let result = await axiosPath.makeGetRequest('personal/Admin@admin.com2'+currMoonPhase,{
            // //     "house": house,
            // //     "sign": sign,
            // //     "moonphase": moonphase,
            // //     "description": description
            });
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
            <p style={{marginTop:5,fontSize:25}}>Change horoscope information and send emails here:</p>
            <div>
                <div className="Admin-card">
                    <div className="Admin-title">Horoscope Database</div>
                    <div style={{marginLeft:40}}className='column1' >
                        <div>
                            <div className="flot1">
                                <div className="button-section">   
                                    <div className="image-button">
                                        <input type="image" id="Aries" src="https://i.imgur.com/GFHkqQh.png" onClick={(e) => dispSunSign(e)}/>
                                    </div> 
                                    <div className="button-text">
                                        Aries
                                    </div>
                                </div>
                                <div className="button-section">
                                    <div className="image-button">
                                        <input type="image" id="Taurus" src="https://i.imgur.com/SN80p6D.png" onClick={(e) => dispSunSign(e)}/>
                                    </div>
                                    <div className="button-text">Taurus</div>
                                </div>
                                <div className="button-section">
                                    <div className="image-button">
                                        <input type="image" id="Gemini" src="https://i.imgur.com/oJhfUdd.png" onClick={(e) => dispSunSign(e)}/>
                                    </div>
                                    <div className="button-text">Gemini</div>
                                </div>
                                <div className="button-section">
                                    <div className="image-button">
                                        <input type="image" id="Cancer" src="https://i.imgur.com/sLAaEPn.png" onClick={(e) => dispSunSign(e)}/>
                                    </div>
                                    <div className="button-text">Cancer</div>
                                </div>
                                <div className="button-section">
                                    <div className="image-button">
                                        <input type="image" id="Leo" src="https://i.imgur.com/L3TT7gU.png" onClick={(e) => dispSunSign(e)}/>
                                    </div>
                                    <div className="button-text">Leo</div>
                                </div>
                                <div className="button-section">
                                    <div className="image-button">
                                        <input type="image" id="Virgo" src="https://i.imgur.com/wlTVYaO.png" onClick={(e) => dispSunSign(e)}/>
                                    </div>
                                    <div className="button-text">Virgo</div>
                                </div>
                                <div className="button-section">
                                    <div className="image-button">
                                        <input type="image" id="Libra" src="https://i.imgur.com/opW4Dy3.png" onClick={(e) => dispSunSign(e)}/>
                                    </div>
                                    <div className="button-text">Libra</div>
                                </div>
                                <div className="button-section">
                                    <div className="image-button">
                                        <input type="image" id="Scorpio" src="https://i.imgur.com/KCL5fGl.png" onClick={(e) => dispSunSign(e)}/>
                                    </div>
                                    <div className="button-text">Scorpio</div>
                                </div>
                                <div className="button-section">
                                    <div className="image-button">
                                        <input type="image" id="Sagittarius" src="https://i.imgur.com/dRf2qkv.png" onClick={(e) => dispSunSign(e)}/>
                                    </div>
                                    <div className="button-text">Sagittarius</div>
                                </div>
                                <div className="button-section">
                                    <div className="image-button">
                                        <input type="image" id="Capricorn" src="https://i.imgur.com/XY7an6R.png" onClick={(e) => dispSunSign(e)}/>
                                    </div>
                                    <div className="button-text">Capricorn</div>
                                </div>
                                <div className="button-section">
                                    <div className="image-button">
                                        <input type="image" id="Aquarius" src="https://i.imgur.com/ZfBKBQv.png" onClick={(e) => dispSunSign(e)}/>
                                    </div>
                                    <div className="button-text">Aquarius</div>
                                </div>
                                <div className="button-section">
                                    <div className="image-button">
                                        <input type="image" id="Pisces" src="https://i.imgur.com/CY6XGPM.png" onClick={(e) => dispSunSign(e)}/>
                                    </div>
                                    <div className="button-text">Pisces</div>
                                </div>
                            </div>
                            <div className="flot1">
                                <div className="button-section">
                                    <div className="image-button">
                                        <input type="image" id="NewMoon" src="https://i.imgur.com/DCrZonl.png" onClick={(e) => dispMoonPhase(e)}/>
                                    </div>
                                    <div className="button-text">New Moon</div>
                                </div>
                                <div className="button-section">
                                    <div className="image-button">
                                        <input type="image" id="WaxingCrescent" src="https://i.imgur.com/PWhVPg5.png" onClick={(e) => dispMoonPhase(e)}/>
                                    </div>
                                    <div className="button-text">Waxing Crescent</div>
                                </div>
                                <div className="button-section">
                                    <div className="image-button">
                                        <input type="image" id="FirstQuarter" src="https://i.imgur.com/nAQ95qN.png" onClick={(e) => dispMoonPhase(e)}/>
                                    </div>
                                    <div className="button-text">First Quarter</div>
                                </div>
                                <div className="button-section">
                                    <div className="image-button">
                                        <input type="image" id="WaxingGibbous" src="https://i.imgur.com/d7C4UrE.png" onClick={(e) => dispMoonPhase(e)}/>
                                    </div>
                                    <div className="button-text">Waxing Gibbous</div>
                                </div>
                                <div className="button-section">
                                    <div className="image-button">
                                        <input type="image" id="FullMoon" src="https://i.imgur.com/zWy3vSU.png" onClick={(e) => dispMoonPhase(e)}/>
                                    </div>
                                    <div className="button-text">Full Moon</div>
                                </div>
                                <div className="button-section">
                                    <div className="image-button">
                                        <input type="image" id="WaningGibbous" src="https://i.imgur.com/vOqxYrM.png" onClick={(e) => dispMoonPhase(e)}/>
                                    </div>
                                    <div className="button-text">Waning Gibbous</div>
                                </div>
                                <div className="button-section">
                                    <div className="image-button">
                                        <input type="image" id="LastQuarter" src="https://i.imgur.com/kxIicxI.png" onClick={(e) => dispMoonPhase(e)}/>
                                    </div>
                                    <div className="button-text">Last Quarter</div>
                                </div>
                                <div className="button-section">
                                    <div className="image-button">
                                        <input type="image" id="WaningCrescent" src="https://i.imgur.com/xwZUmoR.png" onClick={(e) => dispMoonPhase(e)}/>
                                    </div>
                                    <div className="button-text">Waning Crescent</div>
                                </div>
                            </div>
                            <div className="flot1">
                                <div className="button-section">
                                    <div className="image-button">
                                        <input type="image" id="1st" src="https://i.imgur.com/SjXwuSW.png" onClick={(e) => dispHouses(e)}/>
                                    </div>
                                    <div className="button-text">1st</div>
                                </div>
                                <div className="button-section">
                                    <div className="image-button">
                                        <input type="image" id="1st" src="https://i.imgur.com/pK7VaCD.png" onClick={(e) => dispHouses(e)}/>
                                    </div>
                                    <div className="button-text">1st</div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="column2">

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
                            <div className="interpretation">
                                {data.interpretation}
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div style={{marginTop:5}}>
                                <TextField
                                    id="standard-multiline-static"
                                    onChange={handleChange}
                                    label="Enter Interpretation:"
                                    multiline
                                    rows="4"
                                />
                            </div>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
                <div className="Email-card">
                <div className="Admin">
                <div className="Email-title">Send Emails</div>
                <div className="button-section" style={{marginLeft:12}}>
                    <div className="currMoonPhase">Today's Moon Phase:&nbsp;</div>
                    <div className="currMoonPhase">{" " + currMoonPhase}</div>
                </div>

                    <div className="button-section">
                        <div className="image-button">
                            <input type="image" id="NewMoon" src="https://i.imgur.com/DCrZonl.png" onClick={(e) => changeMoonPhase(e)}/>
                        </div>
                        <div className="button-text">New Moon</div>
                    </div>
                    <div className="button-section">
                        <div className="image-button">
                                <input type="image" id="WaxingCrescent" src="https://i.imgur.com/PWhVPg5.png" onClick={(e) => changeMoonPhase(e)}/>
                        </div>
                        <div className="button-text">Waxing Crescent</div>
                    </div>
                    <div className="button-section">
                        <div className="image-button">
                                <input type="image" id="FirstQuarter" src="https://i.imgur.com/nAQ95qN.png" onClick={(e) => changeMoonPhase(e)}/>
                        </div>
                        <div className="button-text">First Quarter</div>
                    </div>
                    <div className="button-section">
                        <div className="image-button">
                            <input type="image" id="WaxingGibbous" src="https://i.imgur.com/d7C4UrE.png" onClick={(e) => changeMoonPhase(e)}/>
                        </div>
                        <div className="button-text">Waxing Gibbous</div>
                    </div>
                    <div className="button-section">
                        <div className="image-button">
                            <input type="image" id="FullMoon" src="https://i.imgur.com/zWy3vSU.png" onClick={(e) => changeMoonPhase(e)}/>
                        </div>
                        <div className="button-text">Full Moon</div>
                    </div>
                    <div className="button-section">
                        <div className="image-button">
                            <input type="image" id="WaningGibbous" src="https://i.imgur.com/vOqxYrM.png" onClick={(e) => changeMoonPhase(e)}/>
                        </div>
                        <div className="button-text">Waning Gibbous</div>
                    </div>
                    <div className="button-section">
                        <div className="image-button">
                            <input type="image" id="LastQuarter" src="https://i.imgur.com/kxIicxI.png" onClick={(e) => changeMoonPhase(e)}/>
                        </div>
                        <div className="button-text">Last Quarter</div>
                    </div>
                    <div className="button-section">
                        <div className="image-button">
                            <input type="image" id="WaningCrescent" src="https://i.imgur.com/xwZUmoR.png" onClick={(e) => changeMoonPhase(e)}/>
                        </div>
                    <div className="button-text">Waning Crescent</div>
                </div>
                    <ColorButton endIcon={<SendIcon />} onClick={sendEmail}>Send</ColorButton>
                </div>
                </div>
                <div className="logout">
                    <ColorButton onClick={signOff} className={classes.margin} component={Link} size="large" variant="outlined" to={{pathname: '/Home'}}>Log Out</ColorButton>
                </div>
            </div>
        </header>


    );

}
export default Admin;
