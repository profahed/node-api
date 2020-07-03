const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.body.token;
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'secret');
    } catch (err) {
        err.statusCode = 500;
        return res.json(err);
    }
    if (!decodedToken) {
        const error = new Error('Not authorized!');
        error.statusCode = 401;
        return res.json(error);
    }
    req.userId = decodedToken.userId;
    next();
}