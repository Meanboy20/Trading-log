const mongoose = require("mongoose");
const enteryPointSchema = new mongoose.Schema({
  Macro: { type: Boolean },
  RR: { type: Boolean },
  Time: { type: Boolean },
});

const analysisSchema = new mongoose.Schema({
  Target: { type: Boolean },
  RR: { type: Boolean },
  Time: { type: Boolean },
});

const TransactionSchema = new mongoose.Schema({
  rating: {
    type: Number,
    trim: true,
    required: [false],
  },
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

  account: {
    type: String,
    trim: true,
  },

  stockPrice: {
    type: Number,
    trim: true,
    required: [true, "pls enter stock price"],
  },

  expirationDate: {
    type: Date,
    trim: true,
    required: [false],
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

  size: {
    type: Number,
    trim: true,
    required: [true, "enter size"],
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

  note: {
    type: String,
    required: [false],
  },

  createAt: {
    type: Date,
    default: Date.now,
  },

  analysis: {
    EntryPoint: enteryPointSchema,
    Target: { type: Number },
    Account: { type: String },
    BreakEven: { type: Number },
    StopLoss: { type: Number },
    RRratio: { type: String },
    ClosingPlan: { type: String },

    Reality: { type: String },
    Category: { type: String },
    Review: { type: String },
    chart: { type: Array },
    Rolling: [
      {
        date: { type: Date },
        credit: { type: Number },
        debit: { type: Number },
      },
    ],
    other: { type: String },
  },
});

module.exports = mongoose.model("transaction", TransactionSchema);
