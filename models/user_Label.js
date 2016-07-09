var mongoose = require('mongoose');
var User_LabelSchema = new mongoose.Schema({
	userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
     labelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Label',
        required: true
    }
});
User_LabelSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.__v;
    return obj
};
module.exports = mongoose.model('User_Label', User_LabelSchema);