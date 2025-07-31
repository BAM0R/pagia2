document.getElementById("btn-descargar").addEventListener("click", async () => {
  const form = document.getElementById("formulario-compra");

  // Captura visual del formulario
  const canvas = await html2canvas(form);
  const imgData = canvas.toDataURL("image/png");

  // Crear PDF con la imagen del formulario
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [canvas.width, canvas.height],
  });

  pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
  pdf.save("formulario_compra.pdf");

  // Mostrar la ventana de impresión después de un pequeño delay
  setTimeout(() => {
    const printWindow = window.open("", "_blank");
    const img = new Image();
    img.src = imgData;

    img.onload = () => {
      printWindow.document.write(`
        <html>
          <head><title>Impresión del Formulario</title></head>
          <body style="margin:0">
            <img src="${imgData}" style="width:100%; height:auto;" />
            <script>
              window.onload = function() {
                window.print();
              };
            <\/script>
          </body>
        </html>
      `);
      printWindow.document.close();
    };
  }, 500);
});
