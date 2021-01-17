const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    package:{
        type: Schema.Types.ObjectId,
        ref: 'packages',
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    travellers:{
        type: Number,
        default: 1
    },
    date:{
        type: Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('books',BookSchema);