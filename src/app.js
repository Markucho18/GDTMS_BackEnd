//app.js
const express = require('express');
const db = require('./db');
const app = express();
const port = 3001;

const usuariojs = require('./routes/usuario');

const tareasjs = require('./routes/tareas');

app.get("/", (req, res)=>{
    res.send("Hola amigo, estas en el archivo principal");
})

app.use('/usuario', usuariojs);

app.use('/tareas', tareasjs);

app.listen(port, ()=>{
    console.log(`Server listening on port: ${port}`);
})

