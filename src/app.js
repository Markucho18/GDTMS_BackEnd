//app.js
const express = require('express');
const app = express();
const port = 3001;

const usuariojs = require('./routes/usuario');

const tareasjs = require('./routes/tareas');

const etiquetasjs = require('./routes/etiquetas');

app.get("/", (req, res)=>{
    res.send("Hola amigo, estas en el archivo principal");
})

app.use('/usuario', usuariojs);

app.use('/tareas', tareasjs);

app.use('/etiquetas', etiquetasjs);

app.use((req, res)=>{
    res.send("Pagina no encontrada");
})

app.listen(port, ()=>{
    console.log(`Server listening on port: ${port}`);
})

