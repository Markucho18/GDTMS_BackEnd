const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db')
const cookieParser = require('cookie-parser');

const secretKey = '48253755061145888295'

router.get('/', (req, res) =>{
    res.send("Que onda ");
})

router.use(cookieParser());

router.post("/create", (req, res)=>{
    try{
        const {username, password} = req.body
        const token = jwt.sign({ username: username, password: password }, secretKey, { expiresIn: '1h' });
        if(token){
            const query = 'UPDATE usuarios SET token = ? WHERE username = ?'
            db.query(query, [token, username], (err, result)=>{
                if(err) res.json({msg: "Hubo un error al actualizar el token", err})
                else res.json({msg: "El token se creo correctamente", result, token});
            })
        }
    }
    catch(err){
        return res.json({mensaje: "Hubo un error al crear el token", err})
    }
})

router.post("/verify", (req, res)=>{
    const {token} = req.body
    try{
        const query = 'SELECT token FROM usuarios WHERE token = ?'
        db.query(query, [token], (err, result)=>{
            if(err) res.json({msg: "El token no se encontro en la base de datos", err})
            else{
                jwt.verify(token, secretKey, (error, decoded)=>{
                    if(error) res.json({valido: false, err})
                    else res.json({valido: true, info: decoded})
                })
            }
        })
    }
    catch(err){
        return res.json({mensaje: "Hubo un error al verificar el token", err})
    }
})

module.exports = router;