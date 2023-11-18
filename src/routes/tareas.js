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

router.get("/inbox", (req, res)=>{
  const query = 'SELECT * FROM tareas WHERE fecha IS NULL'
  db.query(query, (err, result)=>{
    if(err) res.json({msg: "Ha occurido un error al buscar tareas sin fecha", err})
    else res.json({msg: "La consulta SQL ha devuelto tareas sin fecha correctamente", result})
  })
})

router.get("/hoy", (req, res)=>{
  const query = 'SELECT * FROM tareas WHERE fecha = CURDATE()'
  db.query(query, (err, result)=>{
    if(err) res.json({msg: "Ha occurido un error al buscar tareas de hoy", err})
    else res.json({msg: "La consulta SQL ha devuelto tareas de hoy correctamente", result})
  })
})

router.get("/proximo", (req, res)=>{
  const query = 'SELECT * FROM tareas WHERE NOT fecha = CURDATE()'
  db.query(query, (err, result)=>{
    if(err) res.json({msg: "Ha occurido un error al buscar las proximas tareas", err})
    else res.json({msg: "La consulta SQL ha devuelto las proximas tareas correctamente", result})
  })
})

router.post("/crear", (req, res) => {
  try {
    const { idUsuario, idEtiqueta, nombre, prioridad, fecha, descripcion } = req.body;
    console.log("El idUsuario recibido del frontend es: ", idUsuario);
    const query = "INSERT INTO tareas (id_usuario, id_etiqueta, nombre, prioridad, fecha, descripcion) VALUES (?, ?, ?, ?, ?, ?) ";
    db.query(query, [idUsuario, idEtiqueta || null, nombre, prioridad, fecha || null, descripcion || null], (err, result) => {
        if (err) res.json({msg: "Hubo un error al hacer la consulta SQL en crearTarea", err});
        else res.json({ msg: "Datos enviados correctamente", result });
      }
    );
  } catch (err) {
    return res.json({ msg: "Hubo un error al crear la tarea", err });
  }
});

router.delete("/", (req, res)=>{
  if (req.query && Object.keys(req.query).length > 0){
    const idTarea = req.query.idTarea;
    const query = 'DELETE FROM tareas WHERE id_tarea = ?'
    db.query(query, [idTarea], (err, result)=>{
      if(err) res.json({msg: "Hubo un error SQL al eliminar tarea", err});
      else res.json({msg: "Salio todo bien en SQL eliminar tarea", result});
    })

  }
  else "No hay query en tareas/delete";
})

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
