const permisosAdmin = (req,res,next) => {
    if (req.session.usuarioLogueado) {
        if(req.session.usuarioLogueado.userCategoryId == 2) {
            next()
        }
        else {
            return res.redirect('/')
        }
    }
    else {
        return res.redirect ('/')
    }
}

module.exports = permisosAdmin