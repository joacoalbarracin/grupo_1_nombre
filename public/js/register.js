document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#register_form');

    async function fetchUserList() {
        try {
            const response = await fetch("/api/user/list", {
                method: "GET",
            });
            const info = await response.json();
            return info.data.users;
        } catch (error) {
            console.error("Error fetching user list:", error);
            return [];
        }
    }

    let users = [];
    fetchUserList().then(data => users = data);

    form.addEventListener('submit', handleFormSubmission);

    function handleFormSubmission(event) {
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

        nameError.textContent = '';
        lastNameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        repeatPasswordError.textContent = '';
        imageError.textContent = '';

        // Código de validación
        // Validar nombre
        if (name.value.trim() === '') {
            errores.push('El campo Nombre debe llenarse');
            nameError.textContent = 'El campo Nombre debe llenarse';
        }
        
        // Validar apellido
        if (lastName.value.trim() === '') {
            errores.push('El campo Apellido debe llenarse');
            lastNameError.textContent = 'El campo Apellido debe llenarse';
        }

        // Validar email
        if (email.value.trim() === '') {
            errores.push('El campo Email debe llenarse');
            emailError.textContent = 'El campo Email debe llenarse';
        } else {
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailPattern.test(email.value)) {
                errores.push('El campo Email no es válido');
                emailError.textContent = 'El campo Email no es válido';
            } else {
                const emailExists = Array.isArray(users) && users.some(user => user.email === email.value.trim());;
                if (emailExists) {
                    errores.push('El Email ya está registrado');
                    emailError.textContent = 'El Email ya está registrado';
                }
            }
        }

        // Validar contraseña
        if (password.value.trim() === '') {
            errores.push('El campo Contraseña debe llenarse');
            passwordError.textContent = 'El campo Contraseña debe llenarse';
        } else {
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordPattern.test(password.value)) {
                errores.push('La contraseña debe contener al menos una minúscula, una mayúscula, un carácter especial y tener al menos 8 caracteres.');
                passwordError.textContent = 'La contraseña debe contener al menos una minúscula, una mayúscula, un carácter especial y tener al menos 8 caracteres.';
            }
        }

        // Validar repetir contraseña
        if (repeatPassword.value.trim() === '') {
            errores.push('El campo Repetir contraseña debe llenarse');
            repeatPasswordError.textContent = 'El campo Repetir contraseña debe llenarse';
        } else if (repeatPassword.value !== password.value) {
            errores.push('Las contraseñas no coinciden');
            repeatPasswordError.textContent = 'Las contraseñas no coinciden';
        }

        // Validar imagen
        if (image.files.length === 0) {
            errores.push('Debe seleccionar una imagen');
            imageError.textContent = 'Debe cargar una imagen';
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
            console.log("Formulario Enviado");
            form.submit();
        } else {
            console.log("Hay errores:", errores);
        }
    }

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

