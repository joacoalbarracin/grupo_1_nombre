const fs = require('fs')


const logs = (req,res,next) => {
    fs.appendFileSync('logs.txt', 'Se ingreso en la página' + req.url + '\n', 'utf8')
    next()
}

module.exports = logs