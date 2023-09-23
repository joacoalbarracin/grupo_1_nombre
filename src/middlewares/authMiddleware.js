const authMiddleware = (req, res, next) => {
    // Determina si el usuario está logueado o no
    res.locals.user = req.session.usuarioLogueado || null;
    next();
};

module.exports = authMiddleware;
