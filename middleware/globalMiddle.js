const authMidlle = (req, res, next) => {
    // Verifica se o usuário está na sessão
    if (req.session.user) {
        return next();
    }

    // Se não estiver autenticado, redirecione para a página de login
    res.redirect("/login");
};

module.exports = authMidlle;
