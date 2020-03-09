import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound";
import NavBar from "./components/Header/NavBar";
import SignUp from "./views/SignUp/SignUp";
import SignUp2 from "./views/SignUp/SignUp2";
import Admin from "./views/Admin/Admin"
import axios_get from './axios_route.js';

const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route exact path="/LogIn" component={Home} />
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/SignUp2" component={SignUp2} />
        <Route exact path="Admin" component={Admin} />
        <Route component={NotFound}/>
      </Switch>
    </div>
  );
}

//axios_get("5e5842db3979b444104c1bba");
export default App;
