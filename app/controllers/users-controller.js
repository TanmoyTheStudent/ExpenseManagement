const jwt = require('jsonwebtoken')
const usersCltr = {}

usersCltr.login = (req,res) =>{
    const body = req.body
    if(body.email == process.env.EMAIL && body.password == process.env.PASSWORD){
        const token = jwt.sign({id:process.env.ID},process.env.JWT_secret)
        res.json({
            token: token
        })
    }else {
        res.status(401).json({
            notice:'Invalid email/password'
        })
    }
}

module.exports = usersCltr