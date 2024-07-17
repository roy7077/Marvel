const User=require('../Models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();

//signup
exports.signUp=async (req,res)=>{
    try{

        console.log("hello");
        //fetching all data from req body
        const{
            username,
            phoneNumber,
            password,
            confirmPassword,
        }=req.body;

        //cheking are there all fields
        if(!username || !phoneNumber || !password || !confirmPassword)
        {
            return res.status(400).json({
                success:false,
                message:"Fill all details",
            })
        }

        //password and confirmPassword should be same
        if(password!=confirmPassword)
        {
            return res.status(400).json({
                success:false,
                message:"Password and confirmPassword values does not match"
            })
        }

        //check user already exist or not
        const isUserPresent=await User.findOne({phoneNumber});
        if(isUserPresent)
        {
            return res.status(400).json({
                success:false,
                message:"User is already Registered"
            })
        }

        //hash password
        const hashedPassword=await bcrypt.hash(password,10);

        //creating entry in User DB
        const user = await User.create({
            username,
            phoneNumber,
            password: hashedPassword, // Save the hashed password
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${username}${username}`,
        });

        //return response
        return res.status(200).json({
            success:true,
            message:"User registered SuccessFully"
        })
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:error.message,
        })
    }
}

//login
exports.login=async (req,res)=>{
    try{
        //fetch data from req body
        const {phoneNumber,password}=req.body;
        
        //console.log("email -> ",email);
        //if fields are absent
        if(!phoneNumber || !password)
        {
            return res.status(400).json({
                success:false,
                message:"Entr all fields"
            })
        }

        //check user exist or not
        const user=await User.findOne({phoneNumber});
        if(!user)
        {
            return res.status(400).json({
                success:false,
                message:"User is not registered , please signUp first"
            })
        }

        //passward matching
        if(await bcrypt.compare(password,user.password))
        {
            const payLoad={
                phoneNumber:user.phoneNumber,
                id:user._id,
            }

            const token=jwt.sign(payLoad,process.env.JWT_SECRET,{
                expiresIn:"4h",
            })

            user.token=token;
            user.password=undefined;

            //create cookies and send
            const options={
                expries:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }

            return res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"User logged in SuccessFully"
            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:error.message,
        })
    }
}