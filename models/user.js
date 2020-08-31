const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    pic:{
      type:String,
      default:"https://res.cloudinary.com/namanmadridcloud/image/upload/v1598784605/profile-default_o83aaw.png"
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
});

module.exports = mongoose.model('User', userSchema);