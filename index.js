const express = require('express')

const app = express()

app.use(express.urlencoded({extended: false}))

//connect server
app.get('/', (req, res)=>{
    return res.json({
        success: true,
        message: "Server is running"
    })
})

// app.use('/', require('./'))

app.use('*', (req, res)=>{
    return res.status(404).json({
        success: false,
        message: "something wrong, resource not found!!"
    })
})

//set port server
const portServer = 3333
app.listen(portServer, ()=>{
    console.log(`Server running on port ${portServer}`);
})
