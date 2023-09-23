const db = require('../../database/models');
const { Product, ProductCategory } = db;

module.exports = {
  list: async (req, res) => {
    let response = {
      data: {
        count: 0,
        countByCategory: {},
        products: []
      }
    };
    try {
      const { count, rows: productos } = await Product.findAndCountAll();
      const categorias = await ProductCategory.findAll({
        include: [{ association: 'products' }]
      });

      response.data.count = count;
      response.data.countByCategory = {};
      categorias.forEach((categoria) => {
        response.data.countByCategory[categoria.name] = categoria.products.length;
      });

      response.data.products = productos.map((producto) => {
        return {
          id: producto.id,
          name: producto.name,
          category: producto.description.name,
          detail: `/api/products/${producto.id}`
        }
      })

      response.data.lastProduct = productos[productos.length - 1];
      return res.json(response);
    } catch (e) {
      console.log(e);
      response.msg = "Hubo un error"
      return res.json(response);
    }
  }
};