const db = require('../../database/models');
const Product = db.Product
const ProductCategory = db.ProductCategory

module.exports = {
    list: async (req, res) => {
        let response = {};
        try {

            const [productos, categorias] = await Promise.all([Product.findAll(), ProductCategory.findAll({ include: [{ association: "products" }] })])
            response.count = productos.length 
            response.countByCategory = {}
            categorias.forEach((categoria) => {
                response.countByCategory[categoria.name] = categoria.products.length
            });
            response.products = productos.map ((producto) => {
                return {
                    id: producto.id,
                    name: producto.name,
                    categogry: producto.description,
                    detail: `/api/products/${producto.id}`
            }
    })
    return res.json(response);

    } catch (e) {
        console.log(e)
        response.msg = "Hubo un error"
        return res.json(response)
    }
        
    }
}
