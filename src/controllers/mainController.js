// Requerimientos
const { validationResult } = require('express-validator');
const fs = require('fs'); // Requerimos el módulo File System de Node
const path = require('path'); // Requerimos el módulo Path de Node
const productos = JSON.parse(fs.readFileSync(path.resolve('./src/database/product.json'))); // Lee el archivo JSON
const rutaArchivo = path.resolve('./src/database/product.json'); // Ruta del archivo JSON


    
module.exports = { // Exportamos un objeto literal con todos los métodos
    //Muestra la vista productCart.ejs
    showProductCart: (req, res) => {
        res.render('productCart'); // Muestra la vista productCart.ejs
    },
    //Muestra la vista register.ejs
    showProductRegisterForm: (req, res) => {
        res.render('register'); // Muestra la vista register.ejs
    },
    //Muestra la vista productList.ejs
    showProductList: (req, res) => {
        res.render('productList'); // Muestra la vista productList.ejs
    },
    //Muestra la vista home.ejs dinámicamente con los productos filtrados por categoría
    showHome: (req, res) => { // Método home
        const imperdible = productos.filter ((row) => row.title == "Imperdibles"); // Filtra los productos por categoría
        const oportunidad = productos.filter ((row) => row.title == "Oportunidades"); // Filtra los productos por categoría
        const nueva = productos.filter ((row) => row.title == "Nuevas"); // Filtra los productos por categoría
        return res.render('home', {imperdibles: imperdible, oportunidades: oportunidad, nuevas: nueva, usuarioEncontrado : null}); // Muestra la vista home.ejs con los productos filtrados
    },
    //Muestra la vista productList.ejs dinámicamente con el producto encontrado como parámetro
    showDescription: (req,res) => { // Método description
        const productoEncontrado = productos.find(row => row.id == req.params.id); // Busca el producto por ID
        if (productoEncontrado && !productoEncontrado.borrado) { // Si el producto existe y no está borrado
            console.log(productoEncontrado);
            return res.render('productDetail', { productoEncontrado: productoEncontrado }); // Muestra la vista productList.ejs con el producto encontrado
        } else { 
            return res.send("ERROR 404 NOT FOUND"); // Si el producto no existe o está borrado, muestra el mensaje de error
  
        }

    },
    //Muestra la vista createProduct.ejs
    showCreateProductForm: (req,res) => {
        res.render('createProduct'); // Muestra la vista createProduct.ejs
    },
    //Procesa datos recibidos en [createProduct: (req, res) =>] lo agrega a la base de datos
    processCreateProductForm: (req, res) => {
        let productoNuevo = { // Crea un objeto literal con los datos recibidos
            "id": productos.length+1, // Asigna un ID al producto
            "name": req.body.name, // Asigna el nombre del producto
            "description": req.body.description, // Asigna la descripción del producto
            "image": req.file.filename, // Asigna la imagen del producto
            "price": req.body.price, // Asigna el precio del producto
            "category": req.body.opcion, // Asigna la categoría del producto
            "discount": req.body.discount, // Asigna el descuento del producto
            "borrado": false, // Asigna el estado de borrado del producto
        }
        const resultadoValidacion = validationResult(req) //Guarda un obj literal con los erroes
        console.log(resultadoValidacion.errors)

        if(resultadoValidacion.errors.length > 0) {
            return res.render('createProduct', {errors:  resultadoValidacion.mapped(), oldData: req.body})
        }
        fs.writeFileSync(rutaArchivo, JSON.stringify([...productos, productoNuevo], null, 2), "utf-8"); // Escribe el archivo JSON
        return res.redirect("/products/list") // Redirecciona a la lista de productos

    },

    //Muestra la vista editProduct.ejs y el producto encontrado como parámetro
    showEditProductForm: (req,res) => {
        const productoEncontrado = productos.find(row => row.id == req.params.id); // Busca el producto por ID
        res.render('editProduct', {productoEncontrado: productoEncontrado}); // Muestra la vista editProduct.ejs con el producto encontrado
    },
    //Procesa datos recibidos en [editProduct: (req, res) =>] y modifica la base de datos
    processEditProductForm: (req, res) => {
        const productoEncontrado = productos.find(row => row.id == req.params.id);  // Busca el producto por ID
        for (let propiedad in req.body) { // Recorre el objeto req.body
            productoEncontrado[propiedad] = req.body[propiedad]; // Asigna los valores del objeto req.body al producto encontrado
        };
        resultadoValidacion = validationResult(req)
        console.log(resultadoValidacion.errors)
        if(resultadoValidacion.errors.length > 0) {
            return res.render('editProduct', {errors:  resultadoValidacion.mapped(), oldData: req.body, productoEncontrado})
        }
        fs.writeFileSync(rutaArchivo, JSON.stringify(productos, null, 2), "utf-8") // Escribe el archivo JSON
        //return res.redirect('/') // Redirecciona a la vista home.ejs
        return res.send(productoEncontrado)
    },
    //Hace ["borrado": true] en la base de datos
    deleteProduct: (req, res) => { 
        const productoEncontrado = productos.find(row => row.id == req.params.id); // Busca el producto por ID
        console.log(productoEncontrado)
        productoEncontrado.borrado = true; // Asigna el estado de borrado al producto encontrado
        fs.writeFileSync(rutaArchivo, JSON.stringify(productos, null, 2)); // Escribe el archivo JSON
        return res.send(console.log("hiii")); // Redirecciona a la vista home.ejs
    },
};
