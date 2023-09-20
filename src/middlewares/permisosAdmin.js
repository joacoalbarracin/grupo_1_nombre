const permisosAdmin = (req,res,next) => {
    if (req.session.usuarioLogueado.userCategoryId != '2') {
        return res.redirect ('/')
    }
    else {
        next()
    }
}

module.exports = permisosAdmin