const express = require('express');
const user = require('../models/signup')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = express.Router();
const jwttoken = require('jsonwebtoken')
const jtoken = 'SHIVAMGUPTA';
const fatchuser = require('../middle/middleware')


// this is sigup api
router.post('/signup', [
    body('name', "Enter your valid name").isLength({ min: 3 }),
    body('email', "Enter ypur valid email").isEmail(),
    body('mobile', "Enter your valid number").isLength({ max: 10, min: 10 }),
    body('password', "Enter valid password").isLength({ min: 5 })
], async (req, res) => {
    let success = true
    const error = validationResult(req);
    if (!error.isEmpty()) {
        success = false
        return res.status(400).json({ error: error.array() });
    }
    try {
        const checkemail = await user.findOne({ email: req.body.email })
        if (checkemail) {
            success = false
            return res.status(400).json({ error: "Email already exits" })
        }
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.password.toString(), salt);

        const User = await user.create({
            name: req.body.name.toString(),
            email: req.body.email.toString(),
            mobile: req.body.mobile.toString(),
            password: hash,
        })

        let data = {
            user: {
                _id: User.id
            }
        }

        const authtoken = jwttoken.sign(data, jtoken);
        res.json({ authtoken, success })

    } catch (error) {
        success = false
        console.log(error)
        return res.status(500).json({ error: "some error accure" })
    }

})

// this is login api
router.post('/login', [
    body('email', "Enter your valid email").isEmail(),
    body('password', "Enter your valid password").isLength({ min: 5 })
], async (req, res) => {
    let success = true
    const error = validationResult(req);
    if (!error.isEmpty()) {
        success = false
        return res.status(400).json({ error: error.array() });
    }
    try {
        const email = req.body.email;
        const password = req.body.password;
        const emailcheck = await user.findOne({ email })
        if (!emailcheck) {
            success = false
            return res.status(400).json("Enter your valid email")
        }
        const resq = bcrypt.compareSync(password.toString(), emailcheck.password);
        console.log(resq)
        if (!resq){
            success = false
            return res.status(400).json({ error: "Enter your valid password" })
        }
        let data = {
            user: {
                _id: emailcheck.id
            }
        }
        const authtoken = jwttoken.sign(data, jtoken);
        res.json({ authtoken , success })

    } catch (error) {
        success= false
        console.log(error)
        return res.status(500).json({ error: "some creatusers accure" })
    }
})

router.post('/getuser' ,fatchuser,async (req,res)=>{
    try {
        const userid = req.user;
        const userd = await user.findById(userid).select('-password')
        res.send(userd)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal problrm"})
    }    
})

module.exports = router;