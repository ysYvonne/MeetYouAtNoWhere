var mongoose = require('mongoose');
var like = new mongoose.Schema({
	recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Recipe',
        required: true
    },
     userId: {
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
module.exports = mongoose.model('Like', LikeSchema);