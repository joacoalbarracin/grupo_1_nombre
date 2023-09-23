const db = require('../../database/models');
const User = db.User

module.exports = {
    list: async (req, res) => {
        let response = {data:{}}; //inicializa
        try {
        const usuarios = await User.findAll()
        response.data.count = usuarios.length
        response.data.users = usuarios.map((usuario) => {
            return {
            id: usuario.id,
            name: usuario.name,
            email: usuario.email,
            detail: `api/users/${usuario.id}` 
            }
        })
        return res.json(response)

        } catch (e) {
        response.msg = "Hubo un error!"
        return res.json(response)
        }
    },

    detail: async (req, res) => {
    let response = {};
    try {
      const findUser = await User.findByPk(req.params.id, {attributes: {exclude: ["password"]}});
      response.meta = {
        status: 200,
        total: findUser.length,
        url: `/api/users/${req.params.id}`,
      };
      response.data = findUser;
      response.data.image = `/public/img/${findUser.image}`
      return res.json(response);
    } catch (error) {
      console.error("Error finding user:", error);
      response.meta = {
        status: 500,
        total: null,
        url: `/api/users/${req.params.id}`
      };
      response.msg = `Oops! Something went wrong while finding the user with ID: ${req.params.id}`; 
      return res.status(500).json(response);
    }
  },
}

