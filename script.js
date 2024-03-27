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
