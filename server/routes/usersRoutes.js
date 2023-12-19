const UserController = require('../controlers/UserControler');

const router = require('express').Router();

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUser);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;

