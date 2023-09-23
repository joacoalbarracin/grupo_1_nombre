const db = require('../../database/models');
const Product = db.Product
const ProductCategory = db.ProductCategory

module.exports = {
    list: async (req, res) => {
        let response = {data:{}};
        try {

            const [productos, categorias] = await Promise.all([Product.findAll(), ProductCategory.findAll({ include: [{ association: "products" }] })])
            response.data.count = productos.length 
            response.data.countByCategory = {}
            categorias.forEach((categoria) => {
                response.data.countByCategory[categoria.name] = categoria.products.length
            });
            response.data.products = productos.map ((producto) => {
                return {
                    id: producto.id,
                    name: producto.name,
                    category: producto.description.name,
                    detail: `/api/products/${producto.id}`
            }
    })

    response.data.lastProduct = productos[productos.length - 1]
    return res.json(response)
   

    } catch (e) {
        console.log(e)
        response.msg = "Hubo un error"
        return res.json(response)
    }
        
    }
}
