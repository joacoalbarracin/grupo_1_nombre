const fs = require('fs');
const express = require('express');
const path = require('path');
const router = express.Router();


const productos = JSON.parse(fs.readFileSync(path.resolve('./src/database/product.json')));
const rutaArchivo = path.resolve('./src/database/product.json')


    
module.exports = {
    home: (req, res) => {
        const imperdible = productos.filter ((row) => row.title == "Imperdibles");
        const oportunidad = productos.filter ((row) => row.title == "Oportunidades");
        const nueva = productos.filter ((row) => row.title == "Nuevas");
        return res.render('home', {imperdibles: imperdible, oportunidades: oportunidad, nuevas: nueva});
    },
    description: (req,res) => {
        const productoEncontrado = productos.find(row => row.id == req.params.id);
        if (productoEncontrado && !productoEncontrado.borrado) {
            return res.render('productList', { producto: productoEncontrado });
        } else {
            return res.send("ERROR 404 NOT FOUND");
        }
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
        //res.send(productoNuevo);
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
        const productoEncontrado = productos.find(row => row.id == req.params.id)
        res.render('editProduct', {productoEncontrado: productoEncontrado});
    },
    processEdit: (req, res) => {
        const productoEncontrado = productos.find(row => row.id == req.params.id);
        for (let propiedad in req.body) {
            productoEncontrado[propiedad] = req.body[propiedad];
        };
        fs.writeFileSync(rutaArchivo, JSON.stringify(productos, null, 2), "utf-8")
        return res.redirect('/')
    },
    createProduct: (req,res) => {
        res.render('createProduct');
    },
    deleteProduct: (req, res) => {
        const productoEncontrado = productos.find(row => row.id == req.params.id)
        productoEncontrado.borrado = true
        fs.writeFileSync(rutaArchivo, JSON.stringify(productos, null, 2))
        return res.redirect('/')
    },
};
