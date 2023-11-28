function auth(req, res, next) {
    if(req.user?.userId) return next()

    return res.sendStatus(401)
}

module.exports = auth