document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#login-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let errores = [];

        const email = document.querySelector('#email');
        const password = document.querySelector('#password');
        const emailError = document.querySelector('#email-error');
        const passwordError = document.querySelector('#password-error');

        emailError.textContent = ''; // Borrar mensaje de error anterior
        passwordError.textContent = ''; // Borrar mensaje de error anterior

        if (email.value.trim() === '') {
            errores.push('El campo Email debe llenarse');
            emailError.textContent = 'El campo Email debe llenarse'; // Mostrar mensaje de error
        } else {
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailPattern.test(email.value)) {
                errores.push('El campo Email no es válido');
                emailError.textContent = 'El campo Email no es válido'; // Mostrar mensaje de error
            }
        }

        if (password.value.trim() === '') {
            errores.push('El campo Contraseña debe llenarse');
            passwordError.textContent = 'El campo Contraseña debe llenarse'; // Mostrar mensaje de error
        } else {
            // Validación de contraseña: al menos una minúscula, una mayúscula, un carácter especial y al menos 8 caracteres
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordPattern.test(password.value)) {
                errores.push('La contraseña debe contener al menos una minúscula, una mayúscula, un carácter especial y tener al menos 8 caracteres.');
                passwordError.textContent = 'La contraseña debe contener al menos una minúscula, una mayúscula, un carácter especial y tener al menos 8 caracteres.'; // Mostrar mensaje de error
            }
        }

        if (errores.length === 0) {
            form.submit(); // Enviar el formulario si no hay errores
        }
    });
});
