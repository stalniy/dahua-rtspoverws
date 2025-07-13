import WorkerManager from "./WorkManager.js";

export function WebsocketServer(wsUrl, rtspUrl, options) {
  function c() {}
  function buildRTSPCommand(method, trackId, c, methodValue) {
    var command = "";
    switch (method) {
      case "OPTIONS":
      case "TEARDOWN":
      case "GET_PARAMETER":
      case "SET_PARAMETERS":
        command =
          method +
          " " +
          M +
          " RTSP/1.0\r\nCSeq: " +
          B +
          (Q ? "\r\nExtraError: support\r\n" : "\r\n") +
          z +
          "\r\n";
        break;
      case "DESCRIBE":
        command =
          method +
          " " +
          M +
          " RTSP/1.0\r\nCSeq: " +
          B +
          (Q ? "\r\nExtraError: support\r\n" : "\r\n") +
          z +
          "\r\n";
        break;
      case "SETUP":
        console.log("trackID: " + trackId),
          (command =
            method +
            " " +
            M +
            "/trackID=" +
            trackId +
            " RTSP/1.0\r\nCSeq: " +
            B +
            (Q ? "\r\nExtraError: support\r\n" : "\r\n") +
            z +
            "Transport: DH/AVP/TCP;unicast;interleaved=" +
            2 * trackId +
            "-" +
            (2 * trackId + 1) +
            "\r\n"),
          (command += 0 != G ? "Session: " + G + "\r\n\r\n" : "\r\n");
        break;
      case "PLAY":
        (command =
          method +
          " " +
          M +
          " RTSP/1.0\r\nCSeq: " +
          B +
          (Q ? "\r\nExtraError: support\r\n" : "\r\n") +
          "Session: " +
          G +
          "\r\n"),
          void 0 != methodValue && 0 != methodValue
            ? ((command += "Range: npt=" + methodValue + "-\r\n"), (command += z + "\r\n"))
            : (command += z + "\r\n");
        break;
      case "PAUSE":
        command =
          method +
          " " +
          M +
          " RTSP/1.0\r\nCSeq: " +
          B +
          (Q ? "\r\nExtraError: support\r\n" : "\r\n") +
          "Session: " +
          G +
          "\r\n\r\n";
        break;
      case "SCALE":
        (command =
          "PLAY " +
          M +
          " RTSP/1.0\r\nCSeq: " +
          B +
          (Q ? "\r\nExtraError: support\r\n" : "\r\n") +
          "Session: " +
          G +
          "\r\n"),
          (command += "Scale: " + methodValue + "\r\n"),
          (command += z + "\r\n");
    }
    return command;
  }
  async function handleResponse(response) {
    var b = {},
      e = response.search("CSeq: ") + 5;
    if (
      ((B = parseInt(response.slice(e, e + 10)) + 1),
      (b = m(response)),
      b.ResponseCode === x.UNAUTHORIZED && "" === z)
    )
      await authenticate(b);
    else if (b.ResponseCode === x.OK) {
      if ("Options" === E) return (E = "Describe"), buildRTSPCommand("DESCRIBE", null, null);
      if ("Describe" === E) {
        (I = !1),
          (D = n(response)),
          "undefined" != typeof b.ContentBase &&
            (D.ContentBase = b.ContentBase);
        var g = 0;
        for (g = 0; g < D.Sessions.length; g += 1) {
          var i = {};
          "JPEG" === D.Sessions[g].CodecMime ||
          "H264" === D.Sessions[g].CodecMime ||
          "H265" === D.Sessions[g].CodecMime ||
          "H264-SVC" == D.Sessions[g].CodecMime
            ? ((i.codecName = D.Sessions[g].CodecMime),
              "H264-SVC" == D.Sessions[g].CodecMime && (i.codecName = "H264"),
              "H265" == D.Sessions[g].CodecMime &&
                c.prototype.setLiveMode("canvas"),
              (i.trackID = D.Sessions[g].ControlURL),
              (i.ClockFreq = D.Sessions[g].ClockFreq),
              (i.Port = parseInt(D.Sessions[g].Port)),
              "undefined" != typeof D.Sessions[g].Framerate &&
                ((i.Framerate = parseInt(D.Sessions[g].Framerate)),
                workerManager.setFPS(i.Framerate),
                N(i.Framerate)),
              A.push(i))
            : "PCMU" === D.Sessions[g].CodecMime ||
              -1 !== D.Sessions[g].CodecMime.search("G726-16") ||
              -1 !== D.Sessions[g].CodecMime.search("G726-24") ||
              -1 !== D.Sessions[g].CodecMime.search("G726-32") ||
              -1 !== D.Sessions[g].CodecMime.search("G726-40") ||
              "PCMA" === D.Sessions[g].CodecMime
            ? ("PCMU" === D.Sessions[g].CodecMime
                ? (i.codecName = "G.711Mu")
                : "G726-16" === D.Sessions[g].CodecMime
                ? (i.codecName = "G.726-16")
                : "G726-24" === D.Sessions[g].CodecMime
                ? (i.codecName = "G.726-24")
                : "G726-32" === D.Sessions[g].CodecMime
                ? (i.codecName = "G.726-32")
                : "G726-40" === D.Sessions[g].CodecMime
                ? (i.codecName = "G.726-40")
                : "PCMA" === D.Sessions[g].CodecMime &&
                  (i.codecName = "G.711A"),
              (i.trackID = D.Sessions[g].ControlURL),
              (i.ClockFreq = D.Sessions[g].ClockFreq),
              (i.Port = parseInt(D.Sessions[g].Port)),
              (i.Bitrate = parseInt(D.Sessions[g].Bitrate)),
              A.push(i))
            : "mpeg4-generic" === D.Sessions[g].CodecMime ||
              "MPEG4-GENERIC" === D.Sessions[g].CodecMime
            ? ((i.codecName = "mpeg4-generic"),
              (i.trackID = D.Sessions[g].ControlURL),
              (i.ClockFreq = D.Sessions[g].ClockFreq),
              (i.Port = parseInt(D.Sessions[g].Port)),
              (i.Bitrate = parseInt(D.Sessions[g].Bitrate)),
              A.push(i))
            : "vnd.onvif.metadata" === D.Sessions[g].CodecMime
            ? ((i.codecName = "MetaData"),
              (i.trackID = D.Sessions[g].ControlURL),
              (i.ClockFreq = D.Sessions[g].ClockFreq),
              (i.Port = parseInt(D.Sessions[g].Port)),
              A.push(i))
            : "stream-assist-frame" === D.Sessions[g].CodecMime
            ? ((i.codecName = "stream-assist-frame"),
              (i.trackID = D.Sessions[g].ControlURL),
              (i.ClockFreq = D.Sessions[g].ClockFreq),
              (i.Port = parseInt(D.Sessions[g].Port)),
              A.push(i))
            : console.log(
                "Unknown codec type:",
                D.Sessions[g].CodecMime,
                D.Sessions[g].ControlURL
              );
        }
        return (F = 0), (E = "Setup"), buildRTSPCommand("SETUP", F);
      }
      if ("Setup" === E) {
        if (((G = b.SessionID), F < A.length))
          return (
            (A[F].RtpInterlevedID = b.RtpInterlevedID),
            (A[F].RtcpInterlevedID = b.RtcpInterlevedID),
            (F += 1),
            F !== A.length
              ? buildRTSPCommand("SETUP", A[F].trackID.split("=")[1] - 0)
              : (workerManager.sendSdpInfo(A, L, I), (E = "Play"), buildRTSPCommand("PLAY", null))
          );
        console.log("Unknown setup SDP index");
      } else if ("Play" === E) {
        (G = b.SessionID),
          clearInterval(J),
          (J = setInterval(function () {
            return sendCommand(buildRTSPCommand("GET_PARAMETER", null, null));
          }, y));
        E = "Playing";
      } else "Playing" === E || console.log("unknown rtsp state:" + E);
    } else if (b.ResponseCode === x.NOTSERVICE) {
      if ("Setup" === E && -1 !== A[F].trackID.search("trackID=t"))
        return (
          (A[F].RtpInterlevedID = -1),
          (A[F].RtcpInterlevedID = -1),
          (F += 1),
          (I = !1),
          C({
            errorCode: "504",
            description: "Talk Service Unavilable",
            place: "RtspClient.js",
          }),
          F < A.length
            ? buildRTSPCommand("SETUP", A[F].trackID)
            : ((E = "Play"), buildRTSPCommand("PLAY", null))
        );
      C({
        errorCode: "503",
        description: "Service Unavilable",
      });
    } else if (b.ResponseCode === x.NOTFOUND) {
      if ("Describe" === E || "Options" === E)
        return void C({
          errorCode: 404,
          description: "rtsp not found",
        });
    } else if (b.ResponseCode === x.INVALID_RANGE)
      return (
        ("backup" === H || "playback" === H) &&
          C({
            errorCode: "457",
            description: "Invalid range",
          }),
        void console.log("RTP disconnection detect!!!")
      );
  }
  async function authenticate(a) {
    var e = {
        Method: null,
        Realm: null,
        Nonce: null,
        Uri: null,
      },
      f = null;
    (e = {
      Method: E.toUpperCase(),
      Realm: a.Realm,
      Nonce: a.Nonce,
      Uri: M,
    });

    console.log(e, "<---");
    const credentials = await options?.authenticate(e);
    console.log(credentials, "<---");

      // (f = digestAuth(b, c, e.Uri, e.Realm, e.Nonce, e.Method));
      // console.log(digestAuth(b, c, e.Uri, e.Realm, e.Nonce, e.Method));
      (z =
        'Authorization: Digest username="' + credentials.username + '", realm="' + e.Realm + '",'),
      (z +=
        ' nonce="' + e.Nonce + '", uri="' + e.Uri + '", response="' + credentials.digest + '"'),
      (z += "\r\n"),
      sendCommand(buildRTSPCommand("OPTIONS", null, null));
  }
  function sendCommand(command) {
    if (void 0 != command && null != command && "" != command)
      if (null !== socket && socket.readyState === WebSocket.OPEN) {
        if (v === !1) {
          var b = command.search("DESCRIBE");
          -1 !== b && ((u = !0), (v = !0));
        }
        void 0 != command && socket.send(
          toBytes(command)
        );
      } else console.log("websocket not connected");
  }
  function toBytes(text) {
    return new TextEncoder().encode(text);
  }
  async function handleMessage(message) {
    var b = new Uint8Array(),
      c = new Uint8Array(message.data);
    var command = '';
    for (b = new Uint8Array(c.length), b.set(c, 0), s = b.length; s > 0; )
      if (36 !== b[0]) {
        var d = String.fromCharCode.apply(null, b),
          f = null;
        -1 !== d.indexOf("OffLine:File Over"),
          -1 !== d.indexOf("OffLine:KmsUnavailable") &&
            C({
              errorCode: 203,
            }),
          u === !0
            ? ((f = d.lastIndexOf("\r\n")), (u = !1))
            : (f = d.search("\r\n\r\n"));
        var g = d.search("RTSP");
        if (-1 === g) return void (b = new Uint8Array());
        if (-1 === f) return void (s = b.length);
        (q = b.subarray(g, f + p)), (b = b.subarray(f + p));
        var i = String.fromCharCode.apply(null, q);
        command = i, (s = b.length);
      } else {
        if (
          ((r = b.subarray(0, p)),
          (t = (r[2] << 24) | (r[3] << 16) | (r[4] << 8) | r[5]),
          !(t + p <= b.length))
        )
          return void (s = b.length);
        var j = b.subarray(p, t + p);
        l(r, j), (b = b.subarray(t + p)), (s = b.length);
      }

      sendCommand(await handleResponse(command))
  }
  function k(a) {
    K = a;
  }
  function l(a, b) {
    workerManager.parseRTPData(a, b), k(!0);
  }
  function m(a) {
    var b = {},
      c = 0,
      d = 0,
      e = null,
      f = null,
      g = null;
    if (-1 !== a.search("Content-Type: application/sdp")) {
      var h = a.split("\r\n\r\n");
      g = h[0];
    } else g = a;
    var i = g.split("\r\n"),
      j = i[0].split(" ");
    if (
      (j.length > 2 &&
        ((b.ResponseCode = parseInt(j[1])), (b.ResponseMessage = j[2])),
      b.ResponseCode === x.OK)
    ) {
      for (c = 1; c < i.length; c++)
        if (((f = i[c].split(":")), "Public" === f[0]))
          b.MethodsSupported = f[1].split(",");
        else if ("CSeq" === f[0]) b.CSeq = parseInt(f[1]);
        else if ("Content-Type" === f[0])
          (b.ContentType = f[1]),
            -1 !== b.ContentType.search("application/sdp") &&
              (b.SDPData = n(a));
        else if ("Content-Length" === f[0]) b.ContentLength = parseInt(f[1]);
        else if ("Content-Base" === f[0]) {
          var k = i[c].search("Content-Base:");
          -1 !== k && (b.ContentBase = i[c].substr(k + 13));
        } else if ("Session" === f[0]) {
          var l = f[1].split(";");
          b.SessionID = parseInt(l[0]);
        } else if ("Transport" === f[0]) {
          var m = f[1].split(";");
          for (d = 0; d < m.length; d++) {
            var o = m[d].search("interleaved=");
            if (-1 !== o) {
              var p = m[d].substr(o + 12),
                q = p.split("-");
              q.length > 1 &&
                ((b.RtpInterlevedID = parseInt(q[0])),
                (b.RtcpInterlevedID = parseInt(q[1])));
            }
          }
        } else if ("RTP-Info" === f[0]) {
          f[1] = i[c].substr(9);
          var r = f[1].split(",");
          for (b.RTPInfoList = [], d = 0; d < r.length; d++) {
            var s = r[d].split(";"),
              t = {},
              u = 0;
            for (u = 0; u < s.length; u++) {
              var v = s[u].search("url=");
              -1 !== v && (t.URL = s[u].substr(v + 4)),
                (v = s[u].search("seq=")),
                -1 !== v && (t.Seq = parseInt(s[u].substr(v + 4)));
            }
            b.RTPInfoList.push(t);
          }
        }
    } else if (b.ResponseCode === x.UNAUTHORIZED)
      for (c = 1; c < i.length; c++)
        if (((f = i[c].split(":")), "CSeq" === f[0])) b.CSeq = parseInt(f[1]);
        else if ("WWW-Authenticate" === f[0]) {
          var w = f[1].split(",");
          for (d = 0; d < w.length; d++) {
            var y = w[d].search("Digest realm=");
            if (-1 !== y) {
              e = w[d].substr(y + 13);
              var z = e.split('"');
              b.Realm = z[1];
            }
            if (((y = w[d].search("nonce=")), -1 !== y)) {
              e = w[d].substr(y + 6);
              var A = e.split('"');
              b.Nonce = A[1];
            }
          }
        }
    return b;
  }
  function n(a) {
    var b = {},
      c = [];
    b.Sessions = c;
    var d = null;
    if (-1 !== a.search("Content-Type: application/sdp")) {
      var e = a.split("\r\n\r\n");
      d = e[1];
    } else d = a;
    var f = d.split("\r\n"),
      g = 0,
      h = !1;
    for (g = 0; g < f.length; g++) {
      var i = f[g].split("=");
      if (i.length > 0)
        switch (i[0]) {
          case "a":
            var j = i[1].split(":");
            if (j.length > 1)
              if ("control" === j[0]) {
                var k = f[g].search("control:");
                h === !0
                  ? -1 !== k &&
                    (b.Sessions[b.Sessions.length - 1].ControlURL = f[g].substr(
                      k + 8
                    ))
                  : -1 !== k && (b.BaseURL = f[g].substr(k + 8));
              } else if ("rtpmap" === j[0]) {
                var l = j[1].split(" ");
                b.Sessions[b.Sessions.length - 1].PayloadType = l[0];
                var m = l[1].split("/");
                (b.Sessions[b.Sessions.length - 1].CodecMime = m[0]),
                  m.length > 1 &&
                    (b.Sessions[b.Sessions.length - 1].ClockFreq = m[1]);
              } else if ("framesize" === j[0]) {
                var n = j[1].split(" ");
                if (n.length > 1) {
                  var o = n[1].split("-");
                  (b.Sessions[b.Sessions.length - 1].Width = o[0]),
                    (b.Sessions[b.Sessions.length - 1].Height = o[1]);
                }
              } else if ("framerate" === j[0])
                b.Sessions[b.Sessions.length - 1].Framerate = j[1];
              else if ("fmtp" === j[0]) {
                var p = f[g].split(" ");
                if (p.length < 2) continue;
                for (var q = 1; q < p.length; q++) {
                  var r = p[q].split(";"),
                    s = 0;
                  for (s = 0; s < r.length; s++) {
                    var t = r[s].search("mode=");
                    if (
                      (-1 !== t &&
                        (b.Sessions[b.Sessions.length - 1].mode = r[s].substr(
                          t + 5
                        )),
                      (t = r[s].search("config=")),
                      -1 !== t &&
                        ((b.Sessions[b.Sessions.length - 1].config = r[
                          s
                        ].substr(t + 7)),
                        (L.config = b.Sessions[b.Sessions.length - 1].config),
                        (L.clockFreq =
                          b.Sessions[b.Sessions.length - 1].ClockFreq),
                        (L.bitrate =
                          b.Sessions[b.Sessions.length - 1].Bitrate)),
                      (t = r[s].search("sprop-vps=")),
                      -1 !== t &&
                        (b.Sessions[b.Sessions.length - 1].VPS = r[s].substr(
                          t + 10
                        )),
                      (t = r[s].search("sprop-sps=")),
                      -1 !== t &&
                        (b.Sessions[b.Sessions.length - 1].SPS = r[s].substr(
                          t + 10
                        )),
                      (t = r[s].search("sprop-pps=")),
                      -1 !== t &&
                        (b.Sessions[b.Sessions.length - 1].PPS = r[s].substr(
                          t + 10
                        )),
                      (t = r[s].search("sprop-parameter-sets=")),
                      -1 !== t)
                    ) {
                      var u = r[s].substr(t + 21),
                        v = u.split(",");
                      v.length > 1 &&
                        ((b.Sessions[b.Sessions.length - 1].SPS = v[0]),
                        (b.Sessions[b.Sessions.length - 1].PPS = v[1]));
                    }
                  }
                }
              }
            break;
          case "m":
            var w = i[1].split(" "),
              x = {};
            (x.Type = w[0]),
              (x.Port = w[1]),
              (x.Payload = w[3]),
              b.Sessions.push(x),
              (h = !0);
            break;
          case "b":
            if (h === !0) {
              var y = i[1].split(":");
              b.Sessions[b.Sessions.length - 1].Bitrate = y[1];
            }
        }
    }
    return b;
  }
  var
    socket = null,
    p = 6,
    q = null,
    r = null,
    s = 0,
    t = 0,
    u = !1,
    v = !1,
    workerManager = new WorkerManager(),
    x = {
      OK: 200,
      UNAUTHORIZED: 401,
      NOTFOUND: 404,
      INVALID_RANGE: 457,
      NOTSERVICE: 503,
      DISCONNECT: 999,
    },
    y = 4e4,
    z = "",
    A = [],
    B = 1,
    C = null,
    D = {},
    E = "Options",
    F = null,
    G = null,
    H = "",
    I = !1,
    J = null,
    K = !1,
    L = {},
    M = rtspUrl,
    N = null,
    O = {},
    P = "",
    Q = !1;
  return (
    (c.prototype = {
      init: function (canvasElement, videoConfig, channelNumber, audioTalkEnabled) {
        workerManager.init(canvasElement, videoConfig, channelNumber, audioTalkEnabled);
      },
      setStoreEncrypt: function (a) {
        Q = a;
      },
      connect: function () {
        socket ||
          ((socket = new WebSocket(wsUrl)),
          (socket.binaryType = "arraybuffer"),
          socket.addEventListener("message", handleMessage, !1),
          (socket.onopen = function () {
            var a =
                "OPTIONS " +
                M +
                " RTSP/1.0\r\nCSeq: " +
                B +
                (Q ? "\r\nExtraError: support" : "") +
                "\r\n\r\n",
              b = toBytes(a);
            socket.send(b);
          }),
          (socket.onerror = function () {
            C({
              errorCode: 202,
              description: "Open WebSocket Error",
            });
          }));
      },
      disconnect: function () {
        sendCommand(buildRTSPCommand("TEARDOWN", null, null)),
          clearInterval(J),
          (J = null),
          null !== socket &&
            socket.readyState === WebSocket.OPEN &&
            (socket.close(), (socket = null), (G = null)),
          null !== socket && (socket.onerror = null),
          workerManager.terminate();
      },
      controlPlayer: function (a) {
        var b = "";
        switch (((P = a.command), a.command)) {
          case "PLAY":
            if (((E = "Play"), null != a.range)) {
              b = buildRTSPCommand("PLAY", null, null, a.range);
              break;
            }
            (b = buildRTSPCommand("PLAY", null, null)), P && workerManager.initStartTime();
            break;
          case "PAUSE":
            if ("PAUSE" === E) break;
            (E = "PAUSE"), (b = buildRTSPCommand("PAUSE", null, null));
            break;
          case "SCALE":
            (b = buildRTSPCommand("SCALE", null, null, a.data)), workerManager.playbackSpeed(a.data);
            break;
          case "TEARDOWN":
            b = buildRTSPCommand("TEARDOWN", null, null);
            break;
          case "audioPlay":
          case "volumn":
          case "audioSamplingRate":
            workerManager.controlAudio(a.command, a.data);
            break;
          default:
            console.log("Unknown command: " + a.command);
        }
        "" != b && sendCommand(b);
      },
      setLiveMode: function (a) {
        workerManager.setLiveMode(a);
      },
      setRTSPURL: function (a) {
        M = a;
      },
      setCallback(eventName, callback) {
        if ("GetFrameRate" === eventName) {
          N = callback;
        } else {
          workerManager.setCallback(eventName, callback);
        }

        if ("Error" == eventName) {
          C = callback;
        }
      },
      setUserInfo: function (a, b) {
        (O.username = a), (O.passWord = b);
      },
      capture: function (a) {
        workerManager.capture(a);
      },
    }),
    new c()
  );
};
