require('dotenv').config();
const express = require('express');

const app = express();

global.__basepath = __dirname;

app.use(express.urlencoded({extended: false}));
app.use('/images' ,express.static('assets'));
// app.use(express.static('assets'));

//connect server
app.get('/', (req, res)=>{
  return res.json({
    success: true,
    message: 'Server is running'
  });
});
const portServer = process.env.PORT;

app.use('/', require('./src/routes'));

app.use('*', (req, res)=>{
  return res.status(404).json({
    success: false,
    message: 'something wrong, resource not found!!'
  });
});

//set port server

app.listen(portServer, ()=>{
  console.log(`Server running on port ${portServer}`);
});
