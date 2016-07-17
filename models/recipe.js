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
        type: String,
        required: true
    },
    makeTime:{
        type: String,
        required: true
    },
    peopleNum:{
        type: String,
        required:true
    },
    steps: {
        type: String,
        required: true
    },
    level:
    {
        type:String,
    },
    labels:
    {
        type: String,
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
    noMeat:{
        type: Boolean,
        default:false
    },
    noSugar:{
        type: Boolean,
        default:false
    },
    lowFat:{
        type: Boolean,
        default:false
    },
    spicy:{
        type: Boolean,
        default:false
    },
    noLactose:{
        type: Boolean,
        default:false
    },
    lowCal:{
        type: Boolean,
        default:false
    },
  	likeNum: {
        type: Number,
        required: true,
        default:0
    },
    status:{
        type:Number,
        required:true,
        default:0
    }
});
RecipeSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.__v;
    return obj
};
module.exports = mongoose.model('Recipe', RecipeSchema);
