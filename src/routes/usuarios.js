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
        res.send(result)
        console.log(result);
    })
})

router.post("/", (req, res)=>{
    console.log("Datos recibidos:", req.body);
    res.send("Peticion post recibida")
    const {username, email, pais, password} = req.body
    const query = "INSERT INTO usuarios (username, password, e-mail, id_pais) VALUES (?, ?, ?, ?) "
    db.query(query, [username, email, pais, password], (err, result)=>{
        if (error) {
            console.error('Error al ejecutar la consulta SQL:', error);
            return;
          }
          console.log('Filas afectadas:', results.affectedRows);
    })
})

module.exports = router;