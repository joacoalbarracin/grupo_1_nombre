const fs = require('fs');
const express = require('express');
const path = require('path');
//const router = express.Router();
const bcrypt = require('bcrypt');



const usuarios = JSON.parse(fs.readFileSync(path.resolve('./src/database/user.json')));
const rutaArchivoUsers = path.resolve('./src/database/user.json');



module.exports = {
    login: (req, res) => {
        return res.render('login');
    },
    /** Muestra el formulario de registro de usuario */
    register: (req, res) => {
        res.render('register');
    },
    /** Procesa el formulario de registro de usuario */
    processRegister: (req, res) => {
      let usuarioNuevo = {
        "id": usuarios.length+1,
        "name": req.body.name,
        "lastName": req.body.last_name,
        "email": req.body.email,
        "password": bcrypt.hashSync(req.body.password, 10),
        "repeatPassword": bcrypt.hashSync(req.body.repeat_password, 10),
        "image": req.file.image,
        "category": req.body.opcion,
        "borrado": false,
      }
      fs.writeFileSync(rutaArchivoUsers, JSON.stringify([...usuarios, usuarioNuevo], null, 2), "utf-8")
      console.log(usuarioNuevo);
      //return res.redirect("/userCreate");
      return res.send(usuarioNuevo);
    },
    /** Muestra el formulario de edición de usuario */
    editUser: (req, res) => { 
      const usuarioEncontrado = usuarios.find(row => row.id == req.params.id)
      res.render('editUser', { usuarioEncontrado: usuarioEncontrado });
    },
};