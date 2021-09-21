import React from 'react';

import classes from './NoRegistries.module.scss';

import Tabbar from '../Layout/TabBar/TabBar';
import RoundButton from '../Layout/TabBar/RoundButton';

const NoRegistries = (props) => {
  return (
    <div className={classes.container}>
      <h1>{props.title}</h1>
      <Tabbar>
        <RoundButton onClickHandler={props.onClickHandler} />
      </Tabbar>
    </div>
  );
};

export default NoRegistries;
