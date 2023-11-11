//app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const port = 3001;

app.get("/", (req, res)=>{
    res.send("Hola amigo, estas en el archivo principal");
})

//Resuelve el problema de origen cruzado (puertos diferentes)
app.use(cors());

//Traduce lo que llegue de la request de cualquier ruta al tipo de archivo correspondiente.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/usuarios', require('./routes/usuarios'));

app.use('/tareas', require('./routes/tareas'));

app.use('/etiquetas', require('./routes/etiquetas'));

app.use((req, res)=>{
    res.send("Pagina no encontrada");
})

app.listen(port, ()=>{
    console.log(`Server listening on port: ${port}`);
})

