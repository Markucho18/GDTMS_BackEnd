//usuario.js
const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const router = express.Router();

const saltRounds = 10;

const hashPassword = async (password)=>{
  try {
    // Generar un salt
    const salt = await bcrypt.genSalt(saltRounds);
    // Hash de la contraseña con el salt
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error('Error al hashear la contraseña:', error);
  }
}

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

router.use("/", async (req, res, next)=>{
    try{
        console.log("Este es el id_pais: ", req.body.pais );
        req.body.password = await hashPassword(req.body.password);
        next();
    }
    catch(err){
        console.log("Ha ocurrido un error con el hash:", err)
    }
})

router.post("/", (req, res)=>{
    console.log("Datos recibidos:", req.body);
    res.send("Peticion post recibida")
    const {username, email, pais, password} = req.body
    const query = "INSERT INTO usuarios (username, password, `e-mail`, id_pais) VALUES (?, ?, ?, ?) "
    db.query(query, [username, password, email, pais], (err, result)=>{
        if (err) {
            console.error('Error al ejecutar la consulta SQL:', err);
            return;
          }
          console.log('Filas afectadas:', result.affectedRows);
    })
})

module.exports = router;