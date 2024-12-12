export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
        } else {
        res.status(403).json({ error: 'Access denied. Admin rights required.' });
        }
    };
    
    export const isUser = (req, res, next) => {
        if (req.user && req.user.role === 'user') {
        next();
        } else {
        res.status(403).json({ error: 'Access denied. User rights required.' });
        }
    };