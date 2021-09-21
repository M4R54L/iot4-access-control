import axios from 'axios';
import { userActions } from './user.slice';

const baseUrl = '/api/user';

const getAll = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(baseUrl);
      const { msg } = res.data;
      dispatch(userActions.getAll({ users: msg }));
    } catch (error) {
      const { msg } = error.response.data;
      console.log({ msg });
      dispatch(userActions.setError({ error: msg }));
    }
  };
};

const getOne = (userId) => {
  return async (dispatch) => {
    try {
      const res = await axios(`${baseUrl}/${userId}`);
      const { msg } = res.data;
      dispatch(userActions.getOne({ user: msg }));
    } catch (error) {
      const { msg } = error.response.data;
      console.log({ msg });
      dispatch(userActions.setError({ error: msg }));
    }
  };
};

export default {
  getAll,
  getOne,
};
