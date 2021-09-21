import React from 'react';
import classes from './Button.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSave,
  faSignOutAlt,
  faTrash,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

function TabBarButton(props) {
  let icon;
  let buttonType = '';

  switch (props.buttonType) {
    case 'save':
      icon = faSave;
      buttonType = 'submit';
      break;
    case 'delete':
      icon = faTrash;
      buttonType = 'button';
      break;
    case 'cancel':
      icon = faSignOutAlt;
      buttonType = 'button';
      break;
    case 'new':
      icon = faPlus;
      buttonType = 'button';
      break;

    default:
      buttonType = 'button';
      break;
  }

  return (
    <button
      className={`${classes.button} ${classes[props.buttonType]}`}
      onClick={props.onClickHandler}
      type={buttonType}
    >
      <FontAwesomeIcon icon={icon} size="1x" />
      <p>{props.title}</p>
    </button>
  );
}

export default TabBarButton;
