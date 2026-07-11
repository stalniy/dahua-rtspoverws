import { PlayerControl } from "./PlayerControl.js";
import { CanvasDrawer } from "./plugin/canvas.js";
import { debug } from "./debug.js";

class DahuaPlayer extends HTMLElement {
  #playerInitializerId = NaN;
  #isPlayerConnected = false;
  #controlsTimeout = null;
  #boundKeydownHandler = null;
  #videoCanvas = null;
  #ivsCanvasDrawer = null;
  #player = null;
  #isFullscreen = false;
  #isIVSEnabled = false;
  #isAudioEnabled = false;
  #isPlaying = false;
  #videoElement = null;
  #renderMode = 'canvas';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['camera-ip', 'channel', 'subtype', 'rtsp-url', 'ws-url', 'autoplay', 'preview-image', 'enable-ivs'];
  }

  connectedCallback() {
    this.#render();
    this.#setupEventListeners();

  }

  disconnectedCallback() {
    clearTimeout(this.#playerInitializerId);
    clearTimeout(this.#controlsTimeout);

    if (this.#boundKeydownHandler) {
      this.removeEventListener('keydown', this.#boundKeydownHandler);
    }

    if (this.#player) {
      this.destroyPlayer();
      this.dispatchEvent(new CustomEvent('disconnected', {
        bubbles: false,
      }));
    }

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = '';
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      clearTimeout(this.#playerInitializerId);
      this.#playerInitializerId = setTimeout(() => {
        this.destroyPlayer();
        this.#initializePlayer();
      }, 100);
    }
  }

  destroyPlayer() {
    this.#cleanupVideoFullscreen();

    if (this.#player) {
      this.#player.close();
    }

    this.#ivsCanvasDrawer?.close();
    this.#player = null;
    this.#ivsCanvasDrawer = null;
    this.#isPlayerConnected = false;
    this.#isFullscreen = false;
    this.#isIVSEnabled = false;
    this.#isAudioEnabled = false;
    this.#isPlaying = false;
    this.#renderMode = 'canvas';
  }

  #render() {
    const previewImage = this.getAttribute('preview-image');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 300px;
          background: #000;
          border-radius: 8px;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .video-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          margin: auto;
        }

        .video-canvas-container {
          position: relative;
          display: grid;
          place-items: center;
          width: 100%;
          height: 100%;
          z-index: var(--dahua-player-z-index, 1);
        }

        .render-surface {
          grid-area: 1 / 1;
          display: block;
          width: 100%;
          height: 100%;
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          background: #000;
        }

        .render-surface.is-hidden {
          opacity: 0;
          pointer-events: none;
        }

        .video-canvas {
          position: relative;
        }

        .preview-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 2;
          opacity: 1;
          transition: opacity 0.3s ease;
        }

        .preview-image.hidden {
          opacity: 0;
          pointer-events: none;
        }

        .controls-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
          padding: 20px;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 3;
        }

        .controls-overlay.visible {
          opacity: 1;
          pointer-events: all;
        }

        .controls-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .control-button {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
          color: white;
          font-size: 18px;
        }

        .control-button:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
          transform: scale(1.05);
        }

        .control-button.active {
          background: rgba(3, 169, 244, 0.3);
          border-color: rgba(3, 169, 244, 0.6);
        }

        .control-button:active {
          transform: scale(0.95);
        }

        .volume-control {
          position: relative;
        }

        .volume-slider {
          position: absolute;
          top: 50px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 4;
        }

        .volume-control:hover .volume-slider,
        .volume-slider:hover {
          opacity: 1;
          pointer-events: all;
        }

        .volume-slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
        }

        .volume-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: white;
          border-radius: 50%;
          border: none;
          cursor: pointer;
        }

        .loading {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 14px;
          opacity: 0.8;
          z-index: 4;
        }

        .error {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #ff5252;
          font-size: 14px;
          text-align: center;
          padding: 20px;
          z-index: 4;
        }

        /* Home Assistant icon styles */
        .icon {
          display: inline-block;
          width: 24px;
          height: 24px;
          fill: currentColor;
        }

        .icon-play::before { content: "▶"; }
        .icon-pause::before { content: "⏸"; }
        .icon-volume::before { content: "🔊"; }
        .icon-volume-mute::before { content: "🔇"; }
        .icon-ivs::before { content: "🎯"; }
        .icon-fullscreen::before { content: "⛶"; }
        .icon-fullscreen-exit::before { content: "⛶"; }

      </style>

      <div class="video-container">
        <div class="video-canvas-container">
          <video id="video-element" class="render-surface is-hidden" playsinline muted></video>
          <canvas class="video-canvas render-surface" id="video-canvas"></canvas>
        </div>

        <div class="loading" id="loading">Connecting...</div>
        <div class="error" id="error" style="display: none;"></div>

        <div class="controls-overlay" id="controls-overlay">
          <div class="controls-container">
            <button class="control-button" id="play-pause-btn" title="Play/Pause">
              <span class="icon icon-play"></span>
            </button>

            <div class="volume-control" style="display: none;">
              <button class="control-button" id="volume-btn" title="Volume">
                <span class="icon icon-volume-mute"></span>
              </button>
              <input type="range" class="volume-slider" id="volume-slider" min="0" max="1" step="0.1" value="0.5">
            </div>

            ${this.#isIVSEnabledInStream()
              ? `
                <button class="control-button" id="ivs-btn" title="Toggle IVS">
                  <span class="icon icon-ivs"></span>
                </button>`.trim()
              : ''}
            <button class="control-button" id="fullscreen-btn" title="Fullscreen">
              <span class="icon icon-fullscreen"></span>
            </button>
          </div>
        </div>
        ${previewImage ? `<img class="preview-image" id="preview-image" src="${previewImage}" alt="Preview">` : ''}
      </div>
    `;
  }

  #setupEventListeners() {
    const container = this.shadowRoot.querySelector('.video-container');
    const playPauseBtn = this.shadowRoot.querySelector('#play-pause-btn');
    const volumeBtn = this.shadowRoot.querySelector('#volume-btn');
    const volumeSlider = this.shadowRoot.querySelector('#volume-slider');
    const ivsBtn = this.shadowRoot.querySelector('#ivs-btn');
    const fullscreenBtn = this.shadowRoot.querySelector('#fullscreen-btn');

    container.addEventListener('mouseenter', () => this.#showControls());
    container.addEventListener('mouseleave', () => this.#hideControls());
    container.addEventListener('mousemove', () => this.#showControls(), { passive: true });
    container.addEventListener('pointerdown', () => this.#unlockAudio(), { passive: true });
    container.addEventListener('touchstart', () => this.#unlockAudio(), { passive: true });

    playPauseBtn.addEventListener('click', () => this.#togglePlay());
    volumeBtn.addEventListener('click', () => this.#toggleAudio());
    volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
    ivsBtn?.addEventListener('click', () => this.#toggleIVS());
    fullscreenBtn.addEventListener('click', () => this.#toggleFullscreen());

    this.#boundKeydownHandler ??= (e) => {
      e.preventDefault();

      switch (e.code) {
        case 'Space':
          this.#togglePlay();
          break;
        case 'KeyM':
          this.#toggleAudio();
          break;
        case 'KeyF':
          this.#toggleFullscreen();
          break;
        case 'KeyI':
          if (ivsBtn) this.#toggleIVS();
          break;
      }
    };

    this.addEventListener('keydown', this.#boundKeydownHandler);
  }

  #initializePlayer() {
    const cameraIp = this.getAttribute('camera-ip');

    if (!cameraIp) {
      this.#showError('camera-ip attribute is required');
      return;
    }

    const channel = parseInt(this.getAttribute('channel'), 10) || 1;
    const subtype = parseInt(this.getAttribute('subtype'), 10) || 0;
    let rtspUrl = this.getAttribute('rtsp-url') || `rtsp://${cameraIp}/cam/realmonitor?channel=${channel}&subtype=${subtype}`;
    if (this.#isIVSEnabledInStream()) rtspUrl += '&proto=Private3';
    const configuredWsUrl = this.getAttribute('ws-url');
    const securePage = window.location.protocol === 'https:';
    const defaultWsProtocol = securePage ? 'wss' : 'ws';
    let wsUrl = configuredWsUrl || `${defaultWsProtocol}://${cameraIp}/rtspoverwebsocket`;

    // Prevent mixed-content errors when the page is served over HTTPS.
    if (securePage && wsUrl.startsWith('ws://')) {
      wsUrl = wsUrl.replace(/^ws:\/\//, 'wss://');
    }

    this.#videoCanvas = this.shadowRoot.querySelector('#video-canvas');
    this.#videoElement = this.shadowRoot.querySelector('#video-element');
    this.#setRenderMode('canvas');
    const loadingEl = this.shadowRoot.querySelector('#loading');

    try {
      this.#player = new PlayerControl({
        wsURL: wsUrl,
        rtspURL: rtspUrl,
        authenticate: (authDetails) => {
          return new Promise((resolve, reject) => {
            this.dispatchEvent(new CustomEvent('authenticate', {
              detail: { authDetails, resolve, reject },
              bubbles: false,
            }));
          }).catch((error) => {
            debug.error('Authentication failed:', error);
            this.#showError('Authentication failed. Please check your credentials.');
          });
        },
      });

      this.#ivsCanvasDrawer = new CanvasDrawer({
        channel: parseInt(channel),
        canvasParent: this.#videoCanvas.parentNode,
      });

      this.#ivsCanvasDrawer.coverAndObserve(this.#videoCanvas);

      this.#player.on("Error", (j) => {
        if (j) {
          const errorMessage = `Connection error: ${j.errorCode}`;
          this.#showError(errorMessage);

          // Dispatch error event
          this.dispatchEvent(new CustomEvent('error', {
            detail: { errorCode: j.errorCode, message: errorMessage }
          }));
        }
      });

      this.#player.on("IvsDraw", (data) => {
        this.#ivsCanvasDrawer?.receiveDataFromStream(data);
      });

      this.#player.on('videoMode', (mode) => {
        this.#setRenderMode(mode);
      });

      this.#player.on('DecodeStart', (event) => {
        this.#setRenderMode(event?.decodeMode);
        this.#hidePreviewImage();
      });

      const volumeBtn = this.shadowRoot.querySelector('#volume-btn').parentNode;
      this.#player.on("SdpInfoProcessed", (event) => {
        if (!event.hasAudioIn) {
          volumeBtn.style.display = 'none';
        } else {
          volumeBtn.style.display = 'block';
        }
      });

      this.#player.init(this.#videoCanvas, this.#videoElement, channel)
        .then(() => {
          loadingEl.style.display = 'none';

          this.dispatchEvent(new CustomEvent('connected', {
            detail: { cameraIp, channel }
          }));

          if (this.hasAttribute('autoplay')) {
            this.play();
          }
        })
        .catch((error) => {
          debug.error('Failed to initialize player:', error);
          this.#showError('Failed to initialize player. Please check your configuration.');
        });


    } catch (error) {
      debug.error('Failed to initialize player:', error);
      this.#showError('Failed to initialize player. Please check your configuration.');
    }
  }

  #showError(message) {
    const loadingEl = this.shadowRoot.querySelector('#loading');
    const errorEl = this.shadowRoot.querySelector('#error');

    if (loadingEl) {
      loadingEl.style.display = 'none';
    }
    if (errorEl) {
      errorEl.style.display = 'block';
      errorEl.textContent = message;
    }
  }

  #setRenderMode(mode = 'canvas') {
    this.#renderMode = mode === 'video' ? 'video' : 'canvas';

    this.#videoCanvas ??= this.shadowRoot.querySelector('#video-canvas');
    this.#videoElement ??= this.shadowRoot.querySelector('#video-element');

    this.#videoCanvas?.classList.toggle('is-hidden', this.#renderMode === 'video');
    this.#videoElement?.classList.toggle('is-hidden', this.#renderMode !== 'video');
  }

  #showControls() {
    const controlsOverlay = this.shadowRoot.querySelector('#controls-overlay');
    if (controlsOverlay) {
      controlsOverlay.classList.add('visible');
    }

    if (this.#controlsTimeout) {
      clearTimeout(this.#controlsTimeout);
    }

    this.#controlsTimeout = setTimeout(() => {
      this.#hideControls();
    }, 3000);
  }

  #hideControls() {
    const controlsOverlay = this.shadowRoot.querySelector('#controls-overlay');
    if (!controlsOverlay) return;
    controlsOverlay.classList.remove('visible');
  }

  #togglePlay() {
    if (!this.#player) return;

    this.#unlockAudio();

    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  #updatePlayButton() {
    const playPauseBtn = this.shadowRoot.querySelector('#play-pause-btn');
    const icon = playPauseBtn.querySelector('.icon');

    if (this.isPlaying) {
      icon.className = 'icon icon-pause';
      playPauseBtn.title = 'Pause';
    } else {
      icon.className = 'icon icon-play';
      playPauseBtn.title = 'Play';
    }
  }

  #toggleAudio() {
    if (!this.#player) return;

    this.#unlockAudio();

    const volumeSlider = this.shadowRoot.querySelector('#volume-slider');

    if (this.#isAudioEnabled) {
      this.setVolume(0);
    } else {
      this.setVolume(parseFloat(volumeSlider.value));
    }
  }

  #isIVSEnabledInStream() {
    return this.hasAttribute('enable-ivs') && this.getAttribute('enable-ivs') !== 'false';
  }

  #unlockAudio() {
    this.#player?.unlockAudio();
  }

  setVolume(value) {
    if (!this.#player) return;

    this.#unlockAudio();
    const volume = parseFloat(value);
    this.#player.setAudioVolume(volume);

    const volumeBtn = this.shadowRoot.querySelector('#volume-btn');
    const icon = volumeBtn.querySelector('.icon');

    if (volume > 0) {
      this.#isAudioEnabled = true;
      icon.className = 'icon icon-volume';
      volumeBtn.classList.add('active');
    } else {
      this.#isAudioEnabled = false;
      icon.className = 'icon icon-volume-mute';
      volumeBtn.classList.remove('active');
    }
  }

  #toggleIVS() {
    if (!this.#ivsCanvasDrawer) return;

    this.#isIVSEnabled = !this.#isIVSEnabled;
    const ivsBtn = this.shadowRoot.querySelector('#ivs-btn');

    if (this.#isIVSEnabled) {
      this.#ivsCanvasDrawer.SetIVSEnable(true);
      this.#ivsCanvasDrawer.cover({
        width: this.#videoCanvas.offsetWidth,
        height: this.#videoCanvas.offsetHeight,
        top: 0,
        left: 0,
        zindex: this.isPlaying ? 10002 : 1
      });
      ivsBtn.classList.add('active');
    } else {
      this.#ivsCanvasDrawer.SetIVSEnable(false);
      ivsBtn.classList.remove('active');
    }
  }

  #toggleFullscreen() {
    this.#videoElement ??= this.shadowRoot.querySelector('#video-element');
    this.#isFullscreen = this.requestFullscreen ? this.#toggleElementFullscreen() : this.#toggleVideoFullscreen();

    const fullscreenBtn = this.shadowRoot.querySelector('#fullscreen-btn');
    const icon = fullscreenBtn.querySelector('.icon');

    if (this.#isFullscreen) {
      icon.className = 'icon icon-fullscreen-exit';
      fullscreenBtn.title = 'Exit Fullscreen';
    } else {
      icon.className = 'icon icon-fullscreen';
      fullscreenBtn.title = 'Fullscreen';
    }
  }

  /**
   * Safari on iOS doesn't support requestFullscreen,
   * so we use a video element to capture the stream and enter fullscreen
   */
  #toggleVideoFullscreen() {
    if (this.#videoElement.webkitPresentationMode === 'fullscreen') {
      this.#cleanupVideoFullscreen();
      this.#videoElement.webkitExitFullscreen();
      return false;
    }

    const video = this.#videoElement;
    const isVideoMode = this.#renderMode === 'video';

    if (!isVideoMode) {
      video.classList.remove('is-hidden');
      video.srcObject = this.#videoCanvas.captureStream(20);
    }

    this.setVolume(0.8);

    video.muted = true;
    video.playsInline = true;
    video.play().then(() => {
      video.webkitEnterFullscreen();
      video.addEventListener('webkitendfullscreen', () => {
        if (!isVideoMode) {
          video.pause();
          video.srcObject = null;
          video.classList.add('is-hidden');
        }
      }, { capture: true, once: true });
    });

    // document.body.addEventListener('click', () => {
    //   video.webkitEnterFullscreen();
    // }, { capture: true, once: true });

    return true;
  }

  #cleanupVideoFullscreen() {
    if (!this.#videoElement) {
      return;
    }

    const video = this.#videoElement;
    const stream = video.srcObject;

    if (stream && typeof stream.getTracks === 'function') {
      stream.getTracks().forEach((track) => track.stop());
    }

    video.pause();
    video.srcObject = null;
    if (this.#renderMode !== 'video') {
      video.classList.add('is-hidden');
    }

    if (document.fullscreenElement === this && document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  #toggleElementFullscreen() {
    if (!document.fullscreenElement) {
      this.requestFullscreen();
      return true;
    }

    document.exitFullscreen();
    return false;
  }

  play() {
    if (!this.#player || this.isPlaying) return;

    this.#unlockAudio();

    if (!this.#isPlayerConnected) {
      this.#player.connect();
      this.#isPlayerConnected = true;
    } else {
      this.#player.play();
    }

    if (!this.#isAudioEnabled) {
      const volumeSlider = this.shadowRoot.querySelector('#volume-slider');
      if (volumeSlider) {
        this.setVolume(volumeSlider.value);
      }
    }

    this.#isPlaying = true;
    this.#updatePlayButton();
  }

  pause() {
    if (!this.#player || !this.isPlaying) return;

    this.#player.pause();
    this.#isPlaying = false;
    this.#updatePlayButton();

    if (this.#isAudioEnabled) {
      this.#toggleAudio();
    }
  }

  stop() {
    if (this.#player) {
      this.#player.stop();
      this.#isPlaying = false;
      this.#updatePlayButton();
      this.#showPreviewImage();
    }
  }

  capture(filename) {
    if (this.#player) {
      this.#player.capture(filename);
    }
  }

  setVolume(volume) {
    if (!this.#player) return;

    const volumeValue = parseFloat(volume);
    this.#player.setAudioVolume(volumeValue);

    const volumeBtn = this.shadowRoot.querySelector('#volume-btn');
    const icon = volumeBtn.querySelector('.icon');

    if (volumeValue > 0) {
      this.#isAudioEnabled = true;
      icon.className = 'icon icon-volume';
      volumeBtn.classList.add('active');
    } else {
      this.#isAudioEnabled = false;
      icon.className = 'icon icon-volume-mute';
      volumeBtn.classList.remove('active');
    }
  }

  enableIVS() {
    if (!this.#ivsCanvasDrawer) return;

    this.#isIVSEnabled = true;
    this.#ivsCanvasDrawer.SetIVSEnable(true);
    this.#ivsCanvasDrawer.cover({
      width: this.#videoCanvas.offsetWidth,
      height: this.#videoCanvas.offsetHeight,
      top: 0,
      left: 0,
      zindex: this.isPlaying ? 10002 : 1
    });

    const ivsBtn = this.shadowRoot.querySelector('#ivs-btn');
    ivsBtn.classList.add('active');
  }

  disableIVS() {
    if (!this.#ivsCanvasDrawer) return;

    this.#isIVSEnabled = false;
    this.#ivsCanvasDrawer.SetIVSEnable(false);

    const ivsBtn = this.shadowRoot.querySelector('#ivs-btn');
    ivsBtn.classList.remove('active');
  }

  // Add preview image methods
  #hidePreviewImage() {
    const previewImage = this.shadowRoot.querySelector('#preview-image');
    if (previewImage) {
      previewImage.classList.add('hidden');
    }
  }

  #showPreviewImage() {
    const previewImage = this.shadowRoot.querySelector('#preview-image');
    if (previewImage) {
      previewImage.classList.remove('hidden');
    }
  }

  get isPlaying() {
    return this.#isPlaying;
  }

  get isAudioEnabled() {
    return this.#isAudioEnabled;
  }
}

customElements.define('dahua-player', DahuaPlayer);

export { DahuaPlayer };
