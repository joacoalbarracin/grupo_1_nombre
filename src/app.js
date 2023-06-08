const express = require('express');
const app = express();
const mainRouter = require('./routes/mainRouter');

app.use(express.static('public'));

app.listen(3001, ()=>{
    console.log( 'Servidor corriendo en puerto 3001');
});

app.use("/",mainRouter);