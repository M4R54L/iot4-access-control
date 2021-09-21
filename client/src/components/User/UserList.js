import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './UserList.module.scss';

import userThunks from '../../store/user/userThunk';
import { userActions } from '../../store/user/user.slice';

import UserItem from './UserItem';
import Tabbar from '../Layout/TabBar/TabBar';
import RoundButton from '../Layout/TabBar/RoundButton';

function UserList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userThunks.getAll());
  }, []);

  const users = useSelector((state) => state.user.users);

  //   console.log({ users });

  const editUserHandler = (id) => {
    dispatch(userActions.editUser({ editUser: true, userId: id }));
  };

  const newUserHandler = () => {
    dispatch(userActions.editUser({ editUser: true, userId: '' }));
  };

  const renderUsers = () => {
    return users.map((el) => (
      <UserItem
        key={el._id}
        id={el._id}
        firstName={el.firstName}
        lastName={el.lastName}
        rol={el.rol.name}
        onClickHandler={editUserHandler}
      />
    ));
  };

  return (
    <React.Fragment>
      <ul className={classes.itemList}>
        {users ? renderUsers() : <h1>No hay usuarios para mostrar</h1>}
      </ul>
      <Tabbar>
        <RoundButton onClickHandler={newUserHandler} />
      </Tabbar>
    </React.Fragment>
  );
}

export default UserList;
