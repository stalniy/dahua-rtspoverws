import {WebsocketServer} from "./WebSocketServer.js";

export class PlayerControl {
  constructor(config) {
    this.wsURL = config.wsURL;
    this.rtspURL = config.rtspURL;
    this.decodeMode = "canvas";
    this.ws = null;
    this.supportStoreEncrypt = config.supportStoreEncrypt || !1;
    this.events = {
      ResolutionChanged() {},
      PlayStart() {},
      DecodeStart() {},
      UpdateCanvas() {},
      GetFrameRate() {},
      FrameTypeChange() {},
      Error() {},
      MSEResolutionChanged() {},
      audioChange() {},
      WorkerReady() {},
      IvsDraw() {},
      FileOver() {},
      Waiting() {},
      SdpInfoProcessed() {},
    };
    this.authenticate= config.authenticate;
    this.el = null;
  }

  async init(canvasElement, videoElement, channelNumber) {
    this.el = canvasElement;
    this.ws = new WebsocketServer(this.wsURL, this.rtspURL, {
      authenticate: this.authenticate
    });
    this.ws.setLiveMode(this.decodeMode);

    this.ws.setStoreEncrypt(this.supportStoreEncrypt);
    await this.ws.init(canvasElement, videoElement, channelNumber);
    for (var eventType in this.events) this.ws.setCallback(eventType, this.events[eventType]);
    if (this.events.SdpInfoProcessed) {
      const callback = this.events.SdpInfoProcessed;
      this.ws.setCallback("SdpInfoProcessed", (event) => {
        if (!event.hasAudioIn) {
          this.ws.terminateAudio();
        }
        callback(event);
      });
    }
    this.events = null;
  }
  connect() {
    this.ws.connect();
  }
  play() {
    this.controlPlayer("PLAY");
  }
  pause() {
    this.controlPlayer("PAUSE");
  }
  stop() {
    this.controlPlayer("TEARDOWN");
  }
  close() {
    return this.ws?.disconnect();
  }
  playByTime(timestamp) {
    this.controlPlayer("PLAY", "video", timestamp);
  }
  setPlaySpeed(speed) {
    this.controlPlayer("PAUSE");
    this.controlPlayer("SCALE", speed);
  }
  playRewind() {}
  audioPlay() {
    this.controlPlayer("audioPlay", "start");
  }
  audioStop() {
    this.controlPlayer("audioPlay", "stop");
  }
  setAudioSamplingRate(samplingRate) {
    this.controlPlayer("audioSamplingRate", samplingRate);
  }
  setAudioVolume(volume) {
    this.controlPlayer("volumn", volume);
  }
  controlPlayer(command, dataType, dataValue) {
    var controlData =
      "video" === dataType
        ? {
            command: command,
            range: dataValue ? dataValue : 0,
          }
        : {
            command: command,
            data: dataType,
          };
    this.ws.controlPlayer(controlData);
  }
  setPlayMode(playMode) {
    this.ws.setLiveMode(playMode);
  }
  setRTSPURL(rtspUrl) {
    this.ws.setRTSPURL(rtspUrl);
  }
  capture(filename) {
    this.ws.capture(filename);
  }
  on(eventType, callback) {
    this.events[eventType] = callback;
  }
};
