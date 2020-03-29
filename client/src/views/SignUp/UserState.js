const writeJsonFile = require('write-json-file');

var UserProfile = (function() {
    var full_name = "";
    var full_email="";
    var  loggedInWithGoogle=false;
    var loggedIn=false;
    var birthday="";
    var birthplace="";
    var loggedInWithoutGoogle="";

    var getName = function() {
      return full_name;    // Or pull this from cookie/localStorage
    };
  
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


      var setLocalStorageName=()=>{
 sessionStorage.setItem('stuff', full_name);
}

 var getLocalStorageName=()=>{
     return sessionStorage.getItem('stuff');
 }



 var setLocalStorageEmail=()=>{
    sessionStorage.setItem('stuffs', full_email);
   }
   
    var getLocalStorageEmail=()=>{
        return sessionStorage.getItem('stuffs');
    }



    var setLocalStorageisLoggedIn=()=>{
        sessionStorage.setItem('stuffe', loggedIn);
       }
       
        var getLocalStorageisLoggedIn=()=>{
            return (((sessionStorage.getItem('stuffe'))==='true'));
        }



        var setLocalStorageisLoggedInWithGoogle=()=>{
            sessionStorage.setItem('stuffer', loggedInWithGoogle);
            setLocalStorageisLoggedIn();
           }
           
            var getLocalStorageisLoggedInWithGoogle=()=>{
                return (((sessionStorage.getItem('stuffer'))==='true'));
            }



            
        var setLocalStorageisLoggedInWithoutGoogle=()=>{
            sessionStorage.setItem('stuffers', loggedInWithoutGoogle);
            setLocalStorageisLoggedIn();
        }
           
            var getLocalStorageisLoggedInWithoutGoogle=()=>{
                return (((sessionStorage.getItem('stuffers'))==='true'));
            }




            
        var setLocalStorageBPlace=()=>{
            sessionStorage.setItem('stuffersa', birthplace);
           }
           
            var getLocalStorageBPlace=()=>{
                return sessionStorage.getItem('stuffersa');
            }



            
        var setLocalStorageBDay=()=>{
            sessionStorage.setItem('stufferso', birthday);
           }
           
            var getLocalStorageBDay=()=>{
                return sessionStorage.getItem('stufferso');
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
          full_email="";
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
      setLocalStorageEmail:setLocalStorageEmail
    }
  
  })();
  
  export default UserProfile;
