import React, {useState, useEffect, Component} from 'react';

var UserProfile = (function() {
    var full_name = "";
    var full_email=null;
    var  loggedInWithGoogle=false;
    var loggedIn=false;
    var birthday="";
    var birthplace="";
    var loggedInWithoutGoogle="";
    var birthtime="";
    var abc="";
    var tempEmail='';
    var tempName='';
    var House='';

    var getName = function() {
      return full_name;    // Or pull this from cookie/localStorage
    };
    var setHouse=function(h){
        House=h;
    }
  
    var setName = function(name) {
      full_name = name;     
      // Also set this in cookie/localStorage
    };

    var getEmail = function() {
        return full_email;    // Or pull this from cookie/localStorage
      };
    
      var setEmail = function(email) {
        full_email = email;     
        // Also set this in cookie/localStorage
      };
var setTempEmail=function(tem){
    tempEmail=tem;
};

var setTempName=function(nam){
    tempName=nam;
};


      var setLocalStorageName=()=>{
 localStorage.setItem('stuff', full_name);
}

 var getLocalStorageName=()=>{
     return localStorage.getItem('stuff');
 }


 var setLocalStorageHouse=()=>{
    localStorage.setItem('stuffirk', House);
   }
   
    var getLocalStorageHouse=()=>{
        return localStorage.getItem('stuffirk');
    }


 var getPage=()=>{
     return localStorage.getItem('ste');
 }

 var setPage=(st)=>{
     return localStorage.setItem('ste', st);
 }

 var setLocalStorageEmail=()=>{
    localStorage.setItem('stuffs', full_email);
   }
   
    var getLocalStorageEmail=()=>{
        return localStorage.getItem('stuffs');
    }



    var setLocalStorageisLoggedIn=()=>{
        localStorage.setItem('stuffe', loggedIn);
       }
       
        var getLocalStorageisLoggedIn=()=>{
            return (((localStorage.getItem('stuffe'))==='true'));
        }



        var setLocalStorageisLoggedInWithGoogle=()=>{
            localStorage.setItem('stuffer', loggedInWithGoogle);
            setLocalStorageisLoggedIn();
           }



           
        var setLocalStorageTempName=()=>{
            localStorage.setItem('tempPass', tempName);
           }
           
           var getLocalStorageTempName=()=>{
            return localStorage.getItem('tempPass');
        }


        var setLocalStorageTempEmail=()=>{
            localStorage.setItem('tempPass2', tempEmail);
           }
           
           var getLocalStorageTempEmail=()=>{
            return localStorage.getItem('tempPass2');
        }
           
            var getLocalStorageisLoggedInWithGoogle=()=>{
                return (((localStorage.getItem('stuffer'))==='true'));
            }



            
        var setLocalStorageisLoggedInWithoutGoogle=()=>{
            localStorage.setItem('stuffers', loggedInWithoutGoogle);
            setLocalStorageisLoggedIn();
        }
           
            var getLocalStorageisLoggedInWithoutGoogle=()=>{
                return (((localStorage.getItem('stuffers'))==='true'));
            }




            
        var setLocalStorageBPlace=()=>{
            localStorage.setItem('stuffersa', birthplace);
           }
           
            var getLocalStorageBPlace=()=>{
                return localStorage.getItem('stuffersa');
            }



            
        var setLocalStorageBDay=()=>{
            localStorage.setItem('stufferso', birthday);
           }
           
            var getLocalStorageBDay=()=>{
                return localStorage.getItem('stufferso');
            }


        var setLocalStorageBTime=()=>{
            localStorage.setItem('stufferslol', birthtime);
           }
           
            var getLocalStorageBTime=()=>{
                return localStorage.getItem('stufferslol');
            }

            var setBirthTime=(btime)=>{
                birthtime=btime;
            }
            var getBirthTime=()=>{
                return birthtime;
            }


      var loggingInWithGoogle=function(){
          loggedInWithGoogle=true;
          loggedIn=true;
          loggedInWithoutGoogle=false;
      }
      var loggingInWithoutGoogle=function(){
          loggedIn=true;
          loggedInWithGoogle=false;
          loggedInWithoutGoogle=true;
      }
      var loggingOut=function(){
          full_email=null;
          full_name="";
          loggedIn=false;
          loggedInWithGoogle=false;
          loggedInWithoutGoogle=false;
          birthday="";
          birthplace="";
      }
      var isLoggedIn=function(){
          return loggedIn;
      }
      var isLoggedInWithGoogle=function(){
          return loggedInWithGoogle;
      }
      var isLoggedInWithoutGoogle=function(){
        return loggedInWithoutGoogle;
    }
      var getBirthday = function() {
        return birthday;    // Or pull this from cookie/localStorage
      };
    
      var setBirthday = function(bday) {
        birthday = bday;     
        // Also set this in cookie/localStorage
      };
  
      var getBirthplace = function() {
          return birthplace;    // Or pull this from cookie/localStorage
        };
      
        var setBirthplace = function(bplace) {
          birthplace=bplace;     
          // Also set this in cookie/localStorage
        };
  
    return {
      getName: getName,
      setName: setName, 
      getEmail: getEmail,
      setEmail: setEmail,
      isLoggedIn: isLoggedIn,
      isLoggedInWithGoogle: isLoggedInWithGoogle,
      getBirthday: getBirthday,
      getBirthplace:getBirthplace,
      setBirthday:setBirthday, 
      setBirthplace:setBirthplace,
      loggingInWithGoogle:loggingInWithGoogle,
      loggingInWithoutGoogle:loggingInWithoutGoogle, 
      loggingOut:loggingOut,
      isLoggedInWithoutGoogle: isLoggedInWithoutGoogle,
      setLocalStorageName:setLocalStorageName,
      getLocalStorageName: getLocalStorageName,
      getLocalStorageBDay:getLocalStorageBDay, 
      setLocalStorageBDay:setLocalStorageBDay,
      getLocalStorageBPlace: getLocalStorageBPlace,
      setLocalStorageBPlace: setLocalStorageBPlace,
      getLocalStorageisLoggedIn:getLocalStorageisLoggedIn,
      setLocalStorageisLoggedIn:setLocalStorageisLoggedIn,
      getLocalStorageisLoggedInWithGoogle:getLocalStorageisLoggedInWithGoogle,
      setLocalStorageisLoggedInWithGoogle: setLocalStorageisLoggedInWithGoogle,
      getLocalStorageisLoggedInWithoutGoogle:getLocalStorageisLoggedInWithoutGoogle,
      setLocalStorageisLoggedInWithoutGoogle:setLocalStorageisLoggedInWithoutGoogle,
      getLocalStorageEmail: getLocalStorageEmail,
      setLocalStorageEmail:setLocalStorageEmail,
      getBirthTime:getBirthTime,
      setBirthTime: setBirthTime,
      getLocalStorageBTime:getLocalStorageBTime,
      setLocalStorageBTime:setLocalStorageBTime,
      loggedIn:loggedIn,
      getPage:getPage,
      setPage:setPage,
      setTempEmail:setTempEmail,
      setTempName:setTempName,
      setLocalStorageTempEmail:setLocalStorageTempEmail,
      setLocalStorageTempName:setLocalStorageTempName,
      getLocalStorageTempEmail:getLocalStorageTempEmail,
      getLocalStorageTempName:getLocalStorageTempName,
      getLocalStorageHouse:getLocalStorageHouse,
      setLocalStorageHouse:setLocalStorageHouse,
      setHouse:setHouse
    }
  
  })();
  
  export default UserProfile;
