const { validationResult } = require('express-validator');

const Task = require('../models/task');
const User = require('../models/user');

exports.getTasks = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getTasks().then(tasks => {
            res.status(200).json({
                tasks: [tasks]
            });
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));

};

exports.postTask = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            response: "validation faild!"
        })
    }
    const title = req.body.title;
    const content = req.body.content;
    Task.create({
        title: title,
        content: content,
        userId: req.userId
    });
    res.status(201).json({
        response: 'success post',
        task: { title: title, content: content }
    });

}

exports.getShowTask = (req, res, next) => {
    const taskId = req.params.taskId;
    User.findByPk(req.userId).then(user => {
        user.getTasks({where: {id:taskId}}).then(tasks => {
            const task = tasks[0];
            res.status(200).json({
                task: task
            });
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
}