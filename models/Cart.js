const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
