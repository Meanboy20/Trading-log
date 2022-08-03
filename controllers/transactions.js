const Transaction = require("../models/Transaction");
const colors = require("colors");

//@desc get all transactions
//@route GET /api/v1/transactoins
//@access Public
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({
      sucess: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

//@desc add transaction
//@route POST /api/v1/transactoins
//@access Public
exports.addTransactions = async (req, res, next) => {
  try {
    const transaction = await Transaction.create(req.body);
    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    if (error.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: message,
      });
    }
    console.log(error);
  }
};

//@desc delete all transactions
//@route DELETE api/v1/transactoins/:id
//@access Public
exports.deleteTransactions = async (req, res, next) => {
  try {
    await res.transaction.remove();
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//@desc update  transaction
//@route PATCH api/v1/transactoins/:id
//@access Public

exports.updateTransaction = async (req, res) => {
  if (req.body.ticker != null) {
    res.transaction.ticker = req.body.ticker;
  }

  if (req.body.strikePrice != null) {
    res.transaction.strikePrice = req.body.strikePrice;
  }

  if (req.body.stockPrice != null) {
    res.transaction.stockPrice = req.body.stockPrice;
  }

  if (req.body.type != null) {
    res.transaction.type = req.body.type;
  }

  if (req.body.premium != null) {
    res.transaction.premium = req.body.premium;
  }

  if (req.body.expirationDate != null) {
    res.transaction.expirationDate = req.body.expirationDate;
  }

  if (req.body.closePrice != null) {
    res.transaction.closePrice = req.body.closePrice;
  }

  try {
    const updateTransaction = await res.transaction.save();
    res.json(updateTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//middleware getID
exports.getTransactionById = async (req, res, next) => {
  let transaction;
  try {
    transaction = await Transaction.findById(req.params.id);
    if (transaction == null)
      return res.status(404).json({ message: "No such transaction" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.transaction = transaction;
  next();
};
