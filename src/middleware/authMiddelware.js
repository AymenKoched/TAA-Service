import jwt from 'jsonwebtoken';
import { getEnv } from '@/utils';

function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, getEnv('JWT_SECRET'));
      const hasRole = allowedRoles.some(role => decoded.roles.includes(role));
      
      if (hasRole) {
        return next();
      }

      return res.status(403).json({ message: 'Forbidden' }); 
    } catch (err) {
      return res.status(403).json({ message: 'Forbidden' }); 
    }
  };
}

export default authorizeRoles;
