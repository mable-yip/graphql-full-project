import React, { useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

interface props {
    authenticationPath: string;
}
  
const PrivateRoute = ({ authenticationPath, ...routeProps}: props & RouteProps) => {
    const [loading, setLoading] = useState<Boolean>(true)
    const accessToken = localStorage.getItem('profile')
    
    
    if(!accessToken) {
      console.log("1")
      return <Redirect to={{ pathname: authenticationPath }} />;
    } else {
      console.log("2")
      return <Route {...routeProps} />;
    }
  };
export default PrivateRoute;