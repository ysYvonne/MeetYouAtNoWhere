var mongoose = require('mongoose');
var OwnSchema = new mongoose.Schema({
	recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Recipe',
        required: true
    },
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    status:{
    	type:Number,
    	required:true,
    	default:0
    }
});
OwnSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.__v;
    return obj
};
module.exports = mongoose.model('Own', OwnSchema);