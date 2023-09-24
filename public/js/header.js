window.addEventListener('load', function () {
    const userProfile = document.querySelector('#user-profile');
    const iconoUser = document.querySelector('#iconouser');

    console.log(userProfile);
    console.log(iconoUser);
    if (iconoUser!=undefined){
        iconoUser.addEventListener('click', function () {
            userProfile.classList.toggle('mostrar'); // Toggle muestra u oculta el div
        });
    }
});
