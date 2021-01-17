const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AgencySchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    detail: {
        type: String,
    },
    logo :{
        type: String,
        required: true
    },
    packages: [{
        type: Schema.Types.ObjectId,
        ref: 'packages'
    }]
});

module.exports = mongoose.model('agencies', AgencySchema);
