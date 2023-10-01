document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#edit_user_form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let errores = [];

        const password = document.querySelector('input[name="password"]');
        const repeatPassword = document.querySelector('input[name="repeat_password"]');
        const image = document.querySelector('input[name="image"]');

        const passwordError = document.querySelector('#password-error');
        const repeatPasswordError = document.querySelector('#repeat_password-error');
        const imageError = document.querySelector('#image-error');

        passwordError.textContent = ''; // Limpiar mensajes de error previos
        repeatPasswordError.textContent = ''; // Limpiar mensajes de error previos
        imageError.textContent = ''; // Limpiar mensajes de error previos

        if (password.value.trim() !== '') {
            // Validación de contraseña: al menos una minúscula, una mayúscula, un carácter especial y al menos 8 caracteres
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordPattern.test(password.value)) {
                errores.push('La contraseña debe contener al menos una minúscula, una mayúscula, un carácter especial y tener al menos 8 caracteres.');
                passwordError.textContent = 'La contraseña debe contener al menos una minúscula, una mayúscula, un carácter especial y tener al menos 8 caracteres.';
            }
        }

        if (repeatPassword.value.trim() !== '') {
            if (repeatPassword.value !== password.value) {
                errores.push('Las contraseñas no coinciden');
                repeatPasswordError.textContent = 'Las contraseñas no coinciden';
            }
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
