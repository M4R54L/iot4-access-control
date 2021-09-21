import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Tabbar from '../Layout/TabBar/TabBar';
import RoundButton from '../Layout/TabBar/RoundButton';
import RolItem from './RolItem';

import classes from './RolList.module.scss';

import { rolActions } from '../../store/rol/rol.slice';
import rolThunks from '../../store/rol/rol.thunks';

function RolList() {
  const dispatch = useDispatch();
  let roles = [];

  useEffect(() => {
    dispatch(rolThunks.getRoles());
  }, [dispatch]);

  roles = useSelector((state) => state.rol.roles);

  const newRolHandler = () => {
    dispatch(rolActions.editRol({ editRol: true, rolId: '' }));
  };

  const editRolHandler = (id) => {
    dispatch(rolActions.editRol({ editRol: true, rolId: id }));
  };

  const renderRoles = () => {
    return roles.map((el) => {
      return (
        <RolItem
          key={el.name}
          name={el.name}
          id={el._id}
          onClickHandler={editRolHandler}
        />
      );
    });
  };

  return (
    <React.Fragment>
      <ul className={classes.itemList}>
        {roles ? renderRoles() : <h1>No hay roles para mostrar</h1>}
      </ul>
      <Tabbar>
        <RoundButton onClickHandler={newRolHandler} />
      </Tabbar>
    </React.Fragment>
  );
}

export default RolList;
