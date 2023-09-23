document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#register_form');
    let busqueda = [];
    let encontrado = undefined;

  // me traigo la info de usuarios

  fetch("/api/user/list", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((info) => {
      busqueda = info.data.users;
      console.log(busqueda)
    });
    form.addEventListener('submit', async function (event) {
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

        // Limpiar mensajes de error previos
        nameError.textContent = '';
        lastNameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        repeatPasswordError.textContent = '';
        imageError.textContent = '';

        // Verificar si el campo 'nombre' está vacío
        if (name.value.trim() === '') {
            errores.push('El campo Nombre debe llenarse');
            nameError.textContent = 'El campo Nombre debe llenarse';
        }

        // Verificar si el campo 'apellido' está vacío
        if (lastName.value.trim() === '') {
            errores.push('El campo Apellido debe llenarse');
            lastNameError.textContent = 'El campo Apellido debe llenarse';
        }

        // Verificar si el campo 'email' está vacío
        if (email.value.trim() === '') {
            errores.push('El campo Email debe llenarse');
            emailError.textContent = 'El campo Email debe llenarse';
        } else {
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailPattern.test(email.value)) {
                errores.push('El campo Email no es válido');
                emailError.textContent = 'El campo Email no es válido';
                const existeEmail = busqueda.some(user=>user.email === email.value);
                console.log (existeEmail)
                if ( existeEmail ) 
                errores.push ("El mail ya se encuentra registrado");
                emailError.textContent = ("El mail ya se encuentra registrado");

                
                /*encontrado = busqueda.find((row) => row.email == email.value);
                console.log(encontrado)
                if (encontrado) {
                
                  errores.push ("Este mail ya se encuentra registrado")
                  emailError.textContent = "Este mail ya se encuentra registrado";
                  
                }*/ 
             }
            }
            
        

        // Verificar si el campo 'contraseña' está vacío
        if (password.value.trim() === '') {
            errores.push('El campo Contraseña debe llenarse');
            passwordError.textContent = 'El campo Contraseña debe llenarse';
        } else {
            // Verificar si la contraseña cumple con los requisitos
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordPattern.test(password.value)) {
                errores.push('La contraseña debe contener al menos una minúscula, una mayúscula, un carácter especial y tener al menos 8 caracteres.');
                passwordError.textContent = 'La contraseña debe contener al menos una minúscula, una mayúscula, un carácter especial y tener al menos 8 caracteres.';
            }
        }

        // Verificar si el campo 'repetir_contraseña' está vacío y coincide con 'contraseña'
        if (repeatPassword.value.trim() === '') {
            errores.push('El campo Repetir Contraseña debe llenarse');
            repeatPasswordError.textContent = 'El campo Repetir Contraseña debe llenarse';
        } else if (repeatPassword.value !== password.value) {
            errores.push('Las contraseñas no coinciden');
            repeatPasswordError.textContent = 'Las contraseñas no coinciden';
        }

        // Verificar si se selecciona un archivo de imagen (suponiendo que este es un campo de carga de imágenes)
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
            form.submit(); // Enviar el formulario si no hay errores
        }
    });
});
