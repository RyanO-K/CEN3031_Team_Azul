import React, {useState, useEffect} from 'react';
import {textareaAutosize, FilledInput, FormControl, FormHelperText, Input, InputAdornment, InputBase, InputLabel, OutlinedInput, TextField} from '@material-ui/core'
import { Route, Switch, Redirect  } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import UserProfile from '../SignUp/UserState';
import axiosPath from '../../axiosRequests'

const Admin = () =>{

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

    const getInterpretation = async (moonphase, house, sign) => {
        let result = await axiosPath.makeGetRequest('horoscopeInfo/search/?moonphase='+moonphase+'&house='+house+'&sign='+sign);
        return result
      };

    const createInterpretation = async (moonphase, house, sign, description) => {
        
       let result = await axiosPath.makeCreateRequest('horoscopeInfo/',{
        "house": house,
        "sign": sign,
        "moonphase": moonphase,
        "description": description
    });
       return result
    };




    if(UserProfile.getLocalStorageEmail()!=='admin')
    return(<Redirect to="/Home"/>);

    const dispSunSign = async (clicked) =>
    {
        const newSign = clicked.target.id;
        try{
            let result = await getInterpretation(data.moon,data.house,newSign,data.interpretation);
            setData({...data, sun: newSign, interpretation: result.description})
            console.log(result)
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
            console.log(result)
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
            console.log(result)
        }catch(err){
            setData({...data, house: newHouse, interpretation: ""})
        }

        
        
    }
    return(
<div>
    <DropdownButton  id="dropdown-basic-button" title="Sun Signs">
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
            <Dropdown.Item as="button" id="NewMoon" onClick={(e)=>dispMoonPhase(e)}>New Moon</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="WaxingCrescent" onClick={(e)=>dispMoonPhase(e)}>Waxing Crescent</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="FirstQuarter" onClick={(e)=>dispMoonPhase(e)}>First Quarter</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="WaxingGibbous" onClick={(e)=>dispMoonPhase(e)}>Waxing Gibbous</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="FullMoon" onClick={(e)=>dispMoonPhase(e)}>Full Moon</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="WaningGibbous" onClick={(e)=>dispMoonPhase(e)}>Waning Gibbous</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="LastQuarter" onClick={(e)=>dispMoonPhase(e)}>Last Quarter</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="WaningCrescent" onClick={(e)=>dispMoonPhase(e)}>Waning Crescent</Dropdown.Item>
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
            <Dropdown.Item as="button" id="10th" onClick={(e)=>dispHouses(e)}>10th</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="11th" onClick={(e)=>dispHouses(e)}>11th</Dropdown.Item>
        </div>
        <div>
            <Dropdown.Item as="button" id="12th" onClick={(e)=>dispHouses(e)}>12th</Dropdown.Item>
        </div>
    </DropdownButton>
    <div>
        <div>sun: {data.sun}</div>
        <div>moon: {data.moon}</div>
        <div>house: {data.house}</div>
        <div>interpretation: {data.interpretation}</div>
        <form onSubmit={handleSubmit}> 
            <div>
                <TextField
                    id="standard-multiline-static"
                    onChange={handleChange}
                    label="Interpretation"
                    multiline
                    rows="4"
                />
            </div>
            <input type="submit" value="Submit"/>
        </form>
    </div>
    </div>   
);

}
export default Admin;
