//usuario.js
const express = require('express');
const router = express.Router();


const usuario = {
    nombre: "pepe",
    apellido: "hernandez",
    sexo: "hombre",
    colorFav: "rojo"
}

router.get("/", (req, res)=>{
    res.json(usuario);
})

module.exports = router;