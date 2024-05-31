
document.getElementById('qrForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener el texto ingresado por el usuario
    const textInput = document.getElementById('textInput').value;

    // Crear el código QR usando la librería QRious
    const qr = new QRious({
        element: document.getElementById('qr-code'),
        value: textInput,
        size: 200 // Puedes ajustar el tamaño según tus necesidades
    });
});
