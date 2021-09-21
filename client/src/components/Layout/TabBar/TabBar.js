import React from 'react';
import classes from './TabBar.module.scss';

function Tabbar(props) {
  return <div className={classes.container}>{props.children}</div>;
}

export default Tabbar;
