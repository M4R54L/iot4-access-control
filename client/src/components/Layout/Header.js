import React from 'react';
import classes from './Header.module.scss';

function Header(props) {
  return (
    <div className={classes.container}>
      <h2>{props.title}</h2>
    </div>
  );
}

export default Header;
