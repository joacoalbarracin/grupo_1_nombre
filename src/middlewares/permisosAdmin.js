const permisosAdmin = (req,res,next) => {
    if (req.session.usuarioLogueado.category !== 'Administrador') {
        return res.redirect ('/')
    }
    else {
        next()
    }
}

module.exports = permisosAdmin