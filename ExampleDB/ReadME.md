# MoonFlow

Welcome to the Moonflow web app. 
This web app allows users to sign up for an astrology service wherein users will receive personalized interpretations based on their astrological ascendant and the current moon phase. 

## Information

This web app was created using the MERN stack. It features a home page which prompts a sign in or sign up for users. New users may choose to sign up by filling in the required information which will create a new user with authentication. New users will then receive their calculated sign and house information on the user page. Returning users may login to go to the same user page with their information. Admins may login with the specified admin login details which will redirect them to the admin page. This page will allow the admin to update interpretations based on sign, moon phase, and house and send these interpretations to users via email. 

### Getting Started

Setup the connection based on the environments below.
- local development: create a config file (make sure to name it config.js) in the config folder, which exports your db.uri connection. An example is provided, config/config.example.js. This file will be ignored by git so your db credentials will be kept safe when the app is deployed.
- production: Since the config file is not pushed when you deploy your app, you must specifiy your db uri in heorku. Set the uri in heroku as specified in [this](https://devcenter.heroku.com/articl

### Features

Features include:

  •Horoscope Database:  Database of different horoscopes based on the combination of sun sign, lunar phase, and house that can be viewed and updated via an admin page. The database currently saves every combination of moon phase, house, and sign which will be accessed by the email sender and updated by the admin page
  
  •Axios: Fully functional CRUD capabilities that connect the front end of the website to the back end where the router and database exist. This allows creation and access to user information, horoscope data in order to push out information to your users.

  •UX/UI: A completely styled frontend with a consistent look across all pages for the user experience that provides an easy and clear user interaction
  
   -A consistent color palette and background implemented on each page the users and administrator visit
     
   -A moon and cloud mouse parallax displayed on the home page using the React Spring library
     
   -The login and sign up page forms are simple and easy to follow along with the ability to sign in or sign up with Google
   
  •Admin Page: Fully functional and dynamic page to handle the administrator’s interactions with saving their horoscope interpretations to the database
  
   -Viewing interpretations: Whenever a button is pressed to change the horoscope combination a GET request is sent asynchronously to the server using Axios. If the horoscope is valid, the interpretation state variable is updated to match the returned description. 
     
   -Editing interpretations: Whenever the submit button is pressed an update is called on the current horoscope combination. If the update fails, it is because that combination does not exist, so a new horoscope object is made and added to the database. Eventually, this will no longer create horoscope objects because all valid combinations have been made.
     

  •User Page: A dynamic web page for the individual user information to be displayed
   
   -Uses an Axios GET call to receive the user information in order to display their individual data to the page.

   •User Authentication: Allowing users access to only the account to which they are logged in by allowing users (and admin) to log in and sign up with their choice of google login or standard login.  
   
   -Sign up: Users are directed to sign up for the email list to get individual horoscopes, and access to a personalized user page
   
   A.Standard Sign In: Users input information about themselves and sign up with username and password which go to the database
		
   B.Google Sign In: Users have a username and password verified by Google’s API, and this web app uses its user profile information to help construct a user by getting user name, e-mail upon sign-up.

   -Log In: User login allows returning users to visit the user information page
   
   A.Standard Login: User inputs the username and password
		
   B.Google Login: The database finds a corresponding e-mail to the one authenticated by Google to verify users. 
		
•Upon login, the user credentials are fetched via Axios from the database to authenticate the user and get their personal information to display on their user page.  Upon successful authentication, a user session begins that allows a user to remain authenticated until they log out or close the page.  

•Page Authentication: Users cannot go to user/admin pages without login. By keeping user sessions and user information, a user without the correct login credentials is restricted from pages by being rerouted back to home.


### API's Used

Material-UI – Used for react styling and buttons

React-Spring – Used for moon and cloud parallax displayed on the home page

Google Sign-in – Used as an alternative way for users to sign up/in

