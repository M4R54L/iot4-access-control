const { request, response } = require('express');
const Rol = require('../database/models/Rol');

exports.getAllRoles = async (req = request, res = response) => {
  try {
    const roles = await Rol.find().select({ name: 1 });

    res.json({
      msg: roles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'No se pudieron consultar los roles',
    });
  }
};

exports.getOneRol = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const rol = await Rol.findById(id).select({ name: 1, claims: 1 });

    if (!rol) {
      return res.status(404).json({
        msg: 'El rol no existe',
      });
    }

    res.json({
      msg: rol,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'No se pudo consultar el rol',
    });
  }
};

exports.saveRol = async (req = request, res = response) => {
  try {
    const { name } = req.body;
    await Rol.create({ name });

    res.json({
      msg: `Rol ${name} creado`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'No se pudo guardar el rol',
    });
  }
};

exports.deleteRol = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const docs = await Rol.findByIdAndDelete(id);

    res.json({
      msg: `Rol ${docs.name} borrado`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'No se pudo borrar el rol',
    });
  }
};

exports.updateRol = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    await Rol.findByIdAndUpdate(id, { name });

    res.json({
      msg: `Rol ${name} actualizado`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'No se pudo actualizar el rol',
    });
  }
};
