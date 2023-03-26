const mongoose = require('mongoose');
const { Schema } = mongoose;

const goldTransactionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  entityUser: { type: Schema.Types.ObjectId, ref: 'User' },
  quantity: { type: Number, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true, enum: ['CREDIT', 'DEBIT'] },
  status: {
    type: String,
    required: true,
    enum: ['FAILED', 'SUCCESS', 'WAITING', 'CANCELED', 'PENDING'],
  },
  runningBalance: {
    wallet: { type: Number, required: true },
    gold: { type: Number, required: true },
  }
},
{timestamps : true}
);
const GoldTransaction =  mongoose.model('GoldTransaction', goldTransactionSchema);
module.exports = GoldTransaction;
