const fs = require('fs'); // Requerimos el módulo File System de Node
const path = require('path'); // Requerimos el módulo Path de Node
const bcrypt = require('bcrypt'); // Requerimos el módulo Bcrypt

const usuarios = JSON.parse(fs.readFileSync(path.resolve('./src/database/user.json'))); // Lee el archivo user.json
const rutaArchivoUsers = path.resolve('./src/database/user.json'); // Ruta del archivo user.json



module.exports = {
    showLoginUserForm: (req, res) => {
        return res.render('login'); // Renderiza la vista login.ejs
    },
    /** Muestra el formulario de registro de usuario */
    showCreateUserForm: (req, res) => { //
        res.render('register'); // Renderiza la vista register.ejs
    },
    /** Procesa el formulario de registro de usuario */
    processCreateUserForm: (req, res) => {
      let usuarioNuevo = { // Crea un objeto literal con los datos del usuario
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
      fs.writeFileSync(rutaArchivoUsers, JSON.stringify([...usuarios, usuarioNuevo], null, 2), "utf-8") // Escribe el archivo user.json
      console.log(usuarioNuevo); // Muestra el usuario creado en consola
      return res.send(usuarioNuevo); // Retorna el usuario creado
    },
    /** Muestra el formulario de edición de usuario */
    showEditUserForm: (req, res) => { 
      const usuarioEncontrado = usuarios.find(row => row.id == req.params.id); // Busca el usuario por id
      res.render('editUser', { usuarioEncontrado: usuarioEncontrado }); // Renderiza la vista editUser.ejs
    },
};