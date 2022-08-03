const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  ticker: {
    type: String,
    trim: true,
    required: [true, "enter ticker"],
  },
  type: {
    type: String,
    trim: true,
    required: [true, "pls enter type"],
  },

  stockPrice: {
    type: Number,
    trim: true,
    required: [true, "pls enter stock price"],
  },

  expirationDate: {
    type: Date,
    trim: true,
    required: [true, "enter date"],
  },

  strikePrice: {
    type: Number,
    required: [true, "enter strike price"],
  },

  premium: {
    type: Number,
    trim: true,
    required: [true, "enter premium"],
  },

  closePrice: {
    type: Number,
    required: [false],
  },

  closePremium: {
    type: Number,
    required: [false],
  },

  closeDate: {
    type: Date,
    required: [false],
  },

  gainOrLoss: {
    type: Number,
    required: [false],
  },

  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("transaction", TransactionSchema);
