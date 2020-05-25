const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// env文件使用环境变量
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
// parse json 服务器收发json格式
app.use(express.json());

// mongodb uri
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercise');
const usersRouter = require('./routes/user');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;