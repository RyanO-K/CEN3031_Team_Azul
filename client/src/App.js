import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound";
import NavBar from "./components/Header/NavBar";
import SignUp from "./views/SignUp/SignUp";

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
        <Route component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
