const express = require('express');
const router = express.Router();

const accountRouter=require('./account');
const passwordRouter=require('./password');
const postRouter=require('./post');
const commentRouter=require('./comment');
const likeRouter=require('./like');
const replyRouter=require('./reply');

router.use('/account',accountRouter);
router.use('/password',passwordRouter);
router.use('/post',postRouter);
router.use('/comment',commentRouter);
router.use('/like',likeRouter);
router.use('/reply',replyRouter);

module.exports=router;