import React, {useState, useEffect, Component} from 'react';

/*

This file is responsible for keeping a user session while a user is signed in.  Thus, it is referenced many times in other files
When a user logs in or signs up, this starts a session and the variables in this class have getter and setter methods and
are stored in local storage to ensure that a user stays logged in until they log out at which point their session ends and 
values are reset back to their defaults in this class (default values are defined by what values each variable is initially given in this file)

Each variable is accessed only through getter methods and set via setter methods, primarily with the use of local storage such that
we may retain a session for the duration a user desires

There are 4 types of methods possible for each variable:

1.  A 1 argument void setVariable(newValue) method, which sets the desired variable to the given value.  

2.  A no argument non-void getVariable() method, which while not available for all variables, helps give a bit more functionality.  These methods
    get a variable as it is now during this program in this file.  

3.  A no argument void setLocalStorageVariable() method, which from other files is called after the setVariable(newValue) method of the same variable,
    which sets the value of the set variable in local storage.  

4.  A no argument non-void getLocalStorageVariable() method, which from other files is called to check the value of a variable in local storage.  
    

This is what allows for states, because setVariable(newValue) sets a value of a variable and then setLocalStorgaeVariable() sets this newValue to the 
variable in local storage.  Then, getLocalStorageVariable() allows one to retrieve this value and use it from local storage.  


There are 6 exceptions to this scheme of methods in this file and they are all marked below to denote a difference, where their scheme is described.  

*/


var UserProfile = (function() {
    var full_name = ""; //session var for name

    var full_email=null; //session var for email

    var  loggedInWithGoogle=false; //session var for logged in with google or not

    var loggedIn=false; //sessioon var for logged in or not

    var birthday=""; //session var for dob

    var birthplace=""; //sessin var for pob

    var loggedInWithoutGoogle=""; //session var for logged In without google

    var birthtime=""; //session var for birthtime

    var abc=""; //session var related to whether a user is logged in and if so, with admin or not

    var tempEmail=''; //session var to determine a user's email when signing up with google so their email doesn't get lost on page refresh

    var tempName='';//session var to determine a user's name when signing up with google so their name doesn't get lost on page refresh

    var House='';  //session var to store a user's house sign 

    var subscribed=true; //session var to determine if a user is subscribed or not


    
    var getName = function() {
      return full_name;    
    };

    
    var setHouse=function(h){
        House=h;
    }
    
    var setName = function(name) {
      full_name = name;     
    };

    var getEmail = function() {
        return full_email;   
      };
    
      var setEmail = function(email) {
        full_email = email;     
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


            var setSubscribed=function(subs){
                subscribed=subs;
            }
            
            var setLocalStorageSubscribed=()=>{
                localStorage.setItem('abcdefgh', subscribed);
               }
               
                var getLocalStorageSubscribed=()=>{
                    return localStorage.getItem('abcdefgh');
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


        //this method is a bit different, but it carries the same meaning as a setLoggedInWithGoogle(true) method call would.  
      var loggingInWithGoogle=function(){
          loggedInWithGoogle=true;
          loggedIn=true;
          loggedInWithoutGoogle=false;
      }
       //this method is a bit different, but it carries the same meaning as a setLoggedInWithGoogle(false) method call would.  
      var loggingInWithoutGoogle=function(){
          loggedIn=true;
          loggedInWithGoogle=false;
          loggedInWithoutGoogle=true;
      }
       //this method is basically a reset for all the variables local to this file (while it does not reset everything in local storage, it resets many values from only this class) 
      var loggingOut=function(){
          full_email=null;
          full_name="";
          loggedIn=false;
          loggedInWithGoogle=false;
          loggedInWithoutGoogle=false;
          birthday="";
          birthplace="";
      }

      //the following 3 methods are all booleans that return if a user is loggedIn, if a user is loggedInWithGoogle, and if a user is loggedInWithout google login, 
      //respectively

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
        return birthday;    
      };
    
      var setBirthday = function(bday) {
        birthday = bday;     
      };
  
      var getBirthplace = function() {
          return birthplace;    
        };
      
        var setBirthplace = function(bplace) {
          birthplace=bplace;     
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
      setHouse:setHouse,
      setSubscribed:setSubscribed,
      getLocalStorageSubscribed:getLocalStorageSubscribed,
      setLocalStorageSubscribed:setLocalStorageSubscribed
    }
  
  })();
  
  export default UserProfile;
