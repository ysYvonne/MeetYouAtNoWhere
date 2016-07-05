var mongoose = require('mongoose');
var step = new mongoose.Schema({
    recipeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Recipe'
        required:true,
    }
	description: {
        type: String,
        required: true
    },
     photo: {
        type: String,
        default:""
    }
});
UserSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.__v;
    return obj
};
module.exports = mongoose.model('Step', StepSchema);