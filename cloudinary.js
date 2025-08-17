// Cloudinary Setup
const CLOUDINARY_CONFIG = {
  cloudName: 'TU_CLOUD_NAME',
  uploadPreset: 'TU_UPLOAD_PRESET',
  sources: ['local', 'camera'],
  multiple: false,
  cropping: false,
  showAdvancedOptions: false
};

function setupCloudinaryUpload() {
  const uploadWidget = cloudinary.createUploadWidget(CLOUDINARY_CONFIG, 
    (error, result) => {
      if (!error && result.event === 'success') {
        photoEventApp.addPhoto(result.info.secure_url);
      }
    }
  );

  window.openUploadWidget = () => uploadWidget.open();
}

// QR Generation
function generateQRCode() {
  const qr = qrcode(0, 'L');
  qr.addData(`${window.location.href}?upload=true`);
  qr.make();
  return qr.createImgTag(4);
}
