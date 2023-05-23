const express = require('express');

const app = express();

const path = require('path');

app.use(express.static('public'));


app.get('/carrito', (req,res) => {
    res.sendFile(path.join(__dirname,"views/productCart.html"))
})

app.listen(3000, ()=>{
    console.log( 'Servido corriendo en puerto 3000'
    )
}
)