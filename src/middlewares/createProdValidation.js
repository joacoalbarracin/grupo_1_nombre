const { body } = require('express-validator')

module.exports = [
    body('name').notEmpty().withMessage('Indica el nombre del producto'),
    body('description').isLength({min: 20, max:240}).withMessage('La descripción debe tener un mínimo de 20 caracteres y un máximo de 240'),
    body('image').notEmpty().withMessage('Adjunte la imagen del producto'),
    body('price').isFloat({min:5}).withMessage('El precio debe ser mayor a 5 USD'),
    body('discount').isFloat({min:1}).withMessage('El precio debe ser mayor a 1%'),
]