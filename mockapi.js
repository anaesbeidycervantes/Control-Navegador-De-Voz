document.addEventListener('DOMContentLoaded', function () {
    const voiceResult = document.getElementById('voiceResult');
    let openedWindow;

    function ejecutarComando(comando) {
        comando = comando.toLowerCase().trim();
        let indicacion = comando; // Usar el comando como indicacion
        let direccion = ''; // Inicializar la dirección vacía

        switch (comando) {
            case 'abrir página':
                direccion = 'https://www.netflix.com'; // Cambiar la dirección según necesites
                abrirPagina(direccion);
                break;
            case 'cerrar página':
                cerrarPagina();
                break;
            case 'ir a página':
                direccion = 'https://www.google.com'; // Cambiar la dirección según necesites
                abrirPagina(direccion);
                break;
            case 'cerrar navegador':
                cerrarNavegador();
                break;
            default:
                mostrarError();
                return;
        }

        enviarRegistro(indicacion, direccion); // Pasar indicacion y direccion a enviarRegistro
    }

    function abrirPagina(url) {
        openedWindow = window.open(url);
    }

    function cerrarPagina() {
        if (openedWindow && !openedWindow.closed) {
            openedWindow.close();
        } else {
            console.log('No hay ninguna página abierta para cerrar.');
        }
    }

    function cerrarNavegador() {
        window.close();
    }

    function enviarRegistro(indicacion, direccion) {
        const data = {
            indicacion: indicacion, // Usar el comando como indicacion
            direccion: direccion, // Agregar la dirección
            timestamp: new Date().toISOString()
        };
        fetch('https://660219919d7276a75552a2c5.mockapi.io/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al enviar el registro a MockAPI');
            }
            console.log('Registro enviado exitosamente a MockAPI:', data);
        })
        .catch(error => {
            console.error('Error al enviar el registro a MockAPI:', error);
        });
    }

    function mostrarError() {
        voiceResult.textContent = 'Comando no identificado. Vuelve a intentarlo.';
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
