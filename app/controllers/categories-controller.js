const Category = require('../models/category-model')
const { validationResult } = require('express-validator')
const categoriesCltr = {}

//es6-- promise
    // categoriesCltr.list = (req, res) => {
    //     Category.find()
    //         .then((categories) => {
    //             res.json(categories)
    //         })
    //         .catch((err) => {
    //             res.json(err)
    //         })
    // }

//es7
categoriesCltr.list = async (req, res) => {
    try{
        const category=await Category.find()
            res.json(category)
        }catch(err){
            console.log(err)
            res.status(500).json({notice:"internal server error"})
        }
}

//es6-promise
    // categoriesCltr.create = (req, res) => {
    //     const errors = validationResult(req) 
    //     if(!errors.isEmpty()) {
    //         return res.status(400).json({ errors: errors.array() })
    //     }
    //     const body = req.body  // const { body } = req 
    //     const c1 = new Category() 
    //     c1.name = body.name
    //     c1.save()
    //         .then((cat) => {
    //             res.json(cat)
    //         })
    //         .catch((err) => {
    //             res.json(err)
    //         })
    // }

//es7 -async await
categoriesCltr.create = async (req, res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const body = req.body  // const { body } = req 
    const category = new Category(body) 
    try{
        await category.save()
            res.status(201).json(category)
        }catch(err) {
            console.log(err)
            res.status(500).json({notice:"internal server error"})
        }
}

//es6-promise
    // categoriesCltr.update = (req, res) => {
    //     const errors = validationResult(req) 
    //     if(!errors.isEmpty()) {
    //         return res.status(400).json({ errors: errors.array() })
    //     }
    //     const id = req.params.id 
    //     const body = req.body 
    //     Category.findByIdAndUpdate(id, body, { new: true, runValidators: true  })
    //         .then((cat) => {
    //             res.json(cat)
    //         })
    //         .catch((err) => {
    //             res.json(err)
    //         })
    // }

//es7-async await
categoriesCltr.update = async (req, res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const id = req.params.id 
    const body = req.body 
    
    try{
    const category=Category.findByIdAndUpdate(id, body, { new: true })
        res.json(category)
        }catch(err){
            console.log(err)
            res.status(500).json({notice:"Internal server error"})
        }
}

//es6 promise
    // categoriesCltr.destroy = (req, res) => {
    //     const id = req.params.id 
    //     Category.findByIdAndDelete(id)
    //         .then((cat) => {
    //             if(cat) {
    //                 res.json(cat) 
    //             } else {
    //                 res.status(404).json({ error: 'record not found'})
    //             }
                
    //         })
    //         .catch((err) => {
    //             res.json(err)
    //         })
    // }

//es7
categoriesCltr.destroy = async (req, res) => {
    const id = req.params.id 
    
    try{
        const category= await Category.findByIdAndDelete(id)
                res.json(category) 
            
        }catch(err) {
            console.log(err)
            res.status(500).json({notice:"internal server error"})
        }
}

module.exports = categoriesCltr


