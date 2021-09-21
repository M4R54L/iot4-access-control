import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Rol.module.scss';

import EditRol from './EditRol';
import RolList from './RolList';
import NoRegistries from '../Layout/NoRegistries';
import Header from '../Layout/Header';

import rolThunks from '../../store/rol/rol.thunks';
import { rolActions } from '../../store/rol/rol.slice';

function Rol() {
  const dispatch = useDispatch();
  const editRol = useSelector((state) => state.rol.edit);
  let roles = useSelector((state) => state.rol.roles);

  useEffect(() => {
    dispatch(rolThunks.getRoles());
  }, [dispatch]);

  const onClickHandler = () => {
    dispatch(rolActions.editRol(true));
  };

  return (
    <div className={classes.container}>
      <Header title="Roles" />
      {editRol ? (
        <EditRol />
      ) : (
        <Fragment>
          {roles.length > 0 ? (
            <RolList roles={roles} />
          ) : (
            <NoRegistries
              title="Crea tu primer rol"
              onClickHandler={onClickHandler}
            />
          )}
        </Fragment>
      )}
    </div>
  );
}

export default Rol;
