# QR Generator

## Descripción

El proyecto QR Generator es una aplicación web sencilla que permite generar códigos QR personalizados a partir de texto o URLs. Además, los códigos QR generados pueden descargarse en varios formatos (PNG, JPG, SVG, PDF) y se puede añadir texto adicional debajo del código QR.

## Características

- **Generar QR Code**: Genera códigos QR a partir de texto o URLs.
- **Personalización**: Permite cambiar el color del QR Code.
- **Texto Adicional**: Añade texto adicional debajo del QR Code.
- **Descarga en Diferentes Formatos**: Descarga el QR Code en los formatos PNG, JPG, SVG, y PDF.
- **Vista Previa**: Visualiza el QR Code generado antes de descargarlo.

## Tecnologías Utilizadas

- **HTML**: Estructura del proyecto.
- **CSS**: Estilos y diseño.
- **JavaScript**: Lógica para la generación de QR y la descarga en diferentes formatos.
- **QRious**: Librería para generar códigos QR.
- **jsPDF**: Librería para generar archivos PDF.

## Estructura del Proyecto

```
QR-Generator/
│
├── index.html       # Archivo principal de la aplicación.
├── style/
│   └── main.css     # Estilos CSS.
├── script/
│   └── main.js      # Lógica principal de la aplicación.
├── README.md        # Archivo con información sobre el proyecto.
```

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/QR-Generator.git
   ```

2. Navega hasta el directorio del proyecto:

   ```bash
   cd QR-Generator
   ```

3. Abre el archivo `index.html` en tu navegador.

## Uso

1. **Ingresar el Texto o URL**:
   - En el campo "QR text" ingresa el texto o URL que deseas convertir en un código QR.
   
2. **Personalizar Color**:
   - Selecciona el color deseado para el QR Code utilizando el selector de color.

3. **Añadir Texto Adicional**:
   - En el campo "Additional Text" ingresa el texto que deseas mostrar debajo del QR Code.

4. **Generar QR Code**:
   - Haz clic en el botón "Generate QR Code" para visualizar el QR Code generado.

5. **Descargar QR Code**:
   - Selecciona el formato en el que deseas descargar el QR Code (PNG, JPG, SVG, PDF) del menú desplegable.
   - Haz clic en el botón "Download QR Code" para descargar el QR Code en el formato seleccionado.

## Archivos Clave

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QR Generator</title>
    <link rel="stylesheet" href="style/main.css">
    <script src="https://cdn.jsdelivr.net/npm/qrious@4.0.2/dist/qrious.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
</head>
<body>
    <div class="container">
        <h1>QR Code Generator</h1>
        <div class="form-group">
            <label for="qrInput">QR text</label>
            <input type="text" id="qrInput" placeholder="Enter text or URL">
        </div>
        <div class="form-group">
            <label for="qrColor">Color</label>
            <input type="color" id="qrColor">
        </div>
        <div class="form-group">
            <label for="qrText">Additional Text</label>
            <input type="text" id="qrText" placeholder="Enter additional text">
        </div>
        <button id="generateBtn">Generate QR Code</button>
        <canvas id="qrCanvas" width="250" height="250"></canvas>
        <div class="form-group">
            <label for="qrTypeDownload">Export as</label>
            <select id="qrTypeDownload">
                <option value="PNG">PNG</option>
                <option value="JPG">JPG</option>
                <option value="SVG">SVG</option>
                <option value="PDF">PDF</option>
            </select>
        </div>
        <button id="downloadQr">Download QR Code</button>
    </div>
    <script src="script/main.js"></script>
</body>
</html>
```

### main.js

```javascript
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
                ${qrAdditionalText ? `<text x="50%" y="98%" dominant-baseline="middle" text-anchor="middle" fill="${qrColor}" font-family="Arial" font-size="16">${qrAdditionalText}</text>` : ''}
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
            var imgData = canvas.toDataURL('image/png');
            var pdf = new window.jspdf.jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 4, canvas.height / 4);
            pdf.save('qr-code.pdf');
            return;
        }

        link.click();
    }, 100); // Esperar a que el QR se genere antes de descargar
});
```

### main.css

```css
body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f4;
}

.container {
    text-align: center;
    background: white;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    border-radius: 8px;
}

.form-group {
    margin: 15px 0;
}

button {
    padding: 10px 20px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    border-radius: 4px;
}

button:hover {
    background-color: #0056b3;
}

canvas {
    margin-top: 20px;
    border: 1px solid #ddd;
}
```

## Contribuir

Si encuentras algún error o tienes sugerencias de mejora, no dudes en abrir un reporte de errores o una solicitud de extracción en el repositorio.

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

Este README proporciona una visión detallada del funcionamiento del proyecto, junto con instrucciones claras sobre cómo configurarlo y utilizarlo. Puedes ajustar el contenido según sea necesario para reflejar cualquier cambio específico en tu proyecto.