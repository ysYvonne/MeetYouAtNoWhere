var mongoose = require('mongoose');
var follow = new mongoose.Schema({
	followerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
     followId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    }
});
UserSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.__v;
    return obj
};
module.exports = mongoose.model('Follow', FollowSchema);