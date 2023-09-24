document.addEventListener('DOMContentLoaded', function() {
let carritoStorage = []
    const carritoInit = function () {
        if (!JSON.parse(localStorage.getItem("cart"))) {
          localStorage.setItem("cart", JSON.stringify(carritoStorage));
        } else {
          carritoStorage = JSON.parse(localStorage.getItem("cart"));
        }
      };
      carritoInit();
      const botonComprar = document.querySelector (".btn-comprar")
      botonComprar.addEventListener("click", ()=>{
        
        const url = window.location.href
        const regex = /\/(\d+)$/
        const match = url.match(regex)
        if (match) {
         carritoStorage.push(match[1])
         localStorage.setItem("cart", JSON.stringify(carritoStorage))
         window.location.href="/products/cart" 
        }
            
      })
})
