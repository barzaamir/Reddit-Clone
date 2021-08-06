const {Schema,model} = require('mongoose');

const userSchema = new Schema({
    uname: String,
    password: String,
    email: String,
    key: String,
    salt: String,
    isVerified: Boolean,
    time:Date,
    posts:[{type: Schema.Types.ObjectId, ref:"posts"}],
    likes:[{type: Schema.Types.ObjectId, ref:"likes"}],
    comments:[{type: Schema.Types.ObjectId, ref:"comments"}],
    replies:[{type: Schema.Types.ObjectId, ref:"replies"}]
})

const Users = model('users',userSchema);

module.exports = Users;