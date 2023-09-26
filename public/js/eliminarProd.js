window.addEventListener('load', () => {
  const forms = document.querySelectorAll('#borrar-prod');

  forms.forEach(form => {
    const tacho = form.querySelector('#tacho');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      Swal.fire({
        title: '¿Estás seguro de eliminar el producto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3c6e71',
        cancelButtonColor: '#3c6e71',
        confirmButtonText: 'Eliminar Producto',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado',
            'El producto fue eliminado.',
            'success'
          ).then(() => {
            form.submit();
          });
        }
      });
    });
  });
});
