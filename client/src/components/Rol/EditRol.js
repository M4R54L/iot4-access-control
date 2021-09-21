import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './EditRol.module.scss';
import generalClasses from '../../style/generalStyle.module.scss';

import TabBar from '../Layout/TabBar/TabBar';
import TabBarButton from '../Layout/TabBar/Button';

import { rolActions } from '../../store/rol/rol.slice';
import rolThunks from '../../store/rol/rol.thunks';

function NewRol() {
  const dispatch = useDispatch();
  const rolId = useSelector((state) => state.rol.rolId);
  const name = useSelector((state) => state.rol.rolName);
  let errorMessage = useSelector((state) => state.rol.error);
  const [rolName, setRolName] = useState('');

  useEffect(() => {
    if (rolId) {
      dispatch(rolThunks.getOneRol(rolId));
      setRolName(name);
    }
  }, [name, rolId, dispatch]);

  const onDeleteHandler = (evt) => {
    evt.preventDefault();
    const deleteRol = window.confirm(`¿Desea eliminar el rol ${rolName}?`);

    if (deleteRol) {
      dispatch(rolThunks.deleteRol(rolId));
      dispatch(rolActions.editRol({ edit: false, id: '' }));
    }
  };

  const onCancelHandler = (evt) => {
    evt.preventDefault();
    dispatch(rolActions.editRol({ edit: false, id: '' }));
  };

  const submitHandler = async (evt) => {
    evt.preventDefault();
    if (!rolName) {
      alert('El nombre está vacío');
      return;
    }

    const saveRol = window.confirm(`¿Desea guardar el rol ${rolName}?`);

    if (!saveRol) return;

    if (rolId) dispatch(rolThunks.updateRol(rolId, { name: rolName }));
    else dispatch(rolThunks.saveRol({ name: rolName }));
  };

  const onChangeHandler = (evt) => {
    const value = evt.target.value;
    setRolName(value);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.formGroup}>
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          name=""
          id="name"
          placeholder="Rol"
          value={rolName}
          onChange={onChangeHandler}
          autoFocus
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
          {rolId && (
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

export default NewRol;
