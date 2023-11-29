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
  console.log("Se ha hecho una consulta en /tareas/inbox");
})

router.get("/hoy", (req, res)=>{
  const query = 'SELECT * FROM tareas WHERE fecha = CURDATE()'
  db.query(query, (err, result)=>{
    if(err) res.json({msg: "Ha occurido un error al buscar tareas de hoy", err})
    else res.json({msg: "La consulta SQL ha devuelto tareas de hoy correctamente", result})
  })
  console.log("Se ha hecho una consulta en tareas/hoy");
})

router.get("/proximo", (req, res)=>{
  const query = 'SELECT * FROM tareas WHERE NOT fecha = CURDATE()'
  db.query(query, (err, result)=>{
    if(err) res.json({msg: "Ha occurido un error al buscar las proximas tareas", err})
    else res.json({msg: "La consulta SQL ha devuelto las proximas tareas correctamente", result})
  })
})

router.get("/etiqueta", (req, res)=>{
  if(req.query && Object.keys(req.query).length > 0){
    const idEtiqueta = req.idEtiqueta;
    console.log("idEtiqueta es: ", idEtiqueta);
    const query = 'SELECT * FROM tareas WHERE id_etiqueta = ? ';
    db.query(query, [idEtiqueta], (err, result)=>{
      if(err) res.json({msg:"Hubo un error SQL al obtener las tareas con esa etiqueta", err});
      else res.json({msg: "Las tareas segun etiqueta sean obtenido correctamente con SQL: ", result})
    })
    console.log("Se ha recibi un idEtiqueta dentro de /Tareas: ", req.query);
  }
  else console.log("No hay query(etiqueta) en tareas");
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

router.post("/buscar", (req, res)=>{
  console.log(req.body);
  const {textoBusqueda} = req.body;
  console.log("El textoBusqueda recibido desde el frontend es: ", textoBusqueda);
  const query = `SELECT * FROM tareas WHERE nombre LIKE "%${textoBusqueda}%" `;
  db.query(query, (err, result)=>{
    if(err) res.json({msg: "Hubo un error SQL al buscar tarea", err});
    else res.json({msg: "La consulta SQL buscar tarea salio bien", result});
  })
})

router.put("/", (req, res)=>{
  try{
    const {idTarea, idEtiqueta, nombre, prioridad, fecha, descripcion } = req.body;
    console.log("Los datos de la tarea recibidos son: ", req.body);
    const query = 'UPDATE tareas SET nombre = ? , prioridad = ? , fecha = ? , descripcion = ? , id_etiqueta = ? WHERE id_tarea = ?'
    db.query(query, [nombre, prioridad, fecha, descripcion, idEtiqueta, idTarea], (err, result)=>{
      if(err) res.json({msg: "Hubo un error al hacer la consulta SQL en editarTarea", err});
      else res.json({msg: "La tarea se ha editado correctamente", result});
    })
  }
  catch(err){
    return res.json({ msg: "Hubo un error al crear la tarea (catch)", err });
  }
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

module.exports = router;
