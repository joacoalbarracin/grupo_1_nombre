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
                //ver id //ver id //ver id //ver id //ver id
                id : req.body.id.length + 1,
                productName : req.body.name,
                productDescription : req.body.description,
                title : req.body.name,
                location : req.body.location,
                price : req.body.price,
                discount : req.body.discount,
                date : req.body.date,
                time : req.body.time,
                maximumCapacity : req.body.maximumCapacity,
                duration : req.body.duration,
                productCategory : req.body.opcion,
                image : req.file.image
            })
            return res.redirect("/products/list") // Redirecciona a la lista de productos
        } catch (error) {
            console.log(error)
        }
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
                productName : req.body.name,
                productDescription : req.body.description,
                title : req.body.name,
                location : req.body.location,
                price : req.body.price,
                discount : req.body.discount,
                date : req.body.date,
                time : req.body.time,
                maximumCapacity : req.body.maximumCapacity,
                duration : req.body.duration,
                productCategory : req.body.opcion,
                image : req.body.image
            }, {
                where: {id : req.params.id}
            })
            return res.redirect("/products/list") // Redirecciona a la lista de productos
        } catch (error) {
            console.log(error)
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await db.Product.destroy({
                where: {id: req.params.id}
            })
        } catch (error) {
            console.log(error)
        }
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
