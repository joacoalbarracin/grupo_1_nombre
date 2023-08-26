// Requerimientos
const { validationResult } = require('express-validator');
const fs = require('fs'); // Requerimos el módulo File System de Node
const path = require('path'); // Requerimos el módulo Path de Node
const productos = JSON.parse(fs.readFileSync(path.resolve('./src/database/product.json'))); // Lee el archivo JSON
const rutaArchivo = path.resolve('./src/database/product.json'); // Ruta del archivo JSON
const db = require('../database/models')

    
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
    showProductList: async (req, res) => {
        try {
            const productos = await db.Product.findAll() //Busca todos los productos
            res.render('productList', { productos: productos }); // Muestra la vista productList.ejs
        } catch (error) {
            console.log(error)
        }
    },
    //Muestra la vista home.ejs dinámicamente con los productos filtrados por categoría
    showHome: (req, res) => { // Método home
        const imperdible = productos.filter ((row) => row.title == "Imperdibles"); // Filtra los productos por categoría
        const oportunidad = productos.filter ((row) => row.title == "Oportunidades"); // Filtra los productos por categoría
        const nueva = productos.filter ((row) => row.title == "Nuevas"); // Filtra los productos por categoría
        return res.render('home', {imperdibles: imperdible, oportunidades: oportunidad, nuevas: nueva, usuarioEncontrado : null}); // Muestra la vista home.ejs con los productos filtrados
    },
    //Muestra la vista productList.ejs dinámicamente con el producto encontrado como parámetro
    showDescription: async (req,res) => { // Método description
        try {
            const productoEncontrado = await db.Product.findByPk(req.params.id) //Busca todos los productos
            return res.render('productDetail', {productoEncontrado: productoEncontrado }) // Muestra la vista productList.ejs 
        } catch (error) {
            console.log(error)
        }
    },
    //Muestra la vista createProduct.ejs
    showCreateProductForm: (req,res) => {
        res.render('createProduct'); // Muestra la vista createProduct.ejs
    },
    //Procesa datos recibidos en [createProduct: (req, res) =>] lo agrega a la base de datos
    processCreateProductForm: async (req, res) => {
        try {
            await db.Product.create({
                ...req.body
            })
            return res.redirect("/products/list") // Redirecciona a la lista de productos
        } catch (error) {
            console.log(error)
        }
        /* let productoNuevo = { // Crea un objeto literal con los datos recibidos
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
        */
    },

    //Muestra la vista editProduct.ejs y el producto encontrado como parámetro
    showEditProductForm: async (req,res) => {
        try {
            const productoEncontrado = await db.Product.findByPk(req.params.id)
            return res.render('editProduct', {productoEncontrado: productoEncontrado}); // Muestra la vista editProduct.ejs con el producto encontrado
        } catch (error) {
            console.log(error);
        }
    },
    //Procesa datos recibidos en [editProduct: (req, res) =>] y modifica la base de datos
    processEditProductForm: async (req, res) => {
        try {
           await db.Product.update({
                ...req.body
            }, {
                where: {id : req.params.id}
            })
            return res.redirect("/products/list") // Redirecciona a la lista de productos
        } catch (error) {
            console.log(error)
        }
  
        /* const productoEncontrado = productos.find(row => row.id == req.params.id);  // Busca el producto por ID
        for (let propiedad in req.body) { // Recorre el objeto req.body
            productoEncontrado[propiedad] = req.body[propiedad]; // Asigna los valores del objeto req.body al producto encontrado
        };
        resultadoValidacion = validationResult(req)
        console.log(resultadoValidacion.errors)
        if(resultadoValidacion.errors.length > 0) {
            return res.render('editProduct', {errors:  resultadoValidacion.mapped(), oldData: req.body, productoEncontrado})
        }
        fs.writeFileSync(rutaArchivo, JSON.stringify(productos, null, 2), "utf-8") // Escribe el archivo JSON
        return res.redirect('/products/list') // Redirecciona a la vista de lista de productos */
    },
    //Hace ["borrado": true] en la base de datos
    deleteProduct: async (req, res) => {
        try {
            await db.Product.destroy({
                where: {id: req.params.id}
            })
        } catch (error) {
            console.log(error)
        }
        
        /* const productoEncontrado = productos.find(row => row.id == req.params.id); // Busca el producto por ID
        console.log(productoEncontrado)
        productoEncontrado.borrado = true; // Asigna el estado de borrado al producto encontrado
        fs.writeFileSync(rutaArchivo, JSON.stringify(productos, null, 2)); // Escribe el archivo JSON
        return res.send(console.log("hiii")); // Redirecciona a la vista home.ejs */
    },
    restoreProduct: async (req, res) => { //Queda hecho el metodo para restaurar un prod, faltaria hacer la vista y una ruta
        try {
           await db.Product.restore({
                where: {id: req.params.id}
            })
        } catch (error) {
            console.log(error)
        }
    }
};
