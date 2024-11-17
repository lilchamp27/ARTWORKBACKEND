const JWT = require('jsonwebtoken');

exports.isAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized, no token' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized, invalid token' });
    }
};
