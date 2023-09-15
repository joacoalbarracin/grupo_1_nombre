document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#register_form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let errores = [];

        const name = document.querySelector('#name');
        const lastName = document.querySelector('#last_name');
        const email = document.querySelector('#email');
        const password = document.querySelector('#password');
        const repeatPassword = document.querySelector('#repeat_password');
        const image = document.querySelector('#image');
        
        const nameError = document.querySelector('#name-error');
        const lastNameError = document.querySelector('#last_name-error');
        const emailError = document.querySelector('#email-error');
        const passwordError = document.querySelector('#password-error');
        const repeatPasswordError = document.querySelector('#repeat_password-error');
        const imageError = document.querySelector('#image-error');

        // Clear previous error messages
        nameError.textContent = '';
        lastNameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        repeatPasswordError.textContent = '';
        imageError.textContent = '';

        // Check if the 'name' field is empty
        if (name.value.trim() === '') {
            errores.push('El campo Nombre debe llenarse');
            nameError.textContent = 'El campo Nombre debe llenarse';
        }

        // Check if the 'last_name' field is empty
        if (lastName.value.trim() === '') {
            errores.push('El campo Apellido debe llenarse');
            lastNameError.textContent = 'El campo Apellido debe llenarse';
        }

        // Check if the 'email' field is empty
        if (email.value.trim() === '') {
            errores.push('El campo Email debe llenarse');
            emailError.textContent = 'El campo Email debe llenarse';
        } else {
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailPattern.test(email.value)) {
                errores.push('El campo Email no es válido');
                emailError.textContent = 'El campo Email no es válido';
            }
        }

        // Check if the 'password' field is empty
        if (password.value.trim() === '') {
            errores.push('El campo Contraseña debe llenarse');
            passwordError.textContent = 'El campo Contraseña debe llenarse';
        }

        // Check if the 'repeat_password' field is empty and matches the 'password'
        if (repeatPassword.value.trim() === '') {
            errores.push('El campo Repetir Contraseña debe llenarse');
            repeatPasswordError.textContent = 'El campo Repetir Contraseña debe llenarse';
        } else if (repeatPassword.value !== password.value) {
            errores.push('Las contraseñas no coinciden');
            repeatPasswordError.textContent = 'Las contraseñas no coinciden';
        }

        // Check if an image file is selected (assuming this is an image upload field)
// Check if an image file is selected (assuming this is an image upload field)
        if (image.files.length === 0) {
            errores.push('Debe seleccionar una imagen');
            imageError.textContent = 'Debe seleccionar una imagen';
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
