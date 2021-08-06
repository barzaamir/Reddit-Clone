const {Schema,model} = require('mongoose');

const replySchema = new Schema({
    commentId:{type: Schema.Types.ObjectId, ref:"comments"},
    userId:{type: Schema.Types.ObjectId, ref:"users"},
    postId:{type: Schema.Types.ObjectId, ref:"posts"},
    reply:String,
    uname:String,
    time:Date,
    visibility:Boolean
})

const Replies = model('replies',replySchema);

module.exports = Replies;