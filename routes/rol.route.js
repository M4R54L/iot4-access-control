const { Router } = require('express');
const {
  getAllRoles,
  getOneRol,
  updateRol,
  deleteRol,
  saveRol,
} = require('../controllers/rol.controller');
const {
  saveValidation,
  getOneValidation,
  deleteValidation,
  updateValidation,
} = require('../validations/rol.validation');

const router = Router();

router.get('/', getAllRoles);
router.get('/:id', getOneValidation, getOneRol);
router.post('/', saveValidation, saveRol);
router.put('/:id', updateValidation, updateRol);
router.delete('/:id', deleteValidation, deleteRol);

module.exports = router;
