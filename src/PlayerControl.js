import WebsocketServer from "./WebSocketServer.js";

export class PlayerControl {
  constructor(a) {
    this.wsURL = a.wsURL;
    this.rtspURL = a.rtspURL;
    this.decodeMode = "video";
    this.ws = null;
    this.supportStoreEncrypt = a.supportStoreEncrypt || !1;
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
    };
    this.username = a.username;
    this.password = a.password;
    this.authenticationUrl = a.authenticationUrl;
  }

  init(a, b) {
    this.ws = new WebsocketServer(this.wsURL, this.rtspURL, {
      authenticationUrl: this.authenticationUrl
    });
    this.ws.setStoreEncrypt(this.supportStoreEncrypt);
    this.ws.init(a, b);
    this.ws.setLiveMode(this.decodeMode);
    this.ws.setUserInfo(this.username, this.password);
    for (var c in this.events) this.ws.setCallback(c, this.events[c]);
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
    this.ws.disconnect();
  }
  playByTime(a) {
    this.controlPlayer("PLAY", "video", a);
  }
  playFF(a) {
    this.controlPlayer("PAUSE");
    this.controlPlayer("SCALE", a);
  }
  playRewind() {}
  audioPlay() {
    this.controlPlayer("audioPlay", "start");
  }
  audioStop() {
    this.controlPlayer("audioPlay", "stop");
  }
  setAudioSamplingRate(a) {
    this.controlPlayer("audioSamplingRate", a);
  }
  setAudioVolume(a) {
    this.controlPlayer("volumn", a);
  }
  controlPlayer(a, b, c) {
    var d;
    d =
      "video" === b
        ? {
            command: a,
            range: c ? c : 0,
          }
        : {
            command: a,
            data: b,
          };
    this.ws.controlPlayer(d);
  }
  setPlayMode(a) {
    this.ws.setLiveMode(a);
  }
  setPlayPath(a) {
    this.ws.setRTSPURL(a);
  }
  capture(a) {
    this.ws.capture(a);
  }
  on(a, b) {
    this.events[a] = b;
  }
};