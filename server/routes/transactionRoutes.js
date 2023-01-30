const express = require("express");
const { addTransaction, getTransactions } = require("../controllers/transactionCtrl");

const router = express.Router();

//ROUTES
// GET
router.post("/get-transaction", getTransactions)

// POST
router.post("/add-transaction", addTransaction)


module.exports = router;
