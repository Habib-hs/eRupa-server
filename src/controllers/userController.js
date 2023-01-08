const {validationResult} = require("express-validator");
const UserModel = require("../models/userModel");
const { hashedPassword, comparePassword, createToken } = require("../services/authServices");
const {CreateError} = require("../utlis/error");

// @route POST /api/v1//register
// @access Public
// @desc Create user and return a token

exports.register =async (req,res,next)=>{
    const errors = validationResult(req);
    //--> If there is no validation error
 if(errors.isEmpty()){
    const {name, email, password} = req.body;
      try{
        const emailExist = await UserModel.findOne({email});
        //--> If is the unique email create user
         if(!emailExist){
               const hashPassword = await hashedPassword(password);
               const newUser = await UserModel.create({
                    name, email, password: hashPassword
               });
            
               const token = createToken({id: newUser._id, name: newUser.name});
               return res.status(201).json({msg: 'Your account has been created!', token});
          
         }else{
            //email already taken
            return next(CreateError(400, "email is already taken!"));
         }
      }catch(err){
        next(err);
      }
 }else{
      // validations failed
      return res.status(400).json({errors: errors.array()})
 }
}

// @route POST /api/v1/login
// @access Public
// @desc Login user and return a token
exports.login = async(req, res, next)=>{
  const errors = validationResult(req);
  //--> if there is no error in validation 
  if(errors.isEmpty()){
    try{
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});

        //--> if user exist 
         if(user){
             const isCorrerPassword = await comparePassword(password,user.password);
           //--> if user provided password is correct, generate token
             if(isCorrerPassword){
                const token = createToken({id: user._id, name: user.name});
                const {...other} = user._doc
                
                if(user.admin) {
                    return res.status(201).json({
                        mesg: "success",
                        token, admin: true,
                    ...other});
                 } else {
                    return res.status(201).json({ mesg: "success",
                    token, admin: false,
                ...other});
                 }
             }else{
                return res.status(400).json({errors: [{msg: 'password not matched!', param: 'password'}]})  
             }
         }else{
            return res.status(400).json({errors: [{msg: `${email} is not found!`, param: 'email'}]});
         }
    }catch(err){
         next(err);
    }
  }else{
 //  validations failed
 return res.status(400).json({errors: errors.array()})
  }
}