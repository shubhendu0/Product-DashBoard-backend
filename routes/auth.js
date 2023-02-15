const router = require("express").Router();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

router.post("/register", async (req, resp) => {
    let user = await new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    jwt.sign({result}, process.env.JWT_SECRET_KEY, {expiresIn:"2h"},(err,token)=>{
        if(err){
            resp.send("Something went wrong")  
        }
        resp.send({ result, auth:token })
    })
})

router.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne({email : req.body.email});
        if(!user){
            return resp.send({ result: "No User found" })
        }
        if(req.body.password === user.password){
            jwt.sign({user}, process.env.JWT_SECRET_KEY, {expiresIn:"2h"}, (err, token)=>{
                if(err){
                    resp.send("Something went wrong")  
                }
                resp.send({user, auth:token})
            })
        } 
        else {
            resp.send({ result: "Incorrect Password" })
        }
    } 
    else {
        resp.send({ result: "Please fill the details." })
    }
});

module.exports = router;
