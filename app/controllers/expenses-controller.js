const Expense = require('../models/expense-model')
const { validationResult} = require('express-validator')
const expensesCltr = {}

//es6--promise
    // expensesCltr.list = (req, res) => {
    //     Expense.find()
    //         .then((expenses) => {
    //             res.json(expenses)
    //         })
    //         .catch((err) => {
    //             res.json(err) 
    //         })
    // }


//es7
expensesCltr.list = async (req, res) => {
   try{
    const expenses=Expense.find()
            res.json(expenses)
    }catch(err) {
        console.log(err)
         res.status(500).json({notice:"internal server error"}) 
    }
}


//es6--promise
// expensesCltr.create = (req, res) => {
//     const errors = validationResult(req) 
//     if(!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() })
//     }
//     const body = req.body 
//     const exp = new Expense(body)
//     exp.save()
//         .then((expObj) => {
//             res.json(expObj)
//         })
//         .catch((err) => {
//             res.json(err)
//             console.log(err)
//         })
// }

//es7
expensesCltr.create = async (req, res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const body = req.body 
    const expense = new Expense(body)
    
    try{
      await expense.save()
         res.status(201).json(expense)
        }catch(err) {
            console.log(err)
            res.status(500).json({notice:"internal server error"})
        }
}


//es6--promise
// expensesCltr.update = (req, res) => {
//     if(!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() })
//     }
//     const id = req.params.id 
//     const body = req.body 
//     Expense.findByIdAndUpdate(id, body, { new: true, runValidators: true })
//         .then((exp) => {
//             res.json(exp)
//         })
//         .catch((err) => {
//             res.json(err)
//         })
// }

//es7--async await
expensesCltr.update = async (req, res) => {
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const id = req.params.id 
    const body = req.body 
    
    try{
    const expense= Expense.findByIdAndUpdate(id, body, { new: true})
            res.json(expense)
        }catch(err) {
            console.log(err)
            res.status(500).json({notice:"Internal server error"})
        }
}


//es6-- promise
// expensesCltr.destroy = (req, res) => {
//     const id = req.params.id 
//     Expense.findByIdAndDelete(id) 
//         .then((exp) => {
//             res.json(exp)
//         })
//         .catch((err) => {
//             res.json(err)
//         })
// }


//es7
expensesCltr.destroy = async (req, res) => {
    const id = req.params.id 
    try{
     const expense=Expense.findByIdAndDelete(id) 
            res.json(expense)
        }catch(err) {
            console.log(err)
            res.status(500).json({notice:"Internal server error"})
        }
}

module.exports = expensesCltr 