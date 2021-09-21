import React from 'react';
import classes from './RolItem.module.scss';

const RolItem = (props) => {
  const onClickHandler = () => {
    props.onClickHandler(props.id);
  };

  return (
    <li className={classes.item} onClick={onClickHandler}>
      {props.name}
    </li>
  );
};

export default RolItem;
