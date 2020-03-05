const mongoose = require('../bootstrap/db');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const BookSchema = new Schema({
    title: { type: String, required: true ,unique: false },
    description: { type: String, required: false, unique: false },
    quantity: { type: Number, required: false, min: 0, max: 1000,default:0 },
    author: { type: String ,required: false},
    users:{ type: [Schema.Types.ObjectId], ref: 'User',required: false,default:[]}
}, {
    timestamps: true
});
BookSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Book', BookSchema);