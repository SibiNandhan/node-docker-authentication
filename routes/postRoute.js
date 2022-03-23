
const express=require('express');
const postController=require('./../controllers/postController');
const protect=require('./../controllers/authMiddleware')

const router=express.Router()




router.route('/getAllPost').get(protect,postController.getAllPosts)

router.route('/createPost').post(protect,postController.createPosts)

router.route('deletePost').delete(protect,postController.deletePost)

router.put('/updatePost/:id',protect,postController.updatePost)

router.get('/getPost/:id',protect,postController.getPostsById)

module.exports=router;
