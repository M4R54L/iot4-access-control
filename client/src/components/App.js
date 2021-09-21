import React from 'react';
// import Login from './Login/Login';
import Rol from './Rol/Rol';
import classes from './App.module.scss';

import User from './User/User';

function App() {
  return (
    <div className={classes.container}>
      {/* <Login /> */}
      {/* <Rol /> */}
      <User />
    </div>
  );
}

export default App;
