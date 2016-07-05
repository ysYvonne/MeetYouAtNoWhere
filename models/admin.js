var mongoose = require('mongoose');
var admin = new mongoose.Schema({
	username: {
        type: String,
        required: true
    },
     password: {
        type: String,
        required: true
    }
});
UserSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.__v;
    return obj
};
module.exports = mongoose.model('Admin', AdminSchema);