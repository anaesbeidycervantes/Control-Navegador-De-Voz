document.addEventListener('DOMContentLoaded', function () {
    const voiceResult = document.getElementById('voiceResult');
    let openedWindow;

    function ejecutarComando(comando) {
        comando = comando.toLowerCase().trim();
        switch (comando) {
            case 'abrir página':
                openedWindow = window.open('https://www.google.com');
                break;
            case 'ir a página':
                openedWindow = window.open('https://www.netflix.com');
                break;
            case 'abrir imagen':
                openedWindow = window.open('https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instituto_Tecnol%C3%B3gico_de_Pachuca._004.jpg/640px-Instituto_Tecnol%C3%B3gico_de_Pachuca._004.jpg');
                break;
            case 'cambiar tamaño':
                cambiarTamaño();
                break;
            case 'ver instrucciones':
                window.location.href = 'documentacion.html';
                break;
            
            default:
                mostrarError();
                break;
        }
        
        // Envía el comando al MockAPI
        enviarComandoAMockAPI(comando);
    }

    function cambiarTamaño() {
        const titulo = document.querySelector('h1');
        titulo.style.fontSize = '24px'; // Tamaño h4
        titulo.style.color = 'blue'; // Color azul
        titulo.style.fontWeight = 'bold'; // Negritas
    }

    function mostrarError(mensaje = 'Comando no identificado. Vuelve a intentarlo.') {
        voiceResult.textContent = mensaje;
    }

    function enviarComandoAMockAPI(comando) {
        const url = "https://660219919d7276a75552a2c5.mockapi.io/registro";
        const data = { comando: comando };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => console.log('Comando enviado al MockAPI:', data))
        .catch(error => console.error('Error al enviar comando al MockAPI:', error));
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

        recognition.start(); // Iniciar el reconocimiento de voz
    } else {
        alert('El reconocimiento de voz no es compatible con tu navegador.');
    }
});
