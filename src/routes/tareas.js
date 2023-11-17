//tareas.js
const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/", (req, res) => {
  const query = "SELECT * FROM tareas";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error al ejecutar la consulta", err);
      return;
    }
    res.send(result);
    console.log(result);
  });
});

router.post("/crear", (req, res) => {
  try {
    const { idUsuario, idEtiqueta, nombre, prioridad, fecha, descripcion } = req.body;
    console.log("El idUsuario recibido del frontend es: ", idUsuario);
    const query = "INSERT INTO tareas (id_usuario, id_etiqueta, nombre, prioridad, fecha, descripcion) VALUES (?, ?, ?, ?, ?, ?) ";
    db.query(query, [idUsuario, idEtiqueta, nombre, prioridad, fecha, descripcion], (err, result) => {
        if (err) res.json({msg: "Hubo un error al hacer la consulta SQL en crearTarea", err});
        else res.json({ msg: "Datos enviados correctamente", result });
      }
    );
  } catch (err) {
    return res.json({ msg: "Hubo un error al crear la tarea", err });
  }
});

module.exports = router;

/* router.get("/inbox", (req, res)=>{
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
    }) */
