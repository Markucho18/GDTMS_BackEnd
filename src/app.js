const express = require('express')
const app = express()
const port = 3001

const usuario = {
    nombre: "pepe",
    apellido: "hernandez",
    sexo: "hombre",
    colorFav: "rojo"
}

app.get("/", (req, res)=>{
    res.json(usuario);
})





app.listen(port, ()=>{
    console.log(`Server listening on port: ${port}`)
})

