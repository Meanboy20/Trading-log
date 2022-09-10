const Transaction = require("../models/Transaction");
const colors = require("colors");

//@desc get all transactions
//@route GET /api/v1/transactoinsget
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
  // console.log(req.body);
  try {
    for (key in req.body) {
      console.log(req.body[key]);
      console.log(res.transaction[key]);
      key === "analysis"
        ? (res.transaction[key] = { ...res.transaction[key], ...req.body[key] })
        : (res.transaction[key] = req.body[key]);

      let { premium, closePremium, type, gainOrLoss, size } = res.transaction;
      // console.log("After loop key in body", res.transaction.key);
      if (closePremium !== undefined) {
        // console.log("calculate profit");
        switch (type) {
          case "Buy Call":
            gainOrLoss = (closePremium - premium) * size;
            break;

          case "Buy Put":
            // console.log("profit code run");
            gainOrLoss = closePremium - premium;
            break;

          case "Sell Call":
            gainOrLoss = premium - closePremium;
            break;

          case "Sell Put":
            gainOrLoss = premium - closePremium;
            break;

          default:
            gainOrLoss = 0;
        }
        res.transaction.gainOrLoss = gainOrLoss;
      }
    }
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
