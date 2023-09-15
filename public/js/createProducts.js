document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#create_product_form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let errores = [];

        const name = document.querySelector('#name');
        const description = document.querySelector('#description');
        const image = document.querySelector('#image');

        const nameError = document.querySelector('#name-error');
        const descriptionError = document.querySelector('#description-error');
        const imageError = document.querySelector('#image-error');

        // Clear previous error messages
        nameError.textContent = '';
        descriptionError.textContent = '';
        imageError.textContent = '';

        // Validation for Nombre
        if (name.value.trim() === '') {
            errores.push('El campo Nombre es obligatorio.');
            nameError.textContent = 'El campo Nombre es obligatorio.';
        } else if (name.value.trim().length < 5) {
            errores.push('El campo Nombre debe tener al menos 5 caracteres.');
            nameError.textContent = 'El campo Nombre debe tener al menos 5 caracteres.';
        }

        // Validation for Descripción
        if (description.value.trim().length < 20) {
            errores.push('El campo Descripción debe tener al menos 20 caracteres.');
            descriptionError.textContent = 'El campo Descripción debe tener al menos 20 caracteres.';
        }

        // Validation for Imagen
        if (image.files.length === 0) {
            errores.push('Debe seleccionar una imagen.');
            imageError.textContent = 'Debe seleccionar una imagen.';
        } else {
            const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
            const fileName = image.files[0].name.toLowerCase();
            const fileExtension = fileName.split('.').pop();

            if (!allowedExtensions.includes(fileExtension)) {
                errores.push('El formato de la imagen no es válido. Los formatos permitidos son JPG, JPEG, PNG y GIF.');
                imageError.textContent = 'El formato de la imagen no es válido. Los formatos permitidos son JPG, JPEG, PNG y GIF.';
            }
        }

        if (errores.length === 0) {
            form.submit(); // Submit the form if there are no errors
        }
    });
});
