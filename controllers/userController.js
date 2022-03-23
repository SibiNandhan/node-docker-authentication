const USER=require('./../models/userModel')
const bcrypt=require('bcryptjs');


exports.signup=async(req,res)=>{
 try{

    const {username,password}=req.body;

    const userExist=await USER.find({username:username});

    if(userExist.length!=0){
        return res.json({
            
            message:'User Already Exists'
        })
    }
    else{

        const password_hashed=await bcrypt.hash(password,10)
         
        const User=await USER.create({username,password:password_hashed})
        req.session.user=User;
        res.json({
            status:'success',
            User:User
        })

    }


 }
 catch(err){
     res.status(400).json({
         status:'fail',
         error:err
     })
 }
   

}


exports.Login=async(req,res)=>{
try{

    const {username,password}=req.body;
    const findUser=await USER.find({username:username})
    

     
    if(findUser.length){
        const passwordCorrect=await bcrypt.compare(password,findUser[0].password);
        if(passwordCorrect){
        req.session.user=findUser
        res.status(200).json({
            status:'Success',
            data:{
                id:findUser[0]._id,
                username:username
            }
        })
        }
        else{
        throw new Error('Invalid Username or Password')
        }
    }
   
   else{
        res.status(400).json({
            status:'Failure',
            message:'Invalid username or password'
        })
    }
}
catch(err){
    res.status(400).json({
        status:'Failure',
        error:err
    })
}
}