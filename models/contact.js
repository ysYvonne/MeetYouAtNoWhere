var mongoose = require('mongoose');
var ContactSchema = new mongoose.Schema({
	name: {
        type: String,
        required: true
    },
     email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    }
});
ContactSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.__v;
    return obj
};
module.exports = mongoose.model('Contact', ContactSchema);