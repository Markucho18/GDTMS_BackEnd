const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { serialize } = require('cookie');

const secretKey = '48253755061145888295'

router.get('/', (req, res) =>{
    res.send("Que onda perro");
})

router.post("/create", (req, res)=>{
    try{
        const token = jwt.sign({ username: req.body.username }, secretKey, { expiresIn: '1h' });
        res.json({mensaje: "Token generado correctamente", token});
        console.log("El token se creo  todo piola");
    }
    catch(err){
        return res.json({mensaje: "Hubo un error al crear el token", err})
    }
})

router.post("/verify", (req, res)=>{
    try{
        jwt.verify(req.body.token, secretKey, (err, decoded)=>{
            if(err) return res.json({msg: "El token no es valido", err})
            else res.json({msg: "valido", info: decoded})
        })
    }
    catch(err){
        return res.json({mensaje: "Hubo un error al verificar el token", err})
    }
})

module.exports = router;