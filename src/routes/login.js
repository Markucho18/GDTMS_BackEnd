const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const db = require('../db');

const secretKey = '48253755061145888295'

router.use(cookieParser());

router.get("/", (req, res)=> res.send("Estas en /login"))

router.post("/password", (req, res)=>{
    const password = req.body.password;
    const query = 'SELECT password FROM usuarios WHERE username = ?'
    db.query(query, [req.body.username], (err, result)=>{
        if(err) return res.json({mensaje: "Hubo un error al consultar SQL", error: err})
        if(result.length > 0){
            console.log(result)
            const hashedPassword = result[0].password
            bcrypt.compare(password, hashedPassword, (compError, passwordMatch) =>{
                if (compError) return res.status(500).json({ mensaje: "Error al comparar contraseñas", error: compError });
                console.log(passwordMatch)
                if (passwordMatch) return res.send(true);
                else return res.send(false);
            })
        }
        else return res.json({mensaje: "No se encontro nada", resultado: result})
    })
})

router.post("/token", (req, res)=>{
    try{
        const token = jwt.sign({ username: req.body.username }, secretKey, { expiresIn: '1h' });
        res.cookie('jwt', token, { httpOnly: false, maxAge: 60 * 60 * 1000 }); 
        res.json({mensaje: "Token generado correctamente", token});
    }
    catch(err){
        return res.json({mensaje: "Hubo un error con el token", error: err})
    }
})


module.exports = router;
