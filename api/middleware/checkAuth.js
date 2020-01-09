const checkAuth = (req, res, next) => {
    // next();
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.redirect('/login')
    }
}

module.exports = checkAuth;