const express = require('express');

const app = express();

const path = require('path');

app.use(express.static('public'));


app.get('/carrito', (req,res) => {
    res.sendFile(path.join(__dirname,"views/productCart.html"))
})

app.get('/producto', (req,res) => {
    res.sendFile(path.join(__dirname,"views/productDetail.html"))
})

<<<<<<< HEAD
=======
app.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname,"views/login.html"))

})

>>>>>>> 07dbcc303c03f345718a7bece2c72e47e0fa1cef
app.get('/register', (req,res) => {
    res.sendFile(path.join(__dirname,"views/register.html"))
})

<<<<<<< HEAD
=======



>>>>>>> 07dbcc303c03f345718a7bece2c72e47e0fa1cef
app.listen(3000, ()=>{
    console.log( 'Servido corriendo en puerto 3000'
    )
}
)