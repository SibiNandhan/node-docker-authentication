const POST=require('./../models/postModel');

exports.getAllPosts=async(req,res,next)=>{
    try{
        const posts=await POST.find();
        res.status(200).json({
            status:'success',
            results:posts.length,
            data:posts
        })
    }
   catch(err){
      
    res.status(400).json({
        status:'fail',
        message:err
    })
    
   }
}

exports.getPostsById=async(req,res,next)=>{
    try{
        const post=await POST.findById(req.params.id);
        res.status(200).json({
            status:'success',
            data:post
        })
    }
   catch(err){
      
    res.status(400).json({
        status:'fail',
        message:err
    })
    
   }
}


exports.createPosts=async(req,res,next)=>{
    try{
        const {title,body}=req.body;
        const post=await POST.create({
            title,
            body
        })
        res.status(200).json({
            status:'success',
            data:post
        })
    }
   catch(err){
      
    res.status(400).json({
        status:'fail',
        message:err
    })
    
   }
}



exports.updatePost=async(req,res,next)=>{
    try{
        const post=await POST.findByIdAndUpdate(req.params.id,{
            title:req.body.title,
            body:req.body.body

        },{
            new:true,
            runValidators:true
        });
        res.status(200).json({
            status:'success',
            data:post
        })
    }
   catch(err){
      
    res.status(400).json({
        status:'fail',
        message:err
    })
    
   }
}
exports.deletePost=async(req,res,next)=>{
    try{
        const post=await POST.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status:'success',
            
        })
    }
   catch(err){
      
    res.status(400).json({
        status:'fail',
        message:err
    })
    
   }
}