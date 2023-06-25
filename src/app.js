const express = require('express');
const path = require('path');
const app = express();
const mainRouter = require('./routes/mainRouter');
app.use(express.urlencoded({extended: false})); //para leer lo que llega en el req.body
app.use(express.json()); //para leer lo que llega en el req.body

app.use(express.static('public'));

app.set('views', path.join(__dirname,'../views'));

app.set('view engine', 'ejs');

app.listen(3001, ()=>{
    console.log( 'Servidor corriendo en puerto 3001');
});


app.use(mainRouter);