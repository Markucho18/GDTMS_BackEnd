//usuario.js
const express = require('express');
const db = require('../db');
const router = express.Router();

router.get("/", (req, res)=>{
    const query = "SELECT * FROM `usuarios`"
    db.query(query, (err, result)=>{
        if(err){
            console.error('Error al ejecutar la consulta', err);
            return
        }
        res.status(200).send(result);
        console.log(result);
    })
})

router.get("/obtener", (req, res)=>{
    const usuario = req.query.usuario;
    const query = 'SELECT id_usuario FROM usuarios WHERE username = ?'
    db.query(query, [usuario], (err, result)=>{
        if(err) res.json({msg:"Hubo un error al consultar usuarios SQL: ", err})
        else res.json({msg: "La consulta SQL a usuarios salio bien", result})
    })
})

module.exports = router;