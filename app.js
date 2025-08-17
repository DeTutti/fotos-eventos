<script>
  // Configuración mínima viable
  const setupCloudinary = {
    cloudName: 'TU_CLOUD_NAME', // Reemplazar esto
    uploadPreset: 'event_photos'
  };

  function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
      tab.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
  }

  function generateQRCode() {
    const qr = qrcode(0, 'L');
    qr.addData(window.location.href);
    qr.make();
    document.getElementById('qrCodeContainer').innerHTML = qr.createImgTag(4);
  }

  document.addEventListener('DOMContentLoaded', () => {
    generateQRCode();
    const uploadButton = cloudinary.createUploadWidget(
      setupCloudinary,
      (error, result) => console.log(result)
    );
    document.getElementById('upload_widget').onclick = uploadButton.open;
  });
</script>
</body>
</html>
