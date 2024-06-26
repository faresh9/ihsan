//backend/controllers/authController.js
const express = require('express');
const router = express.Router();
const pool = require('../ihsanModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
//user registration
const addNewUser =  async (req, res) => {
try{
    const {username, email, password} = req.body;

    //check if user already exists
    const user = await pool.query('SELECT * FROM users Where email = $1', [email]);
    if(user.rows.length > 0){
        return res.status(401).json('User already exists');
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const id = uuidv4();
    //insert the user into the database
    const newUser = await pool.query(
        'INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
        [id, username, email, hashedPassword]
    );
     // Create a JWT token
     const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET);
     res.json({ token });
     console.log(token)
    
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
}
};


//user login
const userLogin = async (req, res) => {
    try{
        const {email, password} = req.body; 

        //check if user doesn't exist
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if(user.rows.length === 0){
            return res.status(401).json('Invalid Credential');
        }

        //check if password is correct
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if(!validPassword){
            return res.status(401).json('Invalid Credential');
        }

        // Create a JWT token
        const token = jwt.sign({ id: user.rows[0].id}, process.env.JWT_SECRET);
            res.json({ token });
        // verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
            console.log('Token is invalid');
            } else {
            console.log('Token is valid');
            console.log(decoded);
            }
        });

            
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }


}

module.exports = {
    addNewUser,
    userLogin
};