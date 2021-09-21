const { request, response, json } = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');

const User = require('../database/models/User');
const { rolExists } = require('./rol.validation');

const saveSchema = Joi.object({
  username: Joi.string().required().min(3).max(20),
  password: Joi.string().required().min(5).max(10),
  code: Joi.string().required().min(3).max(10),
  firstName: Joi.string().required().min(3).max(20),
  lastName: Joi.string().required().min(3).max(20),
  email: Joi.string().required().email(),
  rol: Joi.string().required(),
});

const updateSchema = Joi.object({
  username: Joi.string().min(3).max(20),
  password: Joi.string().min(5).max(10),
  code: Joi.string().min(3).max(10),
  firstName: Joi.string().min(3).max(20),
  lastName: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  rol: Joi.string(),
});

const userExists = async (username) => {
  const user = await User.find({ username });
  return user;
};

const userExistsById = async (id) => {
  const user = await User.findById(id);
  return user;
};

const getAllValidation = (req = request, res = response, next) => {
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

  const theUserExists = await userExistsById(id);

  if (!theUserExists) {
    return res.status(404).json({
      msg: 'El usuario no existe',
    });
  }

  next();
};

const saveUserValidation = async (req = request, res = response, next) => {
  const { error } = saveSchema.validate(req.body, { abortEarly: false });
  const { rol } = req.body;

  const validRolId = mongoose.isValidObjectId(rol);

  if (!validRolId) {
    return res.status(400).json({
      msg: 'El rol no es correcto',
    });
  }

  const theRolExists = await rolExists(rol);

  if (!theRolExists) {
    return res.status(404).json({
      msg: 'El rol no existe',
    });
  }

  if (error) {
    const errors = [...error.details.map((el) => el.message)];
    return res.status(400).json({ msg: errors });
  }

  next();
};

const deleteUserValidation = async (req = request, res = response, next) => {
  const { id } = req.params;

  const isValidId = mongoose.isValidObjectId(id);

  if (!isValidId) {
    return res.status(400).json({
      msg: 'El id no es válido',
    });
  }

  next();
};

const updateUserValidation = async (req = request, res = response, next) => {
  const { error } = updateSchema.validate(req.body, { abortEarly: false });
  const { rol } = req.body;
  const { id } = req.params;

  const isValidId = mongoose.isValidObjectId(id);

  if (!isValidId) {
    return res.status(400).json({
      msg: 'El id no es válido',
    });
  }

  const theUserExists = await userExistsById(id);

  if (!theUserExists) {
    return res.status(404).json({
      msg: 'El usuario no existe',
    });
  }

  const validRolId = mongoose.isValidObjectId(rol);

  if (!validRolId) {
    return res.status(400).json({
      msg: 'El rol no es correcto',
    });
  }

  const theRolExists = await rolExists(rol);

  if (!theRolExists) {
    return res.status(404).json({
      msg: 'El rol no existe',
    });
  }

  if (error) {
    const errors = [...error.details.map((el) => el.message)];
    return res.status(400).json({ msg: errors });
  }

  next();
};

module.exports = {
  getAllValidation,
  getOneValidation,
  saveUserValidation,
  deleteUserValidation,
  updateUserValidation,
};
