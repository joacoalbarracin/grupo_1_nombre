const quiereRegistrarse = (req,res,next) => {
    if (req.session.usuarioLogueado) {
        return res.redirect ('/')
    }
    else {
        next()
    }
}

module.exports = quiereRegistrarse