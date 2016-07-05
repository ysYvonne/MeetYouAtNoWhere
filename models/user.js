var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
	nickname: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    birth: {
        type: Date,
        required: true,
        default:Date.now
    },
    password: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
  	intro: {
        type: String,
        default:"这家伙超级懒，什么都没有留下。"
    }
});
UserSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.__v;
    return obj
};
module.exports = mongoose.model('User', UserSchema);
