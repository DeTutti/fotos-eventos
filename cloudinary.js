const CLOUDINARY_SETTINGS = {
  cloudName: 'dzh6do061',      //
  uploadPreset: 'eventos_moviles'  //
};

// =================================================
// NO MODIFICAR LO SIGUIENTE A MENOS QUE SEPAS LO QUE HACES
// =================================================

const CLOUDINARY_CONFIG = {
  ...CLOUDINARY_SETTINGS,
  sources: ['local', 'camera', 'url'],
  multiple: false,
  cropping: false,
  showPoweredBy: false,
  styles: {
    palette: {
      window: "#FFFFFF",
      windowBorder: "#90A0B3",
      tabIcon: "#0078FF",
      menuIcons: "#5A616A",
      textDark: "#000000",
      textLight: "#FFFFFF",
      link: "#0078FF",
      action: "#FF620C",
      inactiveTabIcon: "#0E2F5A",
      error: "#F44235",
      inProgress: "#0078FF",
      complete: "#20B832",
      sourceBg: "#E4EBF1"
    },
    fonts: {
      default: {
        family: "'Poppins', sans-serif",
        href: "https://fonts.googleapis.com/css?family=Poppins"
      }
    }
  }
};

// Inicializa el widget de Cloudinary
let uploadWidget = null;

function initializeCloudinary() {
  uploadWidget = cloudinary.createUploadWidget(
    CLOUDINARY_CONFIG,
    (error, result) => {
      if (!error && result.event === 'success') {
        // Notifica a la aplicación principal que hay una nueva foto
        document.dispatchEvent(new CustomEvent('newPhotoUploaded', {
          detail: { url: result.info.secure_url }
        }));
        
        // Muestra notificación al usuario
        showToast('¡Foto subida correctamente!');
      }
      
      if (error) {
        console.error("Error en Cloudinary:", error);
        showToast('Error al subir la foto', 'error');
      }
    }
  );
}

// Función para abrir el widget
function openUploadWidget() {
  if (!uploadWidget) {
    initializeCloudinary();
  }
  uploadWidget.open();
}

// Función auxiliar para mostrar notificaciones
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-xl z-50 ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  } text-white`;
  toast.classList.remove('hidden');
  
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}

// Inicializa cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initializeCloudinary);

// Exporta las funciones necesarias
window.cloudinaryUtils = {
  openUploader: openUploadWidget
};
