//etiquetas.js
const express = require('express');
const db = require('../db');
const router = express.Router();

router.use("/", (req, res, next)=>{
    //Comprueba si le ha llegado query
    if (req.query && Object.keys(req.query).length > 0){
        const idEtiqueta = req.query.idEtiqueta;
        if(idEtiqueta == null) return res.json("La etiqueta recibida por query es null");
        else{
            const query = 'SELECT nombre FROM etiquetas WHERE id_etiqueta = ?'
            db.query(query, [idEtiqueta], (err, result)=>{
            if(err) res.json({msg: "Hubo un error SQL en etiquetas query", err});
            else res.json({msg: "Salio todo bien en SQL etiquetas query", result});
        })
        }
    }
    else next();
})


router.get("/", (req, res)=>{
    const query = 'SELECT * FROM etiquetas'
    db.query(query, (err, result)=>{
        if(err){
            console.error('Error al ejecutar la consulta', err);
            return
        }
        res.send(result)
    })
})




module.exports = router;