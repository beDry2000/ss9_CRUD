import User from '../models/userModel';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//@ desc Register User
//@route POST /api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400)
        throw new Error('Please provide a username and password');
    }

    // check username
    const userExists = await User.findOne({ username });
    if (userExists) {
        res.status(400)
        throw new Error('Username already exists');
    }

    //hashed password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        ...req.body,
        password: hashedPassword
    })

    if (!user) {
        res.status(400)
        throw new Error('Invalid credentials');
    }

    res.status(200).json({
        username,
        id: user._id
    })
})

//@ desc Login User
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400)
        throw new Error('Please provide a username and password');
    }

    // check username
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            username,
            id: user._id,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials');
    }
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

export  {registerUser, loginUser}