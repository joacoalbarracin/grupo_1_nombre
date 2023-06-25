const fs = require('fs');
const express = require('express');
const path = require('path');
const router = express.Router();

const productos = JSON.parse(fs.readFileSync(path.resolve('./src/database/product.json')));



    
module.exports = {
    home: (req, res) => {
        res.render('home');
    },
    description: (req,res) => {
        const productoEncontrado = productos.find(row => row.id == req.params.id);
        if (productoEncontrado && productoEncontrado.borrado != true) return res.render('productList', { producto: productoEncontrado })
        else return res.send("ERROR 404 NOT FOUND");
    },

    create: (req, res) => {
        return res.render('createProduct')
    },
    processCreate: (req, res) => {
        let productoNuevo = {
            "id": productos.length+1, 
            "name": req.body.name,
            "description": req.body.description,
            "price": req.body.price,
            "image": req.file.filename,
            "category": req.body.category,
            "borrado": false,
        }
        fs.writeFileSync(rutaArchivo, JSON.stringify([...productos, productoNuevo], null, 2), "utf-8")
        return res.redirect("/products/create")
    },


    login: (req, res) => {
        res.render('login');
    },
    productCart: (req, res) => {
        res.render('productCart');
    },
    productDetail: (req, res) => {
        res.render('productDetail');
    },
    register: (req, res) => {
        res.render('register');
    },
    productList: (req, res) => {
        res.render('productList');
    },
    editProduct: (req,res) => {
        res.render('editProduct');
    },
    createProduct: (req,res) => {
        res.render('createProduct');
    }
};
