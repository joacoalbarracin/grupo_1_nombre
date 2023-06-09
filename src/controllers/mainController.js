const path = require('path');

const controller = {
    home: (req, res) => {
        res.render(path.resolve('./views/home.ejs'))
    },
    login: (req, res) => {
        res.render(path.resolve('./views/login.ejs'))
    },
    productCart: (req, res) => {
        res.render(path.resolve('./views/productCart.ejs'))
    },
    productDetail: (req, res) => {
        res.render(path.resolve('./views/productDetail.ejs'))
    },
    register: (req, res) => {
        res.render(path.resolve('./views/register.ejs'))
    },

};

module.exports = controller;