const {Schema,model} = require('mongoose');

const likeSchema = new Schema({
    postId:{type: Schema.Types.ObjectId, ref:"posts"},
    userId:{type: Schema.Types.ObjectId, ref:"users"},
    uname:String,
    like:Boolean,
    dislike:Boolean,
    time:Date,
    visibility:Boolean
})

const Likes = model('likes',likeSchema);

module.exports = Likes;