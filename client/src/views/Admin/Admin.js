import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import UserProfile from '../SignUp/UserState';

const Admin = () =>{
<<<<<<< Updated upstream
    if(UserProfile.getLocalStorageEmail()!=='admin')
=======

  if(UserProfile.getLocalStorageEmail()==='admin'){
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
    if(UserProfile.getLocalStorageEmail()!=='Admin@admin.com')
>>>>>>> Stashed changes
    return(<Redirect to="/Home"/>);
    const dispSunSign = (clicked) =>
    {
        console.log(clicked.target.id)
    }
    const dispMoonPhase = (clicked) =>
    {
        console.log(clicked.target.id)
    }
    const dispHouses = (clicked) =>
    {
        console.log(clicked.target.id)
    }
    return(
<div>
    <DropdownButton id="dropdown-basic-button" title="Sun Signs">
        <div>
            <Dropdown.Item as="button" id="Aquarius" onClick={(e)=>dispSunSign(e)}>Aquarius</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="Aries" onClick={(e)=>dispSunSign(e)}>Aries</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="Taurus" onClick={(e)=>dispSunSign(e)}>Taurus</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="Gemini" onClick={(e)=>dispSunSign(e)}>Gemini</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="Cancer" onClick={(e)=>dispSunSign(e)}>Cancer</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="Leo" onClick={(e)=>dispSunSign(e)}>Leo</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="Virgo" onClick={(e)=>dispSunSign(e)}>Virgo</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="Libra" onClick={(e)=>dispSunSign(e)}>Libra</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="Scorpio" onClick={(e)=>dispSunSign(e)}>Scorpio</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="Sagittarius" onClick={(e)=>dispSunSign(e)}>Sagitarrius</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="Capricorn" onClick={(e)=>dispSunSign(e)}>Capricon</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="Pisces" onClick={(e)=>dispSunSign(e)}>Pisces</Dropdown.Item>
        </div>

    </DropdownButton>

    <DropdownButton id="dropdown-basic-button" title="Lunar Phase">
        <div>
            <Dropdown.Item as="button" id="New Moon" onClick={(e)=>dispMoonPhase(e)}>New Moon</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="Waxing Crescent" onClick={(e)=>dispMoonPhase(e)}>Waxing Crescent</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="First Quarter" onClick={(e)=>dispMoonPhase(e)}>First Quarter</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="Waxing Gibbous" onClick={(e)=>dispMoonPhase(e)}>Waxing Gibbous</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="Full Moon" onClick={(e)=>dispMoonPhase(e)}>Full Moon</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="Waning Gibbous" onClick={(e)=>dispMoonPhase(e)}>Waning Gibbous</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="Last Quarter" onClick={(e)=>dispMoonPhase(e)}>Last Quarter</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="Waning Crescent" onClick={(e)=>dispMoonPhase(e)}>Waning Crescent</Dropdown.Item>
        </div>
    </DropdownButton>
    <DropdownButton id="dropdown-basic-button" title="Houses">
        <div>
            <Dropdown.Item as="button" id="1st" onClick={(e)=>dispHouses(e)}>1st</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="2nd" onClick={(e)=>dispHouses(e)}>2nd</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="3rd" onClick={(e)=>dispHouses(e)}>3rd</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="4th" onClick={(e)=>dispHouses(e)}>4th</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="5th" onClick={(e)=>dispHouses(e)}>5th</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="6th" onClick={(e)=>dispHouses(e)}>6th</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="7th" onClick={(e)=>dispHouses(e)}>7th</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="8th" onClick={(e)=>dispHouses(e)}>8th</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="9th" onClick={(e)=>dispHouses(e)}>9th</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="10th" onClick={(e)=>dispHouses(e)}>10yj</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="11th" onClick={(e)=>dispHouses(e)}>11th</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="12th" onClick={(e)=>dispHouses(e)}>12th</Dropdown.Item>
        </div>
    </DropdownButton>
    </div>
);

}
export default Admin;
