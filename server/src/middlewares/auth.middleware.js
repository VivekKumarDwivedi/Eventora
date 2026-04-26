import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// user authentication middleware
export async function protect(req, res,next){

    let token = req.headers.authorization && req.headers.authorization.startsWith('Bearer') 
        ? req.headers.authorization.split(' ')[1] 
        : null;

    if(token){
       try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.user = await User.findById(decoded.id).select('-password');

          if(!req.user){
            return res.status(401).json({message:'Unauthorized: User not found'});
          }
          next();
       } catch (error) {
             return res.status(401).json({message:'Unauthorized: Invalid token'});
       }
    }
};


export async function admin(req, res, next) {
    try {
        if (req.user && req.user.role === 'admin') {
            return next();
        } else {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}