//etiquetas.js
const express = require('express');
const db = require('../db');
const router = express.Router();

router.get("/", (req, res)=>{
    const query = 'SELECT * FROM etiquetas'
    db.query(query, (err, result)=>{
        if(err){
            console.error('Error al ejecutar la consulta', err);
            return
        }
        res.send(result)
        console.log(result);
    })
})

module.exports = router;