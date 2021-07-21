import React from "react";
import { Redirect, Route, Switch } from "react-router";
import ManagerUser from "./admin/ManageUser";
import LoginPage from "./login/LoginPage";
import PrivateRoute from "./route/privateRoute";

const App = () => {
  return (
    <Switch>
    <Route exact path="/login"> <LoginPage /></Route>
    <>
      {/* { auth.signIn &&<Sidebar />}
      { auth.signIn && <NavBarComponent/> } */}
      <div className="appBody">
        {/* { auth.signIn && <Breadcrumbs/>} */}
        <PrivateRoute path="/admin" component={ManagerUser} authenticationPath='/login' exact />
        {/* <PrivateRoute path="/student" component={StudentHomePage} authenticationPath='/login' exact />
        <PrivateRoute path="/teacher/classes" component={ManageClass} authenticationPath='/login' exact />
        <PrivateRoute path="/teacher/classes/new-class" component={ClassForm} authenticationPath='/login' exact />
        <PrivateRoute path="/teacher/classes/:classId" component={ClassForm} authenticationPath='/login' exact />
        <PrivateRoute path="/teacher/calendar" component={Calendar} authenticationPath='/login' exact /> */}
        
      </div>
    </>
    <Redirect to="/login"/>
  </Switch> 
  );
}

export default App;
