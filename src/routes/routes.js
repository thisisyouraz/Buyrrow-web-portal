import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { DashBoard, Approval } from '../pages'


const Routes = () => {
  return ( 
    <Switch>
      <Route exact path={'/'} component={DashBoard}/>
      <Route exact path={`/dashboard/ad/:id`} component={DashBoard}/>
      <Route exact path={`/dashboard`} component={DashBoard}/>
      <Route path={`/dashboard/approval`} component={Approval}/>
    </Switch>
  );
}
 
export default Routes;