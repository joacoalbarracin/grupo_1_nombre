const fs = require('fs'); // Requerimos el módulo File System de Node
const path = require('path'); // Requerimos el módulo Path de Node
const bcrypt = require('bcrypt'); // Requerimos el módulo Bcrypt
const mainController = require('./mainController'); // Requerimos el controlador mainController
const { validationResult } = require('express-validator'); // Requerimos el módulo express-validator
const usuarios = JSON.parse(fs.readFileSync(path.resolve('./src/database/user.json'))); // Lee el archivo user.json
const rutaArchivoUsers = path.resolve('./src/database/user.json'); // Ruta del archivo user.json
const db = require('../database/models')

module.exports = {
    showLoginUserForm: (req, res) => {
        return res.render('login'); // Renderiza la vista login.ejs
    },
    processLoginUserForm: (req, res) => {
      const usuarioEncontrado = usuarios.find(row => row.email == req.body.email); // Busca el usuario por id
     console.log (usuarioEncontrado)
     console.log (bcrypt.compareSync(req.body.password, usuarioEncontrado.password))
      if (usuarioEncontrado && bcrypt.compareSync(req.body.password, usuarioEncontrado.password)) {
        delete usuarioEncontrado.password //Borramos la contraseña de lo que guardamos
        req.session.usuarioLogueado = usuarioEncontrado; // Crea la sesión del usuario
        if (req.body.cookie){
          res.cookie('recordame', usuarioEncontrado.email, {maxAge: 1000*60*60}) //Dura una hora la cookie
        }
      console.log(req.session.usuarioLogueado)
        return res.render('profile', { usuarioEncontrado: usuarioEncontrado }); // Renderiza la vista profile.ejs
      }
      //Se construyen los errores
      else {
        return res.render("login", {
          errors: {
            datosMal: {
              msg: "Datos incorrectos"
            }
          }
        })
      }
    },
      showProfile: (req, res) => {
      const usuarioEncontrado = req.session.usuarioLogueado; // Busca el usuario por id
        return res.render('profile', { usuarioEncontrado: usuarioEncontrado }); // Renderiza la vista profile.ejs
    },
  
  
    /** Muestra el formulario de registro de usuario */
    showCreateUserForm: (req, res) => { //
        res.render('register'); // Renderiza la vista register.ejs
    },
    /** Procesa el formulario de registro de usuario */
    processCreateUserForm: async (req, res) => {
      try {
          await db.User.create({
              ...req.body
          })
          return res.redirect('/users/login')
      } catch (error) {
          console.log(error)
      }

      /* let usuarioNuevo = { // Crea un objeto literal con los datos del usuario
        "id": usuarios.length+1, // Genera un id único
        "name": req.body.name, // Toma el dato del campo name
        "lastName": req.body.last_name, // Toma el dato del campo last_name
        "email": req.body.email, // Toma el dato del campo email
        "password": bcrypt.hashSync(req.body.password, 10), // Toma el dato del campo password
        "repeatPassword": bcrypt.hashSync(req.body.repeat_password, 10), // Toma el dato del campo repeat_password
        "image": req.file.image, // Toma el dato del campo image
        "category": req.body.opcion, // Toma el dato del campo opcion
        "borrado": false, // Crea un campo borrado con valor false
      }
      const resultadoValidacion = validationResult(req) //Guarda un obj literal con los erroes
      console.log(resultadoValidacion.errors)

      if(resultadoValidacion.errors.length > 0) {
        return res.render('register', { errors:  resultadoValidacion.mapped(), oldData: req.body})
      }
      fs.writeFileSync(rutaArchivoUsers, JSON.stringify([...usuarios, usuarioNuevo], null, 2), "utf-8") // Escribe el archivo user.json
      */
    },
    /** Muestra el formulario de edición de usuario */
    showEditUserForm: async (req,res) => {
      try {
          const usuarioEncontrado = await db.User.findByPk(req.params.id)
          return res.render('editUser', {usuarioEncontrado: usuarioEncontrado}); // Muestra la vista editProduct.ejs con el producto encontrado
      } catch (error) {
          console.log(error);
      }
    },
    /** Procesa el formulario de edición de usuario */
    processEditUser: async (req, res) => {
      try {
        await db.User.update({
            ...req.body
        }, {
            where: {id : req.params.id}
        })
        return res.redirect("/") // Redirecciona a la lista de productos
      } catch (error) {
          console.log(error)
      }
       /*const usuarioEncontrado = usuarios.find(row => row.id == req.params.id);  // Busca el producto por ID
      for (let propiedad in req.body) { // Recorre el objeto req.body
          usuarioEncontrado[propiedad] = req.body[propiedad]; // Asigna los valores del objeto req.body al producto encontrado
      };
      fs.writeFileSync(rutaArchivoUsers, JSON.stringify(usuarios, null, 2), "utf-8") // Escribe el archivo JSON
      //return res.redirect('/') // Redirecciona a la vista home.ejs
      return res.send(usuarioEncontrado)
      */
    },
        //Hace ["borrado": true] en la base de datos
        deleteUser: (req, res) => { 
          const usuarioEncontrado = usuarios.find(row => row.id == req.params.id); // Busca el producto por ID
          usuarioEncontrado.borrado = true; // Asigna el estado de borrado al producto encontrado
          fs.writeFileSync(rutaArchivoUsers, JSON.stringify(usuarios, null, 2)); // Escribe el archivo JSON
          return res.send(usuarioEncontrado);
          /**Terminar de ver este método. Cheqeuar el action del form de editUser.ejs y
           *  chequear también que deberia estar el buttom submit de delete apuntando a este método y la url a la indicada en el userRoutes.js
           */
      },
  };