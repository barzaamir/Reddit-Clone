const {Schema,model} = require('mongoose');

const postSchema = new Schema({
    userId:{type: Schema.Types.ObjectId, ref:"users"},
    comments:[{type: Schema.Types.ObjectId, ref:"comments"}],
    likes:[{type: Schema.Types.ObjectId, ref:"likes"}],
    uname:String,
    title:String,
    text:String,
    img:String,
    url:String,
    time:Date,
    visibility:Boolean
})

const Posts = model('posts',postSchema);

module.exports = Posts;