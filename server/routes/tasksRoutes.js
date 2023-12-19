const TaskController = require('../controlers/TaskControler');

const router = require('express').Router();

router.get('/', TaskController.getTasks);
router.get('/:id', TaskController.getTask);
router.post('/', TaskController.createTask);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

module.exports = router;