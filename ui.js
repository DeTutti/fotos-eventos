// UI Manager
class UIManager {
  static render(appState) {
    document.getElementById('app').innerHTML = this.generateMainTemplate(appState);
    this.renderPhotoGallery(appState.photos);
    this.setupMobileMenu();
  }

  static generateMainTemplate({currentEvent, photos}) {
    return `
      <nav class="mb-8 bg-primary text-white rounded-lg shadow-md overflow-hidden">
        <div class="flex justify-between items-center p-4">
          <h1 class="text-xl font-bold">${CONFIG.appName}</h1>
          <button id="mobileMenuBtn" class="md:hidden text-2xl">
            <i class="fas fa-bars"></i>
          </button>
        </div>
        
        <div id="mobileMenu" class="hidden md:block">
          <div class="flex flex-col md:flex-row md:justify-around p-4 space-y-2 md:space-y-0">
            <button onclick="showSection('gallery')" class="nav-btn active">
              <i class="fas fa-images mr-2"></i>Galería
            </button>
            <button onclick="showSection('upload')" class="nav-btn">
              <i class="fas fa-qrcode mr-2"></i>Compartir
            </button>
            <button onclick="showSection('settings')" class="nav-btn">
              <i class="fas fa-cog mr-2"></i>Configurar
            </button>
          </div>
        </div>
      </nav>

      <section id="gallery" class="section-content">
        ${this.generateGalleryHeader(currentEvent, photos.length)}
        <div id="photoGallery" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"></div>
      </section>

      <section id="upload" class="section-content hidden">
        ${this.generateUploadSection(currentEvent)}
      </section>

      <section id="settings" class="section-content hidden">
        ${this.generateSettingsSection(currentEvent)}
      </section>
    `;
  }

  static generatePhotoCard(photo) {
    return `
      <div class="photo-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <img src="${photo.url}" alt="Foto del evento" class="w-full h-48 object-cover">
        <div class="p-3">
          <p class="text-sm text-gray-500">${new Date(photo.timestamp).toLocaleString()}</p>
          <button onclick="deletePhoto(${photo.id})" class="text-red-500 hover:text-red-700 mt-2 text-sm">
            <i class="fas fa-trash mr-1"></i>Eliminar
          </button>
        </div>
      </div>
    `;
  }

  // Resto de métodos de UI...
}

// Helper para mostrar secciones
function showSection(sectionId) {
  document.querySelectorAll('.section-content').forEach(section => {
    section.classList.add('hidden');
  });
  document.getElementById(sectionId).classList.remove('hidden');
  
  // Actualizar botones activos
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active', 'bg-secondary');
    btn.classList.add('hover:bg-primary-dark');
  });
  event.target.classList.add('active', 'bg-secondary');
}

function deletePhoto(photoId) {
  photoEventApp.deletePhoto(photoId);
}
