const fs = require('fs');
const express = require('express');
const path = require('path');
const router = express.Router();


const usuarios = JSON.parse(fs.readFileSync(path.resolve('./src/database/user.json')));
const rutaArchivoUsers = path.resolve('./src/database/user.json');

//const bcrypt = require('bcryptjs');

module.exports = {
    login: (req, res) => {
      return res.render('login');
    },

    /* 
    processLogin: (req, res) => {
        if  en base de datos => res.redirect("/perfil")
        else{
            "No estas registrado"
        },
    */
    
    register: (req, res) => {
        res.render('register');
    },
    processRegister: (req, res) => {
      let usuarioNuevo = {
        "id": usuarios.length + 1,
        "name": req.body.name,
        "lastName": req.body.last_name,
        "email": req.body.email,
        "password": bcrypt.hashSync(req.body.password, 10),
        "image": req.file.filename,
        "category": req.body.category,
        "borrado": false,
      }
      fs.writeFileSync(rutaArchivoUsers, JSON.stringify([...usuarios, usuarioNuevo], null, 2), "utf-8")
      return res.redirect("/userCreate");
    },
};
  