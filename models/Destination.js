const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DestinationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image :{
        type:String
    },
    packages:[{
        type: Schema.Types.ObjectId,
        ref: 'packages'
    }]

})

module.exports =mongoose.model('destinations', DestinationSchema);