const path = require('path');

const controller = {
    home: (req, res) => {
        res.sendFile(path.resolve('./views/home.html'))
    },
    login: (req, res) => {
        res.sendFile(path.resolve('./views/login.html'))
    },
    productCart: (req, res) => {
        res.sendFile(path.resolve('./views/productCart.html'))
    },
    productDetail: (req, res) => {
        res.sendFile(path.resolve('./views/productDetail.html'))
    },
    register: (req, res) => {
        res.sendFile(path.resolve('./views/register.html'))
    },

};

module.exports = controller;