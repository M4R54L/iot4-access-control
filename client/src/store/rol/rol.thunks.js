import axios from 'axios';
import { rolActions } from './rol.slice';

const baseUrl = '/api/rol';

const saveRol = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(baseUrl, data);
      dispatch(rolActions.editRol({ editRol: false, rolId: '' }));
    } catch (error) {
      const { msg } = error.response.data;
      dispatch(rolActions.setError({ msg }));
    }
  };
};

const getRoles = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(baseUrl);
      const { msg } = res.data;
      dispatch(rolActions.getRoles({ roles: msg }));
    } catch (error) {
      const { msg } = error.response.data;
      dispatch(rolActions.setError({ msg }));
    }
  };
};

const getOneRol = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${baseUrl}/${id}`);
      const { msg } = res.data;
      dispatch(rolActions.setRolName({ name: msg.name }));
    } catch (error) {
      const { msg } = error.response.data;
      dispatch(rolActions.setError({ msg }));
    }
  };
};

const deleteRol = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${baseUrl}/${id}`);
    } catch (error) {
      const { msg } = error.response.data;
      dispatch(rolActions.setError({ msg }));
    }
  };
};

const updateRol = (id, data) => {
  return async (dispatch) => {
    try {
      await axios.put(`${baseUrl}/${id}`, data);
      dispatch(rolActions.editRol(false));
    } catch (error) {
      const { msg } = error.response.data;
      dispatch(rolActions.setError({ msg }));
    }
  };
};

export default {
  saveRol,
  getRoles,
  getOneRol,
  deleteRol,
  updateRol,
};
