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
        default:""
    },
    del: {
        type: Number,
        required: true,
        default:0
    }
});
UserSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.__v;
    return obj
};
module.exports = mongoose.model('User', UserSchema);
