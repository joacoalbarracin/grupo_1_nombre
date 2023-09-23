const db = require('../../database/models');
const User = db.User;

module.exports = {
  list: async (req, res) => {
    let response = { data: {} };
    try {
      const usuarios = await User.findAll();
      response.data.count = usuarios.length;
      response.data.users = usuarios.map((usuario) => {
        return {
          id: usuario.id,
          name: usuario.name,
          email: usuario.email,
          detail: `/api/users/detail/${usuario.id}`
        }
      })
      return res.json(response);

    } catch (e) {
      response.msg = "Hubo un error!";
      return res.json(response);
    }
  },

  detail: async (req, res) => {
    let response = {};
    try {
      const findUser = await User.findByPk(req.params.id, { attributes: { exclude: ["password"] } });
      if (!findUser){
        throw new Error("User not found")
      }
      response.meta = {
        status: 200,
        total: 1,
        url: `/api/users/detail/${req.params.id}`,
      };
      response.data = findUser;
      response.data.image = `/public/img/${findUser.image}`
      return res.json(response);
    } catch (error) {
      console.error("Error finding user:", error);
      response.meta = {
        status: 404,
        total: null,
        url: `/api/users/detail/${req.params.id}`
      };
      response.msg = `User not found`; 
      return res.status(404).json(response);
    }
  },
}