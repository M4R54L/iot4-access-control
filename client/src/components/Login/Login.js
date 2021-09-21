import React from 'react';
import classes from './Login.module.scss';

function Login() {
  return (
    <div className={classes.main}>
      <div className={classes.loginTitle}>
        <p>IOT-4</p>
        <p>MES</p>
      </div>
      <div className={classes.controls}>
        <form className={classes.form}>
          <h1>Ingreso</h1>
          <div className={classes.formGroup}>
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              name=""
              id="username"
              placeholder="Ingrese su usuario"
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="username">Contraseña</label>
            <input
              type="password"
              name=""
              id="username"
              placeholder="Ingrese su contraseña"
            />
          </div>
          <input type="submit" value="Ingresar" />
        </form>
      </div>
    </div>
  );
}

export default Login;
