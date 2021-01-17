const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const IncludeSchema = new Schema({
    package: {
        type: Schema.Types.ObjectId,
        required: true
    },
    value: {
        type: String
    }
});

module.exports = mongoose.model('includes', IncludeSchema);