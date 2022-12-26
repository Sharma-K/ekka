const mongoose= require('mongoose');
const Schema = mongoose.Schema;
const ImageSchema = new Schema({
    url: String,
    filename: String
})


const CartSchema = new Schema({
    pid: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    title: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    qty:{
        type: Number,
        default:1
    },
    images: [ImageSchema]
})

module.exports = mongoose.model('cart', CartSchema);