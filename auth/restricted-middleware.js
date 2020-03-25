module.exports = (req, res, next) => {
    //checks that we remember the client
    //that the client logged in already
    // console.log('session', req.session);

    if(req.session && req.session.user ){
        next();
    } else {
        res.status(401).json({ YOU: "You Must Login to see Users"})
    }
    
}