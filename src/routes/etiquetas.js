//etiquetas.js
const express = require('express');
const db = require('../db');
const router = express.Router();



router.get("/", (req, res)=>{
    const query = 'SELECT * FROM etiquetas'
    db.query(query, (err, result)=>{
        if(err){
            console.error('Error al ejecutar la consulta', err);
            res.json({msg: "Ha occurido un error"});
        }
        res.send(result)
    })
    console.log("Se ha hecho una consulta en /etiquetas");
})

//OBTENER EL NOMBRE POR EL ID
router.get("/getNombre", (req, res)=>{
    //Comprueba si le ha llegado query
    if (req.query && Object.keys(req.query).length > 0){
        if(req.query.idEtiqueta){
            const idEtiqueta = req.query.idEtiqueta;
            if(idEtiqueta == null) return res.json("El idEtiqueta recibido por query es null");
            else{
                const query = 'SELECT nombre FROM etiquetas WHERE id_etiqueta = ?'
                db.query(query, [idEtiqueta], (err, result)=>{
                if(err) res.json({msg: "Hubo un error SQL en etiquetas query", err});
                else res.json({msg: "Salio todo bien en SQL etiquetas query", result});
            })
            }
        }else{
            res.json({msg: "Ha occurido un error"});
        }
    }else{
        res.json({msg: "Ha occurido un error"});
    }
})

//OBTENER EL ID POR EL NOMBRE
router.get("/getId", (req, res)=>{
    //Comprueba si le ha llegado query
    if (req.query && Object.keys(req.query).length > 0){
        if(req.query.nomEtiqueta){
            const etiqueta = req.query.nomEtiqueta;
            if(etiqueta == null) return res.json("El idEtiqueta recibido por query es null");
            else{
                const query = 'SELECT id_etiqueta FROM etiquetas WHERE nombre = ?'
                db.query(query, [etiqueta], (err, result)=>{
                if(err) res.json({msg: "Hubo un error SQL en etiquetas query", err});
                else res.send(result);
                /* else res.json({msg: "Salio todo bien en SQL etiquetas query", result}); */
            })
            }
        }else{
            res.json({msg: "Ha occurido un error"});
        }
    }else{
        res.json({msg: "Ha occurido un error"});
    }
})

module.exports = router;