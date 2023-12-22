//tareas.js
const express = require("express");
const db = require("../db");
const { compareSync } = require("bcrypt");
const router = express.Router();

router.get("/", (req, res) => {
  const query = `SELECT * FROM tareas`;
  db.query(query, (err, result) => {
    if (err) res.json({msg: "Ha occurido un error"});
    else res.send(result);
  });
});

router.get("/sinFecha", (req, res)=>{
  const query = `SELECT * FROM tareas WHERE fecha IS NULL AND id_usuario = ${req.query.userId}`
  db.query(query, (err, result)=>{
    if(err) res.json({msg: "Ha occurido un error al buscar tareas sin fecha", err})
    else res.json({msg: "La consulta SQL ha devuelto tareas sin fecha correctamente", result})
  })
})

router.get("/caducadas", (req, res)=>{
  const query = `SELECT * FROM tareas WHERE fecha < CURRENT_DATE() AND id_usuario = ${req.query.userId}`
  db.query(query, (err, result)=>{
    if(err) res.json({msg: "Ha occurido un error al buscar tareas caducadas", err})
    else res.json({msg: "La consulta SQL ha devuelto tareas caducadas correctamente", result})
  })
})

router.get("/hoy", (req, res)=>{
  const query = `SELECT * FROM tareas WHERE fecha = CURDATE() AND id_usuario = ${req.query.userId}`
  db.query(query, (err, result)=>{
    if(err) res.json({msg: "Ha occurido un error al buscar tareas de hoy", err})
    else res.json({msg: "La consulta SQL ha devuelto tareas de hoy correctamente", result})
  })
  console.log("Se ha hecho una consulta en tareas/hoy", query);
})

router.get("/proximo", (req, res)=>{
  const query = `SELECT * FROM tareas WHERE fecha > CURRENT_DATE() AND id_usuario = ${req.query.userId}`
  db.query(query, (err, result)=>{
    if(err) res.json({msg: "Ha occurido un error al buscar las proximas tareas", err})
    else res.json({msg: "La consulta SQL ha devuelto las proximas tareas correctamente", result, query})
  })
})

router.get("/etiqueta", (req, res)=>{
  if(req.query && Object.keys(req.query).length > 0){
    const {idEtiqueta, userId} = req.query;
    const query = 'SELECT * FROM tareas WHERE id_etiqueta = ? AND fecha >= CURRENT_DATE() AND id_usuario = ?';
    db.query(query, [idEtiqueta, userId], (err, result)=>{
      if(err) res.json({msg:"Hubo un error SQL al obtener las tareas con esa etiqueta", err});
      else res.json({msg: "Las tareas segun etiqueta sean obtenido correctamente con SQL: ", result})
    })
  }
  else console.log("No hay query(etiqueta) en tareas");
})

router.get("/completas", (req, res)=>{
  const query = 'SELECT * FROM tareas WHERE estado = 1 AND id_usuario = ?'
  db.query(query, [req.query.userId], (err, result)=>{
    if(err) res.json({msg:"Hubo un error SQL al obtener las tareas completas", err});
      else res.json({msg: "Las tareas completas sean obtenido correctamente con SQL: ", result})
  })
})

router.get("/fechasUnicas", (req,res)=>{
  const query = `SELECT DISTINCT fecha FROM tareas WHERE fecha > CURRENT_DATE() AND fecha IS NOT NULL AND id_usuario = ${req.query.userId}`;
  db.query(query, (err, result)=>{
    if(err) res.json({msg:"Hubo un error SQL al obtener las fechaUnicas: ", err});
    else res.json({msg: "Las tareas segun etiqueta sean obtenido correctamente con SQL: ", result});
  })
})


router.post("/crear", (req, res) => {
  try {
    const { idUsuario, idEtiqueta, nombre, prioridad, fecha, descripcion } = req.body;
    const query = "INSERT INTO tareas (id_usuario, id_etiqueta, nombre, prioridad, fecha, descripcion) VALUES (?, ?, ?, ?, ?, ?) ";
    db.query(query, [idUsuario, idEtiqueta || null, nombre, prioridad, fecha || null, descripcion || null], (err, result) => {
        if (err) res.json({msg: "Hubo un error al hacer la consulta SQL en crearTarea", err});
        else res.json({ msg: "Datos enviados correctamente", result });
      }
    );
  } catch (err) {
    res.json({ msg: "Hubo un error al crear la tarea", err });
  }
});

router.post("/buscar", (req, res)=>{
  const {textoBusqueda, userId} = req.body;
  const query = `SELECT * FROM tareas WHERE nombre LIKE "%${textoBusqueda}%" AND id_usuario = ${userId}`;
  db.query(query, (err, result)=>{
    if(err) res.json({msg: "Hubo un error SQL al buscar tarea", err});
    else res.json({msg: "La consulta SQL buscar tarea salio bien", result});
  })
})

router.put("/", (req, res)=>{
  try{
    const {idTarea, idEtiqueta, nombre, prioridad, fecha, descripcion } = req.body;
    const query = 'UPDATE tareas SET nombre = ? , prioridad = ? , fecha = ? , descripcion = ? , id_etiqueta = ? WHERE id_tarea = ?'
    db.query(query, [nombre, prioridad, fecha, descripcion, idEtiqueta, idTarea], (err, result)=>{
      if(err) res.json({msg: "Hubo un error al hacer la consulta SQL en editarTarea", err});
      else res.json({msg: "La tarea se ha editado correctamente", result});
    })
  }
  catch(err){
    res.json({ msg: "Hubo un error al crear la tarea (catch)", err });
  }
})

router.put("/completar", (req, res)=>{
  const {idTarea, estado} = req.body
  const query = 'UPDATE tareas SET estado = ? WHERE id_tarea = ?'
  db.query(query, [estado, idTarea], (err, result)=>{
    if(err) res.json({msg: "Hubo un error SQL al completar la tarea", err});
    else res.json({msg: "Salio todo bien en SQL completar tarea", result});
  })
})

router.delete("/", (req, res)=>{
  if (req.query && Object.keys(req.query).length > 0){
    const idTarea = req.query.idTarea;
    const query = 'DELETE FROM tareas WHERE id_tarea = ?'
    db.query(query, [idTarea], (err, result)=>{
      if(err) res.json({msg: "Hubo un error SQL al eliminar tarea", err});
      else res.json({msg: "Salio todo bien en SQL eliminar tarea", result});
    })
  }
  else res.send("No hay query en tareas/delete");
})

router.delete("/sinFecha", (req, res)=>{
  const query = `DELETE FROM tareas WHERE fecha IS NULL AND id_usuario = ${req.query.userId}`
  db.query(query, (err, result)=>{
    if(err) res.json({msg: "Ha occurido un error al eliminar tareas sin fecha", err})
    else res.json({msg: "La consulta SQL ha eliminado tareas sin fecha correctamente", result})
  })
})

router.delete("/caducadas", (req, res)=>{
  const query = `DELETE FROM tareas WHERE fecha < CURRENT_DATE() AND id_usuario = ${req.query.userId}`
  db.query(query, (err, result)=>{
    if(err) res.json({msg: "Ha occurido un error al eliminar tareas caducadas", err})
    else res.json({msg: "La consulta SQL ha eliminado tareas caducadas correctamente", result})
  })
})

router.delete("/completas", (req, res)=>{
  const query = `DELETE FROM tareas WHERE estado = 1 AND id_usuario = ${req.query.userId}`
  db.query(query, (err, result)=>{
    if(err) res.json({msg: "Ha occurido un error al eliminar tareas completas", err})
    else res.json({msg: "La consulta SQL ha eliminado tareas completas correctamente", result})
  })
})


router.delete("/")

module.exports = router;
