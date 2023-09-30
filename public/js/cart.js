document.addEventListener('DOMContentLoaded', async function() {
    let carritoStorage = []
    const carritoInit = function () {
        if (!JSON.parse(localStorage.getItem("cart"))) {
          localStorage.setItem("cart", JSON.stringify(carritoStorage));
        } else {
          carritoStorage = JSON.parse(localStorage.getItem("cart"));
        }
      };
      carritoInit();
console.log(carritoStorage)

const generarCarrito = async function () {
    const consultas = carritoStorage.map(async id => await fetch("/api/product/detail/" + id));
    try {
      const resultados = await Promise.all(consultas);
    let contenedor= document.querySelector(".prodcart")
      for (const resultado of resultados) {
        if (resultado.ok) {
          const producto = await resultado.json();
       contenedor.innerHTML+=`<img src="${producto.data.image}" alt="Teatro Colon">
       <div class"elements">
       <div class"product-info">
       <h3 class="tituloprodcart">${producto.data.name}</h3>
       </div>
       <form method='POST' class='quantity' action=''>
          
           <input type="number" class="quantity-input" value="1" min="1">
          
       </form>

       <div class "product-price"><p class="option-price">${producto.data.price}</p></div>
       </div>

       <div><i id="trash" class="fa-solid fa-trash"></i></div>`
       



        } else {
          console.log("Error al obtener detalles del producto:", resultado.status);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
   

generarCarrito()
})