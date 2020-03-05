const mongoose = require('../bootstrap/db');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const OrderSchema = new Schema({
    book: {
        type: Schema.ObjectId,
        ref: 'Book', required: true, unique: false
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User', required: true, unique: false
    },
    quantity: {type: Number, required: true, min: 1},


}, {
    timestamps: true
});
OrderSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Order', OrderSchema);