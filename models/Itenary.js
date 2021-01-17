const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItenarySchema = new Schema({
    package:{
        type: Schema.Types.ObjectId,
        ref: 'packages'
    },
    heading:{
        type: String
    },
    details: {
        type: String
    }
});

module.exports = mongoose.model('itenaries', ItenarySchema);