var mongoose = require('mongoose');
var label = new mongoose.Schema({
	content: {
        type: String,
        required: true
    }
});
UserSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.__v;
    return obj
};
module.exports = mongoose.model('Label', LabelSchema);