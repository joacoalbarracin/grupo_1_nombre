document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#login-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let errores = [];

        const email = document.querySelector('#email');
        const password = document.querySelector('#password');
        const emailError = document.querySelector('#email-error');
        const passwordError = document.querySelector('#password-error');

        emailError.textContent = ''; // Clear previous error message
        passwordError.textContent = ''; // Clear previous error message

        if (email.value.trim() === '') {
            errores.push('El campo Email debe llenarse');
            emailError.textContent = 'El campo Email debe llenarse'; // Display error message
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(email.value)) {
            errores.push('El campo Email no es válido');
            emailError.textContent = 'El campo Email no es válido'; // Display error message
        }

        if (password.value.trim() === '') {
            errores.push('El campo Contraseña debe llenarse');
            passwordError.textContent = 'El campo Contraseña debe llenarse'; // Display error message
        }

        if (errores.length === 0) {
            form.submit(); // Submit the form if there are no errors
        }
    });
});
