// Configuración personalizable - Edita estos valores
const CONFIG = {
  appName: "FotoEventos",
  colors: {
    primary: "#3B82F6",
    secondary: "#8B5CF6",
    accent: "#EC4899"
  },
  defaultEvent: {
    name: "Mi Evento Especial",
    date: new Date().toISOString().split('T')[0]
  }
};

class PhotoEvent {
  constructor() {
    this.currentEvent = {...CONFIG.defaultEvent};
    this.photos = [];
    this.init();
  }

  init() {
    this.loadFromLocalStorage();
    this.setupEventListeners();
    this.renderUI();
  }

  loadFromLocalStorage() {
    const savedEvent = localStorage.getItem('photoEvent');
    if (savedEvent) this.currentEvent = JSON.parse(savedEvent);

    const savedPhotos = localStorage.getItem('eventPhotos');
    if (savedPhotos) this.photos = JSON.parse(savedPhotos);
  }

  saveToLocalStorage() {
    localStorage.setItem('photoEvent', JSON.stringify(this.currentEvent));
    localStorage.setItem('eventPhotos', JSON.stringify(this.photos));
  }

  addPhoto(photoUrl) {
    const newPhoto = {
      id: Date.now(),
      url: photoUrl,
      timestamp: new Date().toISOString()
    };
    this.photos.unshift(newPhoto);
    this.saveToLocalStorage();
    this.renderUI();
    showToast('Nueva foto agregada!');
  }

  deletePhoto(photoId) {
    this.photos = this.photos.filter(photo => photo.id !== photoId);
    this.saveToLocalStorage();
    this.renderUI();
  }

  clearAllPhotos() {
    this.photos = [];
    this.saveToLocalStorage();
    this.renderUI();
  }

  updateEventSettings(newSettings) {
    this.currentEvent = {...this.currentEvent, ...newSettings};
    this.saveToLocalStorage();
    this.renderUI();
    showToast('Configuración actualizada');
  }

  setupEventListeners() {
    // Implementar en UI.js
  }

  renderUI() {
    // Implementar en UI.js
  }
}

const photoEventApp = new PhotoEvent();
