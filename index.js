require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

global.__basepath = __dirname;

app.use(cors());
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

// test login
// const authMiddleware = require('./src/middleware/auth');

// app.get('/authenticatedUser', authMiddleware, (req, res)=>{
//   return res.json({
//     success: true,
//     message: 'Hello ' + req.authUser.username
//   });
// });

const portServer = process.env.PORT;

app.use('/admin', require('./src/routes/admin'));
app.use('/', require('./src/routes/server'));

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
