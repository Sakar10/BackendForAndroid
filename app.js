const express = require('express');
const app = express()
const mongoose = require('mongoose');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
const order=require('./routes/userMatch');
const category=require('./routes/category');
const subcategory=require('./routes/subcategory');
const usercategory=require('./routes/userCategory');
const registerRoute = require("./routes/register_route");

mongoose.connect('mongodb+srv://coffeetalk:sakar123@cluster0-kjjnm.mongodb.net/coffeetalk',
{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})

app.use('/uploads',express.static(__dirname + '/uploads/image'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/usermatch', order);
app.use('/category', category);
app.use('/subcategory', subcategory);
app.use('/usercategory', usercategory);
app.use("/register", registerRoute);

const port = process.env.port || 3004;
const server = http.createServer(app);
server.listen(port);
module.exports = app;