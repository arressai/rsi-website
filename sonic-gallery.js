class SonicGallery {
  constructor() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
    this.gainNode.gain.value = 0.3;
    
    this.soundEnabled = true;
    this.oscillators = {};
    this.filters = {};
    
    this.init();
  }

  init() {
    const gallery = document.getElementById('sonicGallery');
    const items = gallery.querySelectorAll('.sonic-item');
    
    items.forEach((item, index) => {
      this.createFallingItem(item, index);
    });

    // Event listeners
    document.getElementById('toggleSound').addEventListener('click', () => this.toggleSound());
    document.getElementById('resetGallery').addEventListener('click', () => this.reset());
  }

  createFallingItem(item, index) {
    const delay = index * 0.3;
    const duration = 3 + Math.random() * 2;
    const leftPosition = (index % 6) * 16.67;
    
    item.style.setProperty('--delay', `${delay}s`);
    item.style.setProperty('--duration', `${duration}s`);
    item.style.left = `${leftPosition}%`;
    
    // Click to trigger sound
    item.addEventListener('click', () => this.playSound(item));
    
    // Mouse move for filter modulation
    item.addEventListener('mousemove', (e) => this.modulateFilter(item, e));
    item.addEventListener('mouseleave', () => this.stopSound(item));
  }

  playSound(item) {
    if (!this.soundEnabled) return;
    
    const itemId = item.dataset.sonicId || `item-${Math.random()}`;
    item.dataset.sonicId = itemId;
    
    const filterType = item.dataset.filter;
    
    // Create oscillator
    const oscillator = this.audioContext.createOscillator();
    const filter = this.audioContext.createBiquadFilter();
    
    oscillator.frequency.value = 200 + Math.random() * 300;
    oscillator.type = 'sine';
    
    filter.type = filterType;
    filter.frequency.value = filterType === 'lowpass' ? 2000 : 200;
    filter.Q.value = 5;
    
    oscillator.connect(filter);
    filter.connect(this.gainNode);
    
    oscillator.start();
    
    this.oscillators[itemId] = oscillator;
    this.filters[itemId] = filter;
    
    // Auto stop after duration
    setTimeout(() => this.stopSound(item), 2000);
  }

  modulateFilter(item, event) {
    if (!this.soundEnabled) return;
    
    const itemId = item.dataset.sonicId;
    if (!this.filters[itemId]) return;
    
    const filter = this.filters[itemId];
    const filterType = item.dataset.filter;
    
    // Get mouse Y position (0-1)
    const rect = item.getBoundingClientRect();
    const y = (event.clientY - rect.top) / rect.height;
    
    if (filterType === 'lowpass') {
      // Range: 200Hz to 4000Hz
      filter.frequency.value = 200 + y * 3800;
    } else if (filterType === 'highpass') {
      // Range: 20Hz to 2000Hz
      filter.frequency.value = 20 + y * 1980;
    }
  }

  stopSound(item) {
    const itemId = item.dataset.sonicId;
    
    if (this.oscillators[itemId]) {
      this.oscillators[itemId].stop();
      delete this.oscillators[itemId];
      delete this.filters[itemId];
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    const btn = document.getElementById('toggleSound');
    btn.textContent = this.soundEnabled ? 'SOUND ON' : 'SOUND OFF';
  }

  reset() {
    // Stop all sounds
    Object.values(this.oscillators).forEach(osc => {
      try {
        osc.stop();
      } catch (e) {}
    });
    this.oscillators = {};
    this.filters = {};
    
    // Reset gallery
    location.reload();
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  new SonicGallery();
});