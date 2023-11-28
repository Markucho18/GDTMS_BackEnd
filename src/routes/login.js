const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const db = require('../db');

router.get("/", (req, res)=> res.send("Estas en /login"))

router.post("/password", (req, res)=>{
    const password = req.body.password;
    const query = 'SELECT password FROM usuarios WHERE username = ?'
    db.query(query, [req.body.username], (err, result)=>{
        if(err) return res.json({mensaje: "Hubo un error al consultar SQL", error: err})
        if(result.length > 0){
            const hashedPassword = result[0].password
            bcrypt.compare(password, hashedPassword, (compError, passwordMatch) =>{
                if (compError) return res.status(500).json({ mensaje: "Error al comparar contraseñas", error: compError });
                if (passwordMatch) return res.send(true);
                else return res.send(false);
            })
        }
        else return res.json({mensaje: "No se encontro nada", resultado: result})
    })
})

//PROBAR CON UNA VARIABLE DE ESTADO COMO DIJO SHAGGY


module.exports = router;
