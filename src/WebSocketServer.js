import WorkerManager from "./WorkerManager.js";
import { debug } from "./debug.js";

export class WebsocketServer {
  constructor(wsUrl, rtspUrl, options = {}) {
    this.wsUrl = wsUrl;
    this.rtspUrl = rtspUrl;
    this.options = options;

    this.socket = null;
    this.workerManager = new WorkerManager();
    this.messageChain = Promise.resolve();

    this.responseCodes = {
      OK: 200,
      UNAUTHORIZED: 401,
      NOTFOUND: 404,
      INVALID_RANGE: 457,
      NOTSERVICE: 503,
      DISCONNECT: 999,
    };

    this.interleavedHeaderLength = 6;
    this.getParameterIntervalMs = 40000;

    this.authorizationHeader = "";
    this.streamTracks = [];
    this.nextCSeq = 1;
    this.errorCallback = null;
    this.sessionDescription = {};
    this.state = "Options";
    this.currentTrackIndex = null;
    this.sessionId = null;
    this.playbackMode = "";
    this.isTrackDescriptionComplete = false;
    this.keepAliveTimer = null;
    this.sdpInfo = {};
    this.rtspBaseUrl = rtspUrl;
    this.frameRateCallback = null;
    this.currentCommand = "";
    this.storeEncrypt = false;
    this.expectDescribeResponse = false;
    this.describeCommandSent = false;
  }

  init(canvasElement, videoConfig, channelNumber, audioTalkEnabled) {
    return this.workerManager.init(canvasElement, videoConfig, channelNumber, audioTalkEnabled);
  }

  setStoreEncrypt(enabled) {
    this.storeEncrypt = enabled;
  }

  connect() {
    if (this.socket) return;

    this.socket = new WebSocket(this.wsUrl);
    this.socket.binaryType = "arraybuffer";
    this.socket.addEventListener(
      "message",
      (message) => {
        this.messageChain = this.messageChain
          .then(() => this.handleMessage(message))
          .catch((error) => {
            debug.error("websocket message handling failed", error);
          });
      },
      false
    );
    this.socket.onopen = () => {
      const command = this.buildRTSPCommand("OPTIONS");
      this.socket.send(this.toBytes(command));
    };
    this.socket.onerror = () => {
      this.errorCallback?.({
        errorCode: 202,
        description: "Open WebSocket Error",
      });
    };
  }

  async disconnect() {
    clearInterval(this.keepAliveTimer);
    this.keepAliveTimer = null;

    if (
      this.socket &&
      !(this.socket.readyState === WebSocket.CLOSING || this.socket.readyState === WebSocket.CLOSED)
    ) {
      this.sendCommand(this.buildRTSPCommand("TEARDOWN"));
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.socket.close();
      this.socket.onerror = null;
      this.socket = null;
      this.sessionId = null;
    }

    await this.workerManager.terminate();
  }

  terminateAudio() {
    return this.workerManager.terminateAudio();
  }

  unlockAudio() {
    return this.workerManager.unlockAudio();
  }

  controlPlayer(command) {
    let rtspCommand = "";

    this.currentCommand = command.command;

    switch (command.command) {
      case "PLAY":
        this.state = "Play";
        if (command.range != null) {
          rtspCommand = this.buildRTSPCommand("PLAY", null, command.range);
          this.workerManager.play();
          break;
        }

        rtspCommand = this.buildRTSPCommand("PLAY");
        this.workerManager.initStartTime();
        this.workerManager.play();
        break;
      case "PAUSE":
        if (this.state === "PAUSE") break;
        this.state = "PAUSE";
        rtspCommand = this.buildRTSPCommand("PAUSE");
        this.workerManager.pause();
        break;
      case "SCALE":
        rtspCommand = this.buildRTSPCommand("SCALE", null, command.data);
        this.workerManager.playbackSpeed(command.data);
        break;
      case "TEARDOWN":
        rtspCommand = this.buildRTSPCommand("TEARDOWN");
        break;
      case "audioPlay":
      case "volumn":
      case "audioSamplingRate":
        this.workerManager.controlAudio(command.command, command.data);
        break;
      default:
        debug.log("Unknown command: " + command.command);
    }

    if (rtspCommand !== "") {
      this.sendCommand(rtspCommand);
    }
  }

  setLiveMode(mode) {
    this.workerManager.setLiveMode(mode);
  }

  setRTSPURL(rtspUrl) {
    this.rtspBaseUrl = rtspUrl;
  }

  setCallback(eventName, callback) {
    if (eventName === "GetFrameRate") {
      this.frameRateCallback = callback;
    } else {
      this.workerManager.setCallback(eventName, callback);
    }

    if (eventName === "Error") {
      this.errorCallback = callback;
    }
  }

  capture(filename) {
    this.workerManager.capture(filename);
  }

  buildRTSPCommand(method, trackId = null, methodValue = null) {
    let command = "";

    switch (method) {
      case "OPTIONS":
      case "TEARDOWN":
      case "GET_PARAMETER":
      case "SET_PARAMETERS":
      case "DESCRIBE":
        command =
          method +
          " " +
          this.rtspBaseUrl +
          " RTSP/1.0\r\nCSeq: " +
          this.nextCSeq +
          (this.storeEncrypt ? "\r\nExtraError: support\r\n" : "\r\n") +
          this.authorizationHeader +
          "\r\n";
        break;
      case "SETUP":
        debug.log("trackID: " + trackId);
        command =
          method +
          " " +
          this.rtspBaseUrl +
          "/trackID=" +
          trackId +
          " RTSP/1.0\r\nCSeq: " +
          this.nextCSeq +
          (this.storeEncrypt ? "\r\nExtraError: support\r\n" : "\r\n") +
          this.authorizationHeader +
          "Transport: DH/AVP/TCP;unicast;interleaved=" +
          2 * trackId +
          "-" +
          (2 * trackId + 1) +
          "\r\n";
        command += this.sessionId !== 0 && this.sessionId != null ? "Session: " + this.sessionId + "\r\n\r\n" : "\r\n";
        break;
      case "PLAY":
        command =
          method +
          " " +
          this.rtspBaseUrl +
          " RTSP/1.0\r\nCSeq: " +
          this.nextCSeq +
          (this.storeEncrypt ? "\r\nExtraError: support\r\n" : "\r\n") +
          "Session: " +
          this.sessionId +
          "\r\n";
        if (methodValue !== undefined && methodValue !== 0 && methodValue !== null) {
          command += "Range: npt=" + methodValue + "-\r\n";
        }
        command += this.authorizationHeader + "\r\n";
        break;
      case "PAUSE":
        command =
          method +
          " " +
          this.rtspBaseUrl +
          " RTSP/1.0\r\nCSeq: " +
          this.nextCSeq +
          (this.storeEncrypt ? "\r\nExtraError: support\r\n" : "\r\n") +
          "Session: " +
          this.sessionId +
          "\r\n\r\n";
        break;
      case "SCALE":
        command =
          "PLAY " +
          this.rtspBaseUrl +
          " RTSP/1.0\r\nCSeq: " +
          this.nextCSeq +
          (this.storeEncrypt ? "\r\nExtraError: support\r\n" : "\r\n") +
          "Session: " +
          this.sessionId +
          "\r\n";
        command += "Scale: " + methodValue + "\r\n";
        command += this.authorizationHeader + "\r\n";
        break;
      default:
        break;
    }

    return command;
  }

  async handleResponse(response) {
    const cseqAttr = "CSeq:";
    const cseqLength = 10;
    const cseqIndex = response.indexOf(cseqAttr);

    if (cseqIndex !== -1) {
      const cseqValueStartIndex = cseqIndex + cseqAttr.length;
      this.nextCSeq = parseInt(response.slice(cseqValueStartIndex, cseqValueStartIndex + cseqLength), 10) + 1;
    }

    const parsedResponse = this.parseRtspResponse(response);

    if (parsedResponse.ResponseCode === this.responseCodes.UNAUTHORIZED && this.authorizationHeader === "") {
      await this.authenticate(parsedResponse);
      return undefined;
    }

    if (parsedResponse.ResponseCode === this.responseCodes.OK) {
      if (this.state === "Options") {
        this.state = "Describe";
        return this.buildRTSPCommand("DESCRIBE");
      }

      if (this.state === "Describe") {
        this.isTrackDescriptionComplete = false;
        this.sessionDescription = this.parseSdp(response);
        if (typeof parsedResponse.ContentBase !== "undefined") {
          this.sessionDescription.ContentBase = parsedResponse.ContentBase;
        }

        for (let index = 0; index < this.sessionDescription.Sessions.length; index += 1) {
          const session = this.sessionDescription.Sessions[index];
          const track = {};

          if (
            session.CodecMime === "JPEG" ||
            session.CodecMime === "H264" ||
            session.CodecMime === "H265" ||
            session.CodecMime === "H264-SVC"
          ) {
            track.codecName = session.CodecMime;
            if (session.CodecMime === "H264-SVC") track.codecName = "H264";
            if (session.CodecMime === "H265") this.setLiveMode("canvas");
            track.trackID = session.ControlURL;
            track.ClockFreq = session.ClockFreq;
            track.Port = parseInt(session.Port, 10);
            if (typeof session.Framerate !== "undefined") {
              track.Framerate = parseInt(session.Framerate, 10);
              this.workerManager.setFPS(track.Framerate);
              this.frameRateCallback?.(track.Framerate);
            }
            this.streamTracks.push(track);
          } else if (
            session.CodecMime === "PCMU" ||
            session.CodecMime.search("G726-16") !== -1 ||
            session.CodecMime.search("G726-24") !== -1 ||
            session.CodecMime.search("G726-32") !== -1 ||
            session.CodecMime.search("G726-40") !== -1 ||
            session.CodecMime === "PCMA"
          ) {
            if (session.CodecMime === "PCMU") {
              track.codecName = "G.711Mu";
            } else if (session.CodecMime === "G726-16") {
              track.codecName = "G.726-16";
            } else if (session.CodecMime === "G726-24") {
              track.codecName = "G.726-24";
            } else if (session.CodecMime === "G726-32") {
              track.codecName = "G.726-32";
            } else if (session.CodecMime === "G726-40") {
              track.codecName = "G.726-40";
            } else if (session.CodecMime === "PCMA") {
              track.codecName = "G.711A";
            }
            track.trackID = session.ControlURL;
            track.ClockFreq = session.ClockFreq;
            track.Port = parseInt(session.Port, 10);
            track.Bitrate = parseInt(session.Bitrate, 10);
            this.streamTracks.push(track);
          } else if (session.CodecMime === "mpeg4-generic" || session.CodecMime === "MPEG4-GENERIC") {
            track.codecName = "mpeg4-generic";
            track.trackID = session.ControlURL;
            track.ClockFreq = session.ClockFreq;
            track.Port = parseInt(session.Port, 10);
            track.Bitrate = parseInt(session.Bitrate, 10);
            this.streamTracks.push(track);
          } else if (session.CodecMime === "vnd.onvif.metadata") {
            track.codecName = "MetaData";
            track.trackID = session.ControlURL;
            track.ClockFreq = session.ClockFreq;
            track.Port = parseInt(session.Port, 10);
            this.streamTracks.push(track);
          } else if (session.CodecMime === "stream-assist-frame") {
            track.codecName = "stream-assist-frame";
            track.trackID = session.ControlURL;
            track.ClockFreq = session.ClockFreq;
            track.Port = parseInt(session.Port, 10);
            this.streamTracks.push(track);
          } else {
            debug.log("Unknown codec type:", session.CodecMime, session.ControlURL);
          }
        }

        this.currentTrackIndex = 0;
        this.state = "Setup";
        return this.buildRTSPCommand("SETUP", this.currentTrackIndex);
      }

      if (this.state === "Setup") {
        this.sessionId = parsedResponse.SessionID;
        if (this.currentTrackIndex < this.streamTracks.length) {
          this.streamTracks[this.currentTrackIndex].RtpInterlevedID = parsedResponse.RtpInterlevedID;
          this.streamTracks[this.currentTrackIndex].RtcpInterlevedID = parsedResponse.RtcpInterlevedID;
          this.currentTrackIndex += 1;

          if (this.currentTrackIndex !== this.streamTracks.length) {
            return this.buildRTSPCommand("SETUP", this.streamTracks[this.currentTrackIndex].trackID.split("=")[1] - 0);
          }

          await this.workerManager.sendSdpInfo(this.streamTracks, this.sdpInfo, this.isTrackDescriptionComplete);
          this.state = "Play";
          return this.buildRTSPCommand("PLAY");
        }

        debug.log("Unknown setup SDP index");
      } else if (this.state === "Play") {
        this.sessionId = parsedResponse.SessionID;
        clearInterval(this.keepAliveTimer);
        this.keepAliveTimer = setInterval(() => {
          this.sendCommand(this.buildRTSPCommand("GET_PARAMETER"));
        }, this.getParameterIntervalMs);
        this.state = "Playing";
      } else if (this.state !== "Playing") {
        debug.log("unknown rtsp state:" + this.state);
      }
    } else if (parsedResponse.ResponseCode === this.responseCodes.NOTSERVICE) {
      if (this.state === "Setup" && this.streamTracks[this.currentTrackIndex]?.trackID?.search("trackID=t") !== -1) {
        this.streamTracks[this.currentTrackIndex].RtpInterlevedID = -1;
        this.streamTracks[this.currentTrackIndex].RtcpInterlevedID = -1;
        this.currentTrackIndex += 1;
        this.isTrackDescriptionComplete = false;
        this.errorCallback?.({
          errorCode: "504",
          description: "Talk Service Unavilable",
          place: "RtspClient.js",
        });
        if (this.currentTrackIndex < this.streamTracks.length) {
          return this.buildRTSPCommand("SETUP", this.streamTracks[this.currentTrackIndex].trackID);
        }

        this.state = "Play";
        return this.buildRTSPCommand("PLAY");
      }

      this.errorCallback?.({
        errorCode: "503",
        description: "Service Unavilable",
      });
    } else if (parsedResponse.ResponseCode === this.responseCodes.NOTFOUND) {
      if (this.state === "Describe" || this.state === "Options") {
        this.errorCallback?.({
          errorCode: 404,
          description: "rtsp not found",
        });
      }
    } else if (parsedResponse.ResponseCode === this.responseCodes.INVALID_RANGE) {
      if (this.playbackMode === "backup" || this.playbackMode === "playback") {
        this.errorCallback?.({
          errorCode: "457",
          description: "Invalid range",
        });
      }
      debug.log("RTP disconnection detect!!!");
    }

    return undefined;
  }

  async authenticate(response) {
    const authRequest = {
      Method: this.state.toUpperCase(),
      Realm: response.Realm,
      Nonce: response.Nonce,
      Uri: this.rtspBaseUrl,
    };

    debug.log(authRequest, "<---");
    const credentials = await this.options?.authenticate(authRequest);
    debug.log(credentials, "<---");

    this.authorizationHeader =
      'Authorization: Digest username="' + credentials.username + '", realm="' + authRequest.Realm + '",';
    this.authorizationHeader +=
      ' nonce="' + authRequest.Nonce + '", uri="' + authRequest.Uri + '", response="' + credentials.digest + '"';
    this.authorizationHeader += "\r\n";

    this.sendCommand(this.buildRTSPCommand("OPTIONS"));
  }

  sendCommand(command) {
    if (command == null || command === "") return;

    if (this.socket !== null && this.socket.readyState === WebSocket.OPEN) {
      if (this.describeCommandSent === false) {
        const describeIndex = command.search("DESCRIBE");
        if (describeIndex !== -1) {
          this.expectDescribeResponse = true;
          this.describeCommandSent = true;
        }
      }

      this.socket.send(this.toBytes(command));
    } else {
      debug.log("websocket not connected");
    }
  }

  toBytes(text) {
    return new TextEncoder().encode(text);
  }

  async handleMessage(message) {
    let buffer = new Uint8Array(message.data);
    let command = "";

    while (buffer.length > 0) {
      if (buffer[0] !== 36) {
        const responseText = String.fromCharCode.apply(null, buffer);
        let endOfResponse = null;

        if (responseText.indexOf("OffLine:KmsUnavailable") !== -1) {
          this.errorCallback?.({
            errorCode: 203,
          });
        }

        if (this.expectDescribeResponse === true) {
          endOfResponse = responseText.lastIndexOf("\r\n");
          this.expectDescribeResponse = false;
        } else {
          endOfResponse = responseText.search("\r\n\r\n");
        }

        const rtspStartIndex = responseText.search("RTSP");
        if (rtspStartIndex === -1) return;
        if (endOfResponse === -1) return;

        const responseBytes = buffer.subarray(rtspStartIndex, endOfResponse + this.interleavedHeaderLength);
        buffer = buffer.subarray(endOfResponse + this.interleavedHeaderLength);
        command = String.fromCharCode.apply(null, responseBytes);
      } else {
        const interleavedHeader = buffer.subarray(0, this.interleavedHeaderLength);
        const payloadLength =
          (interleavedHeader[2] << 24) |
          (interleavedHeader[3] << 16) |
          (interleavedHeader[4] << 8) |
          interleavedHeader[5];

        if (!(payloadLength + this.interleavedHeaderLength <= buffer.length)) {
          return;
        }

        const payload = buffer.subarray(this.interleavedHeaderLength, payloadLength + this.interleavedHeaderLength);
        this.workerManager.parseRTPData(interleavedHeader, payload);
        buffer = buffer.subarray(payloadLength + this.interleavedHeaderLength);
      }
    }

    this.sendCommand(await this.handleResponse(command));
  }

  parseRtspResponse(response) {
    const parsed = {};
    let contentLines = [];

    if (response.search("Content-Type: application/sdp") !== -1) {
      const splitResponse = response.split("\r\n\r\n");
      contentLines = splitResponse[0].split("\r\n");
    } else {
      contentLines = response.split("\r\n");
    }

    const statusParts = contentLines[0].split(" ");
    if (statusParts.length > 2) {
      parsed.ResponseCode = parseInt(statusParts[1], 10);
      parsed.ResponseMessage = statusParts[2];
    }

    if (parsed.ResponseCode === this.responseCodes.OK) {
      for (let index = 1; index < contentLines.length; index += 1) {
        const headerParts = contentLines[index].split(":");

        if (headerParts[0] === "Public") {
          parsed.MethodsSupported = headerParts[1].split(",");
        } else if (headerParts[0] === "CSeq") {
          parsed.CSeq = parseInt(headerParts[1], 10);
        } else if (headerParts[0] === "Content-Type") {
          parsed.ContentType = headerParts[1];
          if (parsed.ContentType.search("application/sdp") !== -1) {
            parsed.SDPData = this.parseSdp(response);
          }
        } else if (headerParts[0] === "Content-Length") {
          parsed.ContentLength = parseInt(headerParts[1], 10);
        } else if (headerParts[0] === "Content-Base") {
          const contentBaseIndex = contentLines[index].search("Content-Base:");
          if (contentBaseIndex !== -1) {
            parsed.ContentBase = contentLines[index].substr(contentBaseIndex + 13);
          }
        } else if (headerParts[0] === "Session") {
          const sessionParts = headerParts[1].split(";");
          parsed.SessionID = parseInt(sessionParts[0], 10);
        } else if (headerParts[0] === "Transport") {
          const transportParts = headerParts[1].split(";");
          for (let transportIndex = 0; transportIndex < transportParts.length; transportIndex += 1) {
            const interleavedIndex = transportParts[transportIndex].search("interleaved=");
            if (interleavedIndex !== -1) {
              const interleavedValue = transportParts[transportIndex].substr(interleavedIndex + 12);
              const pair = interleavedValue.split("-");
              if (pair.length > 1) {
                parsed.RtpInterlevedID = parseInt(pair[0], 10);
                parsed.RtcpInterlevedID = parseInt(pair[1], 10);
              }
            }
          }
        } else if (headerParts[0] === "RTP-Info") {
          headerParts[1] = contentLines[index].substr(9);
          const streamInfoParts = headerParts[1].split(",");
          parsed.RTPInfoList = [];
          for (let streamIndex = 0; streamIndex < streamInfoParts.length; streamIndex += 1) {
            const itemParts = streamInfoParts[streamIndex].split(";");
            const item = {};
            for (let itemIndex = 0; itemIndex < itemParts.length; itemIndex += 1) {
              let partIndex = itemParts[itemIndex].search("url=");
              if (partIndex !== -1) item.URL = itemParts[itemIndex].substr(partIndex + 4);
              partIndex = itemParts[itemIndex].search("seq=");
              if (partIndex !== -1) item.Seq = parseInt(itemParts[itemIndex].substr(partIndex + 4), 10);
            }
            parsed.RTPInfoList.push(item);
          }
        }
      }
    } else if (parsed.ResponseCode === this.responseCodes.UNAUTHORIZED) {
      for (let index = 1; index < contentLines.length; index += 1) {
        const headerParts = contentLines[index].split(":");
        if (headerParts[0] === "CSeq") {
          parsed.CSeq = parseInt(headerParts[1], 10);
        } else if (headerParts[0] === "WWW-Authenticate") {
          const authenticateParts = headerParts[1].split(",");
          for (let authIndex = 0; authIndex < authenticateParts.length; authIndex += 1) {
            let headerIndex = authenticateParts[authIndex].search("Digest realm=");
            if (headerIndex !== -1) {
              const realmText = authenticateParts[authIndex].substr(headerIndex + 13);
              const realmParts = realmText.split('"');
              parsed.Realm = realmParts[1];
            }

            headerIndex = authenticateParts[authIndex].search("nonce=");
            if (headerIndex !== -1) {
              const nonceText = authenticateParts[authIndex].substr(headerIndex + 6);
              const nonceParts = nonceText.split('"');
              parsed.Nonce = nonceParts[1];
            }
          }
        }
      }
    }

    return parsed;
  }

  parseSdp(response) {
    const parsed = {
      Sessions: [],
    };

    let sdpText;
    if (response.search("Content-Type: application/sdp") !== -1) {
      const splitResponse = response.split("\r\n\r\n");
      sdpText = splitResponse[1];
    } else {
      sdpText = response;
    }

    const lines = sdpText.split("\r\n");
    let hasMediaSection = false;

    for (let index = 0; index < lines.length; index += 1) {
      const parts = lines[index].split("=");
      if (parts.length <= 0) continue;

      switch (parts[0]) {
        case "a": {
          const attributeParts = parts[1].split(":");
          if (attributeParts.length <= 1) break;

          if (attributeParts[0] === "control") {
            const controlIndex = lines[index].search("control:");
            if (hasMediaSection === true) {
              if (controlIndex !== -1) {
                parsed.Sessions[parsed.Sessions.length - 1].ControlURL = lines[index].substr(controlIndex + 8);
              }
            } else if (controlIndex !== -1) {
              parsed.BaseURL = lines[index].substr(controlIndex + 8);
            }
          } else if (attributeParts[0] === "rtpmap") {
            const rtpmapParts = attributeParts[1].split(" ");
            parsed.Sessions[parsed.Sessions.length - 1].PayloadType = rtpmapParts[0];
            const codecParts = rtpmapParts[1].split("/");
            parsed.Sessions[parsed.Sessions.length - 1].CodecMime = codecParts[0];
            if (codecParts.length > 1) {
              parsed.Sessions[parsed.Sessions.length - 1].ClockFreq = codecParts[1];
            }
          } else if (attributeParts[0] === "framesize") {
            const frameSizeParts = attributeParts[1].split(" ");
            if (frameSizeParts.length > 1) {
              const dimensions = frameSizeParts[1].split("-");
              parsed.Sessions[parsed.Sessions.length - 1].Width = dimensions[0];
              parsed.Sessions[parsed.Sessions.length - 1].Height = dimensions[1];
            }
          } else if (attributeParts[0] === "framerate") {
            parsed.Sessions[parsed.Sessions.length - 1].Framerate = attributeParts[1];
          } else if (attributeParts[0] === "fmtp") {
            const fmtpParts = lines[index].split(" ");
            if (fmtpParts.length < 2) continue;

            for (let fmtpIndex = 1; fmtpIndex < fmtpParts.length; fmtpIndex += 1) {
              const parameterParts = fmtpParts[fmtpIndex].split(";");
              for (let parameterIndex = 0; parameterIndex < parameterParts.length; parameterIndex += 1) {
                let valueIndex = parameterParts[parameterIndex].search("mode=");
                if (valueIndex !== -1) {
                  parsed.Sessions[parsed.Sessions.length - 1].mode = parameterParts[parameterIndex].substr(valueIndex + 5);
                }

                valueIndex = parameterParts[parameterIndex].search("config=");
                if (valueIndex !== -1) {
                  parsed.Sessions[parsed.Sessions.length - 1].config = parameterParts[parameterIndex].substr(valueIndex + 7);
                  this.sdpInfo.config = parsed.Sessions[parsed.Sessions.length - 1].config;
                  this.sdpInfo.clockFreq = parsed.Sessions[parsed.Sessions.length - 1].ClockFreq;
                  this.sdpInfo.bitrate = parsed.Sessions[parsed.Sessions.length - 1].Bitrate;
                }

                valueIndex = parameterParts[parameterIndex].search("sprop-vps=");
                if (valueIndex !== -1) {
                  parsed.Sessions[parsed.Sessions.length - 1].VPS = parameterParts[parameterIndex].substr(valueIndex + 10);
                }

                valueIndex = parameterParts[parameterIndex].search("sprop-sps=");
                if (valueIndex !== -1) {
                  parsed.Sessions[parsed.Sessions.length - 1].SPS = parameterParts[parameterIndex].substr(valueIndex + 10);
                }

                valueIndex = parameterParts[parameterIndex].search("sprop-pps=");
                if (valueIndex !== -1) {
                  parsed.Sessions[parsed.Sessions.length - 1].PPS = parameterParts[parameterIndex].substr(valueIndex + 10);
                }

                valueIndex = parameterParts[parameterIndex].search("sprop-parameter-sets=");
                if (valueIndex !== -1) {
                  const parameterSetText = parameterParts[parameterIndex].substr(valueIndex + 21);
                  const parameterSetValues = parameterSetText.split(",");
                  if (parameterSetValues.length > 1) {
                    parsed.Sessions[parsed.Sessions.length - 1].SPS = parameterSetValues[0];
                    parsed.Sessions[parsed.Sessions.length - 1].PPS = parameterSetValues[1];
                  }
                }
              }
            }
          }
          break;
        }
        case "m": {
          const mediaParts = parts[1].split(" ");
          const session = {};
          session.Type = mediaParts[0];
          session.Port = mediaParts[1];
          session.Payload = mediaParts[3];
          parsed.Sessions.push(session);
          hasMediaSection = true;
          break;
        }
        case "b": {
          if (hasMediaSection === true) {
            const bitrateParts = parts[1].split(":");
            parsed.Sessions[parsed.Sessions.length - 1].Bitrate = bitrateParts[1];
          }
          break;
        }
        default:
          break;
      }
    }

    return parsed;
  }
}
