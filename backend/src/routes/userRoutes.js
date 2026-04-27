const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/usercontroller');

router.get('/all', getUsers);
router.get('/get/:id', getUser);
router.put('/update/:id',updateUser)
router.delete('/delete/:id', deleteUser);

module.exports = router;