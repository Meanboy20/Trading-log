const express = require("express");
const {
  getTransactions,
  addTransactions,
  deleteTransactions,
  getTransactionById,
  updateTransaction,
  addCase,
} = require("../controllers/transactions");

const router = express.Router();

router.route("/").get(getTransactions).post(addTransactions);

router.route("/:id").delete(getTransactionById, deleteTransactions);

router.route("/edit/:id").patch(getTransactionById, updateTransaction);

router.route("/newIdea").post(addCase);

module.exports = router;
