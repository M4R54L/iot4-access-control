const { Router } = require('express');
const {
  getAllUsers,
  getOneUser,
  saveUser,
  deleteUser,
  updateUser,
} = require('../controllers/user.controller');
const {
  getAllValidation,
  getOneValidation,
  saveUserValidation,
  deleteUserValidation,
  updateUserValidation,
} = require('../validations/user.validation');

const router = Router();

router.get('/', getAllValidation, getAllUsers);
router.get('/:id', getOneValidation, getOneUser);
router.post('/', saveUserValidation, saveUser);
router.delete('/:id', deleteUserValidation, deleteUser);
router.put('/:id', updateUserValidation, updateUser);

module.exports = router;
