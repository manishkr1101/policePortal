const checkAdmin = (req, res, next) => {
    // next();
    if(req.isAuthenticated()){
        if(typeof req.user.admin != 'undefined' && req.user.admin == 1){
            next();
        }
        else{
            res.send('User not Authorized')
        }
        
    }
    else{
        res.redirect('/login')
    }
}

module.exports = checkAdmin;