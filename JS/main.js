document.getElementById('generateBtn').addEventListener('click', function() {
    var qrInput = document.getElementById('qrInput').value;
    var qrColor = document.getElementById('qrColor').value;
    var qrAdditionalText= document.getElementById('qrText').value;
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