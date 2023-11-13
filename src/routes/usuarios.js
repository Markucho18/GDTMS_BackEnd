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

module.exports = router;