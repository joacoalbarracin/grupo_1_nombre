const fs = require('fs')
const path = require('path')
const usuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/user.json')))

const logMiddleware = (req,res,next) => {
    const user = usuarios.find((row) => row.id == req.params.id)
    if (user.logueado == true) {
        next()
    }
    else {
        return res.redirect ('/users/login')
    }
}

module.exports = logMiddleware