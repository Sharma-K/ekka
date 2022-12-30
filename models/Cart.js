const mongoose= require('mongoose');
const Schema = mongoose.Schema;
const ImageSchema = new Schema({
    url: String,
    filename: String
})


const CartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
    
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
    images: [ImageSchema],
    total: {
        type: Number    
    }
})

module.exports = mongoose.model('cart', CartSchema);