document.addEventListener('DOMContentLoaded', function () {
    const voiceResult = document.getElementById('voiceResult');
    let openedWindow;

    function ejecutarComando(comando) {
        comando = comando.toLowerCase().trim();
        switch (comando) {
            case 'abrir página':
                openedWindow = window.open('https://www.netflix.com');
                break;
            case 'ir a página':
                openedWindow = window.open('https://www.google.com');
                break;
            case 'cerrar página':
                if (openedWindow && !openedWindow.closed) {
                    openedWindow.close();
                } else {
                    console.log('No hay ninguna página abierta para cerrar.');
                }
                break;
            case 'cerrar navegador':
                window.close();
                break;
            default:
                console.log('Comando no reconocido: ' + comando);
                break;
        }
    }

    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'es-ES';

        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            voiceResult.textContent = 'Tu dijiste: ' + transcript;
            ejecutarComando(transcript);
        };

        recognition.onerror = function (event) {
            console.error('Error en el reconocimiento de voz: ' + event.error);
        };

        document.getElementById('startButton').addEventListener('click', function () {
            recognition.start();
        });
    } else {
        alert('El reconocimiento de voz no es compatible con tu navegador.');
    }
});
