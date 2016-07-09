var mongoose = require('mongoose');
var LabelSchema = new mongoose.Schema({
	content: {
        type: String,
        required: true
    }
});
LabelSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.__v;
    return obj
};
module.exports = mongoose.model('Label', LabelSchema);