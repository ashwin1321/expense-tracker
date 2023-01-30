const transactionModel = require("../models/transactionModel");
const moment = require('moment');

const getTransactions = async (req, res) => {

    try {
        const { userid, frequency, customDate, type } = req.body;
        const transactions = await transactionModel.find({

            ...(frequency !== 'custom' ? {
                date: {
                    $gt: moment().subtract(Number(frequency), 'd').toDate()
                }

            } : {
                date: {
                    $gte: customDate[0],
                    $lte: customDate[1]
                }
            }),

            userid: req.body.userid,

            ...(type !== 'all' ? {
                type: type
            } : {})
        });
        res.status(200).json(transactions)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

}

const addTransaction = async (req, res) => {

    try {
        const newTransaction = new transactionModel(req.body);
        await newTransaction.save();
        res.status(201).send('transaction created')

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

}

module.exports = { getTransactions, addTransaction }