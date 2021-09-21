import React from 'react';
import { useSelector } from 'react-redux';

import Header from '../Layout/Header';
import EditUser from './EditUser';
import UserList from './UserList';

const User = () => {
  const editUser = useSelector((state) => state.user.editUser);

  return (
    <div>
      <Header title="Usuarios" />

      {editUser ? <EditUser /> : <UserList />}
    </div>
  );
};

export default User;
