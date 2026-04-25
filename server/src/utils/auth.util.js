import jwt from 'jsonwebtoken';

export const generateOTP = () => 
    Math.floor(100000 + Math.random() * 900000).toString();

export const generateToken = (id, role) => {
    return jwt.sign(
        { id, role },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );
};
