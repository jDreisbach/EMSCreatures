module.exports = (req, res, next) => {
    if (req.user.local.isAdmin){
        next();
    }else{
        res.status(403).send('<h1>ERROR</h1><br/><h1>403 Forbidden</h1><br/><br/><h3>You do not have access to this feature</h3>');
    }
};