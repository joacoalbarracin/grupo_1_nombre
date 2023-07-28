const { body } = require('express-validator')

module.exports = [
    body('name').notEmpty().withMessage('Indica tu nombre'),
    body('last_name').notEmpty().withMessage('Indica tu apellido'),
    body('email').isEmail().withMessage('Debes indicar un email válido'),
    body('password').isStrongPassword({minLenght: 8, minNumbers:1, minUpperCase:1, minLowerCase: 1, minSymbols:1}).withMessage('La contraseña debe tener mínimo 8 caracteres. Debe contener una mayúscula, una minúscula, un número y un caracter especial.'),
    body('opcion').notEmpty().withMessage('Debes elegir entre ser Comprador o Administrador')
]