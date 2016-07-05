var mongoose = require('mongoose');
var recipe_Label = new mongoose.Schema({
	recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Recipe',
        required: true
    },
     labelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Label',
        required: true
    }
});
UserSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.__v;
    return obj
};
module.exports = mongoose.model('Recipe_Label', Recipe_LabelSchema);