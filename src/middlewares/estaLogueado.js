const estaLogueado = (req,res,next) => {
    if (req.session.usuarioLogueado) {
        return res.redirect ('/')
    }
    else {
        next()
    }
}

module.exports = estaLogueado