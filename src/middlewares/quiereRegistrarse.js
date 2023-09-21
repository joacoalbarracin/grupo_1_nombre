const { body } = require('express-validator');
const User = require('../database/models/User'); // importar el modelo de usuario

module.exports = [
  body('email')
    .notEmpty().withMessage('Debes indicar tu email')
    .isEmail().withMessage('El email ingresado no es válido'),
  body('password')
    .notEmpty().withMessage('Debes indicar tu contraseña')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
    .custom((value, { req }) => {
      return User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
          return Promise.reject('El correo electrónico ingresado no está registrado');
        }
        return user.comparePassword(value).then(valid => {
          if (!valid) {
            return Promise.reject('La contraseña ingresada es incorrecta');
          }
        });
      });
    })
];