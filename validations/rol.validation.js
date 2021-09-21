const { request, response } = require('express');
const mongoose = require('mongoose');
const Rol = require('../database/models/Rol');

const rolExistsByName = async (name) => {
  const exists = await Rol.findOne({ name });
  return exists ? true : false;
};

const rolExists = async (id) => {
  const rol = await Rol.findById(id);
  return rol;
};

const canNotBeModified = (rol) => {
  return rol.default;
};

const saveValidation = async (req = request, res = response, next) => {
  const exists = await rolExistsByName(req.body.name);

  if (exists)
    return res.status(409).json({
      msg: 'El rol ya existe, no se puede guardar repetido',
    });

  next();
};

const getOneValidation = async (req = request, res = response, next) => {
  const { id } = req.params;
  const isValid = mongoose.isValidObjectId(id);

  if (!isValid) {
    return res.status(400).json({
      msg: 'El id no se válido',
    });
  }

  next();
};

const deleteValidation = async (req = request, res = response, next) => {
  const { id } = req.params;
  const isValid = mongoose.isValidObjectId(id);
  const rol = await rolExists(id);

  if (!isValid) {
    return res.status(400).json({
      msg: 'El id no es válido',
    });
  }

  if (!rol) {
    return res.status(404).json({
      msg: 'El rol no existe, no se pudo borrar',
    });
  }

  if (canNotBeModified(rol)) {
    return res.status(401).json({
      msg: 'No se puede borrar el rol',
    });
  }

  next();
};

const updateValidation = async (req = request, res = response, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const isValid = mongoose.isValidObjectId(id);
  const rol = await rolExists(id);

  if (!isValid) {
    return res.status(400).json({
      msg: 'No es un id válido de mongo',
    });
  }

  if (!rol) {
    return res.status(404).json({
      msg: 'El rol no existe, no se pudo borrar',
    });
  }

  if (canNotBeModified(rol)) {
    return res.status(401).json({
      msg: 'No se puede actualizar el rol',
    });
  }

  if (!name || typeof name !== 'string') {
    return res.status(400).json({
      msg: 'El nombre no es correcto',
    });
  }

  next();
};

module.exports = {
  rolExists,
  saveValidation,
  getOneValidation,
  deleteValidation,
  updateValidation,
};
