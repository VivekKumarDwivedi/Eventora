import User from '../models/User.js'
import bcrypt from 'bcryptjs';
import OTP from '../models/OTP.js'
import { sendOTPEmail } from '../utils/email.util.js';
import { generateOTP, generateToken } from '../utils/auth.util.js';

export async function registerUser(req, res){

     const { name, email, password} = req.body;

     // Check if user exits 
     const existingUser = await User.findOne({email});
     if (existingUser) return res.status(400).json({ message: 'User already exists'});
     
     const salt = await bcrypt.genSalt(10);
     // hash password 
    const hashedPassword = await bcrypt.hash(password,salt);
    try{
        // Create User
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'user',
            isVerified: false,
        });

       const otp = generateOTP();
        // send otp
        console.log(`OTP for ${email}: ${otp}`);

        await OTP.create({email, otp, action:'account_verification'});
        await sendOTPEmail(email,otp,'account_verification');

        res.status(201).json({
           message: 'OTP sent to email. Please verify.',
           email: user.email
        });
    } catch(error) {
        res.status(500).json({
            message: error.message,
        });
    }
    
}

export async function loginUser(req,res){

    const {email, password} = req.body;

    let user = await User.findOne({email});

    if(!user){
        return res.status(400).json({error: 'Invalid credentials, Please SignUp'});
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch) {
        return res.status(400).json({error: 'Invalid credentials, Please enter valid password'});
    }

    if(!user.isVarified && user.role === 'user'){
        const otp = generateOTP();

        await OTP.deleteMany({email, action: 'account_verification'});
        await OTP.create({email,otp,action: 'account_verification'});
        await sendOTPEmail(email,otp,'account_verification');

        return res.status(400).json({
            error: 'Account not verified. A new OTP has been sent to your email.'
        });
    }

    res.json({
        message: 'login successful',
        _id: user._id,
        name: user.name,
        email:user.email,
        role:user.role,
        token: generateToken(user._id, user.role),
    })

}

export async function verifyOtp(req,res){
    const {email, otp} = req.body;
    const otpRecord = await OTP.findOne({email, otp, action: 'account_verification'});

    if(!otpRecord) {
        return res.status(400).json({error:'Invalid or expired OTP'});
    }

    const user = await User.findOneAndUpdate({email},{isVerified: true});
    await OTP.deleteMany({email, action: 'account_verification'});

    res.json({
        message: 'Account verified successfully. You can now login.',
        _id: user._id,
        name: user.name,
        email:user.email,
        role:user.role,
        token: generateToken(user._id,user.role),
    });

}