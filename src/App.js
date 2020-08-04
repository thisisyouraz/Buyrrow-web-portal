import React from 'react';
import Layout from './Layout';
import { Login } from './pages';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={'/'} component={Layout}/>
        <Route path={'/dashboard'} component={Layout}/>
        <Route path={'/login'} component={Login}/>
      </Switch>
    </Router>
  );
}

export default App; 
