const db = require('../../database/models');
const Product = db.Product

module.exports = {
    list: async (req, res) => {
        let response = {};
        try {

            const [productos, categorias] = await Promise.all([Product.findAll(), Category.findAll({ include: [{ association: "products" }] })])
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
        response.msg = "Hubo un error"
        return res.json(response)
    }
        
        }
}
