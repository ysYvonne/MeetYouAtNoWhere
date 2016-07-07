var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
     password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default:""
    },
	nickname: {
        type: String,
        required: true
    },
    birth: {
        type: Date,
        required: false
    },
  	intro: {
        type: String,
        default:"这家伙超级懒，什么都没有留下。"
    }
});
UserSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.__v;
    delete obj.password;
    return obj
};

function compare(data1, data2, callback) {

    if(!callback) {
        throw "No callback function was given."
    }
    process.nextTick(function() {
        var result = null;
        var error = null;
        try {
            result =(data1===data2?true:false);
        } catch(err) {
            error = err;
        }
        callback(error, result);
    });
};

UserSchema.methods.verifyPassword = function (password, cb) {

    compare(password,this.password,function (err, isMatch) {
        if (err)
            return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
