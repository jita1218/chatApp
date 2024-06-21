import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId , res) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: '15d',
        });
    
    
        res.cookie('jwt', token, {
            httpOnly: true, // to prevent cookie access from JavaScript
            maxAge: 15 * 24 * 60 * 60 * 1000,
            sameSite:"strict",
            secure: process.env.NODE_ENV !== 'production' ,
        });
        
    } catch (error) {
            console.error('Error generating token or setting cookie:', error);
            res.status(500).send('Internal Server Error');
    }

};

export default generateTokenAndSetCookie;