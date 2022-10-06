const mongoose = require("mongoose");

const CaseSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true],
  },
  description: {
    type: String,
    trim: true,
    required: [true],
  },
  identify: {
    type: String,
    trim: true,
    required: [true],
  },
  chart: [
    {
      type: String,
      required: [false],
    },
  ],
});

module.exports = mongoose.model("case", CaseSchema);
