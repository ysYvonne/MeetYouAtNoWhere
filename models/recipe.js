var mongoose = require('mongoose');
var RecipeSchema = new mongoose.Schema({
	name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default:""
    },
    meterial: [{
        type: String,
        required: true
    }],
    descirption: {
        type: String,
        required: true
    },
    calorie: {
        type: Number,
        required: true
    },
    step: [{
        type: String,
        required: true
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    time: {
        type: Date,
        required: true,
        default:Date.now
    },
  	likeNum: {
        type: Number,
        required: true,
        default:0
    },
    favorateNum: {
        type: Number,
        required: true,
        default:0
    },
    del: {
        type: Number,
        required: true,
        default:0
    }
});
RecipeSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.__v;
    return obj
};
module.exports = mongoose.model('Recipe', RecipeSchema);
