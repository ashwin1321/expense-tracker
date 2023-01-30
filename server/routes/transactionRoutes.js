const express = require("express");
const { addTransaction, getTransactions } = require("../controllers/transactionCtrl");

const router = express.Router();

//ROUTES
// GET
router.get("/", getTransactions)

// POST
router.post("/add-transaction", addTransaction)


module.exports = router;
