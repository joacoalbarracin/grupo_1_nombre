const logMiddleware = (req,res,next) => {
    if (!req.session.usuarioLogueado) {
        return res.redirect ('/users/login')
    }
    else {
        next()
    }
}

module.exports = logMiddleware
//aaa