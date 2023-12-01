//usuario.js
const express = require('express');
const db = require('../db');
const router = express.Router();

router.get("/", (req, res)=>{
    const query = "SELECT * FROM `usuarios`"
    db.query(query, (err, result)=>{
        if(err) return console.error('Error al ejecutar la consulta', err);
        else{
            console.log(result);
            res.status(200).send(result);
        }
    })
})

router.post("/obtenerId", (req, res)=>{
    const token = req.body.token
    console.log("El token recibido del front es: ", token);
    const query = 'SELECT id_usuario FROM usuarios WHERE token = ?'
    db.query(query, [token], (err, result)=>{
        if(err) res.json({msg:"Hubo un error al consultar usuarios SQL: ", err})
        else res.json({msg: "La consulta SQL a usuarios salio bien", result})
    })
})

module.exports = router;