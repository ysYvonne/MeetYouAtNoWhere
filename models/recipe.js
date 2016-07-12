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
    meterials: {
        type:String,
    },
    description: {
        type: String,
        required: true
    },
    calorie: {
        type: Number,
        required: true
    },
    makeTime:{
        type: Number,
        required: true
    },
    peopleNum:{
        type: Number,
        required:true
    },
    steps: {
        type: String,
        ref:'Step',
        required: true
    },
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
    }
});
RecipeSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.__v;
    return obj
};
module.exports = mongoose.model('Recipe', RecipeSchema);
