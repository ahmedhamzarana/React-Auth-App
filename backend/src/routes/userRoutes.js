const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  deleteUser,
  updateUser
} = require('../controllers/usercontroller');

router.get('/all', getUsers);
router.get('/get/:id', getUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;