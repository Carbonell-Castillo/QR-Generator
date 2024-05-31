document.getElementById('generateBtn').addEventListener('click', function() {
    var qrInput = document.getElementById('qrInput').value;
    var qrColor = document.getElementById('qrColor').value;
    var qrAdditionalText = document.getElementById('qrText').value;
    var qr = new QRious({
        value: qrInput,
        size: 250,
        foreground: qrColor
    });

    qr.image.onload = function() {
        var canvas = document.getElementById('qrCanvas');
        var ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(qr.image, 0, 0);

        if (qrAdditionalText) {
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.fillStyle = qrColor;
            ctx.fillText(qrAdditionalText, canvas.width / 2, canvas.height - 20);
        }
    }
});

document.getElementById('downloadQr').addEventListener('click', function() {
    var qrInput = document.getElementById('qrInput').value;
    var qrColor = document.getElementById('qrColor').value;
    var qrAdditionalText = document.getElementById('qrText').value;
    var canvas = document.getElementById('qrCanvas');
    var qrTypeDownload = document.getElementById('qrTypeDownload').value;
    var generateBtn = document.getElementById('generateBtn');
    generateBtn.click();

    setTimeout(function() {
        var link = document.createElement('a');

        if (qrTypeDownload === 'SVG') {
            var svg = `<svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 250 250">
            <rect width="250" height="250" fill="white"/>
            <image href="${canvas.toDataURL()}" x="0" y="0" height="250" width="250"/>
            ${qrAdditionalText ? `<text x="50%" y="98%" dominant-baseline="middle" text-anchor="middle" fill="${qrColor}" font-family="Arial" font-size="16"></text>` : ''}
        </svg>`;
        var svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
        var svgUrl = URL.createObjectURL(svgBlob);
        link.href = svgUrl;
        link.download = 'qr-code.svg';
        } else if (qrTypeDownload === 'PNG') {
            link.href = canvas.toDataURL('image/png');
            link.download = 'qr-code.png';
        } else if (qrTypeDownload === 'JPG') {
            link.href = canvas.toDataURL('image/jpeg');
            link.download = 'qr-code.jpg';
        } else if (qrTypeDownload === 'PDF') {
            // Usar jsPDF desde el contexto global
            var imgData = canvas.toDataURL('image/png');
            var pdf = new window.jspdf.jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 4, canvas.height / 4);
            pdf.save('qr-code.pdf');
            return;
        }

        link.click();
    }, 100); // Esperar a que el QR se genere antes de descargar
});
