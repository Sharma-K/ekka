const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    title: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model('cart', CartSchema);