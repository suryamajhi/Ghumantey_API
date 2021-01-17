const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PackageSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    destination:{
        type: Schema.Types.ObjectId,
        ref : 'destinations'
    },
    agency: {
        type: Schema.Types.ObjectId,
        ref: 'agencies'
    },
    price: {
        type: Number,
        required: true
    },
    image:{
        type: String
    },
    duration:{
        type: String,
        required: true
    },
    detail:{
        type: String,
        required: true
    },
    itenaries:[{
        type:Schema.Types.ObjectId,
        ref: 'itenaries'
    }],
    includes:[{
        type: Schema.Types.ObjectId,
        ref: 'includes'
    }],
    excludes:[{
        type: Schema.Types.ObjectId,
        ref: 'excludes'
    }]
});

module.exports = mongoose.model('packages',PackageSchema);
