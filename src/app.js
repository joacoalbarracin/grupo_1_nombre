const express = require('express');
const app = express();
const mainRouter = require('./routes/mainRouter');

app.use(express.static('public'));

app.listen(3000, ()=>{
    console.log( 'Servidor corriendo en puerto 3000');
});

app.use("/",mainRouter);