const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const tasksController = require('../controllers/task');
const isAuth = require('../middleware/is-auth');

router.post('/tasks-list', isAuth, tasksController.getTasks);
router.post('/show-task/:taskId', isAuth, tasksController.getShowTask);
router.post('/add-tasks', isAuth, [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 })
], tasksController.postTask);

module.exports = router;