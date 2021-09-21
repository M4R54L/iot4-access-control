import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import classes from './EditUser.module.scss';
import generalClasses from '../../style/generalStyle.module.scss';

import TabBar from '../Layout/TabBar/TabBar';
import TabBarButton from '../Layout/TabBar/Button';

import { userActions } from '../../store/user/user.slice';
import userThunks from '../../store/user/userThunk';

const userSchema = joi.object({
  username: joi.string().required().min(3).max(20),
  password: joi.string().required().min(5).max(10),
  code: joi.string().required().min(3).max(10),
  firstName: joi.string().required().min(3).max(20),
  lastName: joi.string().required().min(3).max(20),
  email: joi.string().required().email({ tlds: false }),
  rol: joi.string().required(),
});

function EditUser() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);
  let errorMessage = useSelector((state) => state.user.error);
  const [userData, setUserData] = useState({});
  const user = useSelector((state) => state.user.user);
  //const [userName, setUserName] = useState('');
  // console.log(user);

  const { register, handleSubmit, getValues } = useForm({
    mode: 'onTouched',
    resolver: joiResolver,
  });

  useEffect(() => {
    if (userId) {
      dispatch(userThunks.getOne(userId));
    }
  }, []);

  useEffect(() => {
    // setUserData(user);
  }, [user]);

  console.log(user);

  const onDeleteHandler = (evt) => {
    evt.preventDefault();
    const deleteRol = window.confirm(
      `¿Desea eliminar el usuario ${user.username}?`
    );

    if (deleteRol) {
      //   dispatch(rolThunks.deleteRol(userId));
      //   dispatch(rolActions.editRol({ edit: false, id: '' }));
    }
  };

  const onCancelHandler = (evt) => {
    evt.preventDefault();
    dispatch(userActions.editUser({ editUser: false, id: '' }));
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();
    const values = getValues();
    console.log(values);
    const saveUser = window.confirm(
      `¿Desea guardar el usuario ${user.username}?`
    );

    if (!saveUser) return;

    // if (userId) dispatch(rolThunks.updateRol(userId, { name: userName }));
    // else dispatch(rolThunks.saveRol({ name: userName }));
  };

  const onChangeHandler = (evt) => {
    evt.preventDefault();
    const value = evt.target.value;
    // userData.username = value;
    // const User = { ...user };
    // User.username = value;
    // setUserData(User);
  };

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    <form onSubmit={onSubmit}>
      <input type="submit" value="Enviar" />
      <div className={classes.formGroup}>
        <label htmlFor="firstName">Nombre</label>
        <input
          type="text"
          name=""
          id="firstName"
          placeholder="nombre"
          value={user.firstName}
          onChange={onChangeHandler}
          autoFocus
          {...register('username')}
        />
        {errorMessage && (
          <p className={generalClasses.errorMessage}>{errorMessage}</p>
        )}
        <TabBar>
          <TabBarButton
            onClickHandler={onCancelHandler}
            title="Cancelar"
            buttonType={'cancel'}
          />
          {userId && (
            <TabBarButton
              onClickHandler={onDeleteHandler}
              title="Eliminar"
              buttonType={'delete'}
            />
          )}
          <TabBarButton title="Guardar" buttonType={'save'} />
        </TabBar>
      </div>
    </form>
  );
}

export default EditUser;
