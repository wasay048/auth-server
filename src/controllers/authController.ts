import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tahirkhann';

export const signup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
  
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign(
            { 
                id: newUser._id.toString(),
                email: newUser.email,
                name: newUser.name 
            }, 
            JWT_SECRET, 
            { expiresIn: '24h' }
        );

        console.log('User signed up:', newUser.email);
        res.status(201).json({ 
            token, 
            user: { 
                id: newUser._id, 
                name: newUser.name, 
                email: newUser.email 
            } 
        });
    } catch (error) {
        console.error(' Signup error:', error);
        res.status(500).json({ message: 'Server error during signup' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
  
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { 
                id: user._id.toString(),
                email: user.email,
                name: user.name 
            }, 
            JWT_SECRET, 
            { expiresIn: '24h' }
        );

        console.log(' User logged in:', user.email);
        res.status(200).json({ 
            token, 
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email 
            } 
        });
    } catch (error) {
        console.error(' Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};