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
  },
  detail: async (req, res) => {
    let response = {};
    try {
      const findProduct = await Product.findByPk(req.params.id);
      if (!findProduct){
        throw new Error("User not found")
      }
      response.meta = {
        status: 200,
        total: 1,
        url: `/api/products/detail/${req.params.id}`,
      };
      response.data = findProduct;
      response.data.image = `/img/${findProduct.image}`
      return res.json(response);
    } catch (error) {
      console.error("Error finding user:", error);
      response.meta = {
        status: 404,
        total: null,
        url: `/api/products/detail/${req.params.id}`
      };
      response.msg = `Product not found`; 
      return res.status(404).json(response);
    }
  },
};