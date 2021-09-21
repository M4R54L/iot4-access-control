import React from 'react';
import classes from './RoundButton.module.scss';

function CentralButton(props) {
  return (
    <div className={classes.button} onClick={props.onClickHandler}>
      +
    </div>
  );
}

export default CentralButton;
