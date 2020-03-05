const router = require('express').Router();
const controller = require('../controllers/user.controller');
var multer = require("multer")
var upload = multer({ dest: "uploads",preservePath:true })
// List of users
router.get('/', controller.getUsers);
// Get User
router.get('/get', controller.getUser);
// Store new user
router.post('/', controller.storeUser);
// Edit user

//using Multer to upload avatar Image

router.put('/:id',upload.single("avatar"), controller.editUser);
// Delete user
router.delete('/:id', controller.deleteUser);


module.exports = router;