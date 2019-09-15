const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema(
    {
        name : {
            type:String,
            required:[true,'Name is required']
        },
        email : {
            type:String,
            required:[true,'Email is required']
        }
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model("user", userSchema);