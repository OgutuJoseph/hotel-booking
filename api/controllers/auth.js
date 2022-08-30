import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    try {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        
        const newUser = User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })


        await newUser.save();
        res.status(200).send('User has been created succesffully!');
    } catch (error) {
        next(error)
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })

        if (!user) 
            return next(createError(404, 'User not found!'))
        
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) 
            return next(createError(400, 'Wrong username or password.'))

        // // -- # Normal Res #
        // res.status(200).send(user);

        // // -- # To hide password and isAdmin fields and only return the other details; you can choose what fields to hide and which to show #
        // const { password, isAdmin, ...otherDetails } = user._doc;
        // res.status(200).send({...otherDetails});

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)

        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie('access_token', token, {
            httpOnly: true,        
        // }).status(200).send({...otherDetails});

        // // -- # To return the token as part of the response, optionally you can check it from the cokkies as it is also stored there #
        }).status(200).send({ details: { ...otherDetails, },  token, isAdmin});
    } catch (error) {
        next(error)
    }
};