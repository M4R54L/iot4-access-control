import React from 'react';

import classes from './UserItem.module.scss';

function UserItem(props) {
  const onClickHandler = () => {
    props.onClickHandler(props.id);
  };

  return (
    <li className={classes.item} onClick={onClickHandler}>
      <p className={classes.fullName}>
        {props.firstName} {props.lastName}
      </p>
      <p className={classes.rol}>{props.rol}</p>
    </li>
  );
}

export default UserItem;
