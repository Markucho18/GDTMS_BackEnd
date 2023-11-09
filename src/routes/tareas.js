//tareas.js
const express = require('express');
const db = require('../db');
const router = express.Router();

router.get("/", (req, res) =>{
    const query = 'SELECT * FROM tareas'
    db.query(query, (err, result)=>{
        if(err){
            console.error('Error al ejecutar la consulta', err);
            return
        }
        res.send(result)
        console.log(result);
    })
})

router.get("/inbox", (req, res)=>{
    const query = "SELECT * FROM `tareas` WHERE `fecha` IS NULL"
    db.query(query, (err, result)=>{
        if(err){
            console.error('Error al ejecutar la consulta', err);
            return
        }
        res.send(result)
        console.log(result);
    })
})

router.get("/hoy", (req, res) =>{
    const query = "SELECT * FROM `tareas` WHERE `fecha` = CURDATE()"
    db.query(query, (err, result)=>{
        if(err){
            console.error('Error al ejecutar la consulta', err);
            return
        }
        res.send(result)
        console.log(result);
    })
})

router.get("/proximo", (req, res) =>{
    const query = "SELECT * FROM `tareas` WHERE `fecha` != CURDATE()"
    db.query(query, (err, result)=>{
        if(err){
            console.error('Error al ejecutar la consulta', err);
            return
        }
        res.send(result)
        console.log(result);
    })
})

router.post("/", (req, res) =>{
    res.send("Hiciste una peticion POST en /tareas")
})

router.put("/", (req, res) =>{
    res.send("Hiciste una peticion PUT en /tareas")
})

router.delete("/", (req, res) =>{
    res.send("Hiciste una peticion DELETE en /tareas")
})

router.patch("/", (req, res) =>{
    res.send("Hiciste una peticion PATCH en /tareas")
})

module.exports = router;