document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#edit_product_form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let errores = [];

        const name = document.querySelector('#name');
        const description = document.querySelector('#description');
        const image = document.querySelector('#image');
        const date = document.querySelector('#date'); 

        const nameError = document.querySelector('#name-error');
        const descriptionError = document.querySelector('#description-error');
        const imageError = document.querySelector('#image-error');
        const dateError = document.querySelector('#date-error'); 

        nameError.textContent = ''; // Limpiar mensajes de error anteriores
        descriptionError.textContent = '';// Limpiar mensajes de error anteriores
        imageError.textContent = '';// Limpiar mensajes de error anteriores
        dateError.textContent = ''; // Limpiar mensajes de error anteriores

        if (name.value.trim() === '') {
            errores.push('El campo Nombre es obligatorio.');
            nameError.textContent = 'El campo Nombre es obligatorio.';
        } else if (name.value.trim().length < 5) {
            errores.push('El campo Nombre debe tener al menos 5 caracteres.');
            nameError.textContent = 'El campo Nombre debe tener al menos 5 caracteres.';
        }

        if (description.value.trim().length < 20) {
            errores.push('El campo Descripción debe tener al menos 20 caracteres.');
            descriptionError.textContent = 'El campo Descripción debe tener al menos 20 caracteres.';
        }

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

        const currentDate = new Date();
        const selectedDate = new Date(date.value);

        if (selectedDate < currentDate) {
            errores.push('La fecha no puede ser en el pasado.');
            dateError.textContent = 'La fecha no puede ser en el pasado.';
        }

        if (errores.length === 0) {
            form.submit(); // Enviar el formulario si no hay errores
        }
    });

    function updateFileName(event) {
        const fileName = event.target.files[0] ? event.target.files[0].name : "Ningún archivo seleccionado";
        document.getElementById("file-name").textContent = fileName;
        event.stopPropagation();
        showImagePreview(event);
    }

    // Función para mostrar la previsualización de la imagen
    function showImagePreview(event) {
        const file = event.target.files[0];
        const preview = document.getElementById('image-preview');

        if (file) {
            const reader = new FileReader();

            reader.onload = function(e) {
                preview.src = e.target.result;
                preview.style.display = 'block';
            }

            reader.readAsDataURL(file);
        } else {
            preview.style.display = 'none';
        }
    }

    const imageInput = document.getElementById('image');
    imageInput.addEventListener('change', updateFileName);

    const customFileUploadButton = document.querySelector(".custom-file-upload");
    customFileUploadButton.setAttribute('type', 'button');  // Asegurarse de que no envía el formulario
    customFileUploadButton.addEventListener("click", function() {
        imageInput.click();
    });
});
