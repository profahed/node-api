const express = require('express');
const bodyParser = require('body-parser');

const db = require('./helpers/database');

const User = require('./models/user');
const Task = require('./models/task');

const routes = require('./routes/routes');
const authRoutes = require('./routes/auth');

const app = express();

//app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//middleware
app.use((req,res,next)=> {
    res.setHeader('Acess-control-Allow-Origin','*');
    next();
});
app.use(routes);
app.use(authRoutes);
app.use((req,res,next)=>{
    return res.json(['working!!']);
})

Task.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Task);
db.sync();
app.listen(3000);