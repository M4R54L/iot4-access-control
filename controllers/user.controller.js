const { request, response } = require('express');
const User = require('../database/models/User');

exports.getAllUsers = async (req = request, res = response) => {
  try {
    const users = await User.find()
      .select({
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      })
      .populate('rol', { name: 1, _id: 0 });

    res.json({
      msg: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'No se pudieron consultar los usuarios' });
  }
};

exports.getOneUser = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .select({
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      })
      .populate('rol', { name: 1, _id: 0 });

    res.json({
      msg: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'No se pudo consultar el usuario' });
  }
};

exports.saveUser = async (req = request, res = response) => {
  try {
    await User.create(req.body);

    res.json({
      msg: `Usuario ${req.body.username} creado`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'No se pudo guardar el usuario' });
  }
};

exports.deleteUser = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);

    res.json({
      msg: `Usuario borrado`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'No se pudo eliminar el usuario' });
  }
};

exports.updateUser = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    await User.findByIdAndUpdate(id, req.body);
    res.json({
      msg: `Usuario ${username} actualizado`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'No se pudo actualizar el usuario' });
  }
};
