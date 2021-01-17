const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName:{
        type:String,
        required: true
    },

    lastName:{
        type:String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    books:[{
        type: Schema.Types.ObjectId,
        ref: 'books'
    }]
});

module.exports = mongoose.model('users', UserSchema);