const {Schema,model} = require('mongoose');

const commentSchema = new Schema({
    postId:{type: Schema.Types.ObjectId, ref:"posts"},
    comment:String,
    userId:{type: Schema.Types.ObjectId, ref:"users"},
    replies:[{type: Schema.Types.ObjectId, ref:"replies"}],
    uname:String,
    time:Date,
    visibility:Boolean
})

const Comments = model('comments',commentSchema);

module.exports = Comments;