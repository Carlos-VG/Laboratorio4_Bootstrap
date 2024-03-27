function onYouTubeIframeAPIReady() {
    new YT.Player('youtube-video', {
        height: '100%',
        width: '100%',
        videoId: 'wOoy9raOyaw', // El ID de tu video.
        playerVars: {
            autoplay: 1,
            controls: 0,
            loop: 1,
            playlist: 'wOoy9raOyaw', // Necesario para la funcionalidad de loop.
            mute: 1
            // No necesitas 'start' aquí porque lo manejaremos manualmente.
        },
        events: {
            'onReady': function (event) {
                // Inicia el video en el tiempo de inicio deseado.
                event.target.seekTo(60, true); // Empieza en 1:00.
                event.target.setPlaybackRate(1);
            },
            'onStateChange': function (event) {
                if (event.data === YT.PlayerState.PLAYING) {
                    let checkTime = setInterval(function () {
                        if (event.target.getCurrentTime() >= 120) { // Si el tiempo actual es >= 2:00.
                            event.target.seekTo(60, true); // Vuelve a 1:00.
                        }
                    }, 1000); // Revisa cada segundo.

                    // Detener la verificación si el video ya no está reproduciendo.
                    event.target.addEventListener('onStateChange', function (e) {
                        if (e.data !== YT.PlayerState.PLAYING) {
                            clearInterval(checkTime);
                        }
                    });
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.btn-1').forEach(function (btn) {
        btn.addEventListener('mouseover', function () {
            const infoId = btn.getAttribute('data-info');
            document.getElementById(infoId).style.display = 'block';
        });

        btn.addEventListener('mouseout', function (event) {
            const infoId = btn.getAttribute('data-info');
            const info = document.getElementById(infoId);
            if (!event.relatedTarget || (event.relatedTarget !== info && !info.contains(event.relatedTarget))) {
                info.style.display = 'none';
            }
        });
    });

    document.querySelectorAll('.info-box-dinamico').forEach(function (info) {
        info.addEventListener('mouseout', function (event) {
            if (!event.relatedTarget || !event.relatedTarget.classList.contains('btn-1')) {
                info.style.display = 'none';
            }
        });
    });

    document.querySelectorAll('.info-box').forEach(function (info) {
        info.addEventListener('mouseout', function (event) {
            if (!event.relatedTarget || !event.relatedTarget.classList.contains('btn-1')) {
                info.style.display = 'none';
            }
        });
    });
});

window.onload = function () {
    const form = document.querySelector('form'); // Selecciona el primer formulario en el documento
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const comments = document.getElementById('coments');

    name.focus();

    form.onsubmit = async function (event) {
        event.preventDefault(); // Prevenir el envío tradicional del formulario

        // Validación básica del formulario

        const confirmation = await Swal.fire({
            title: '¿Está seguro que desea enviar el formulario?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, enviar!',
            cancelButtonText: 'No, cancelar'
        });

        if (confirmation.isConfirmed) {
            const formData = new FormData(form);
            fetch(form.action, {
                method: 'POST',
                body: formData
                // No establecer cabeceras 'Accept' a menos que estés seguro de la respuesta
            })
                .then(response => {
                    if (response.ok) {
                        // Envío exitoso
                        Swal.fire({
                            icon: 'success',
                            title: '¡Enviado!',
                            text: 'Mensaje enviado correctamente, revise su correo, estaremos en contacto.'
                        });
                        form.reset(); // Limpia el formulario
                    } else {
                        // La respuesta no fue exitosa
                        throw new Error('El servidor respondió con un error.');
                    }
                })
                .catch(error => {
                    // Manejo de cualquier error con la solicitud
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Error al enviar el formulario. Por favor, intente nuevamente.'
                    });
                });
        }
    };
};

