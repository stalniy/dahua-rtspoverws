import { BrowserDetect, debug } from "./module/public1.js";

function VideoMediaSource(a) {
  function b() {}
  function c() {
      h()
  }
  function d(a) {
      P = [],
      P.push({
          type: "error",
          "function": q
      }),
      P.push({
          type: "updateend",
          "function": n
      }),
      P.push({
          type: "update",
          "function": o
      });
      for (var b = 0; b < P.length; b++)
          a.addEventListener(P[b].type, P[b]["function"])
  }
  function e(a) {
      Q = [],
      Q.push({
          type: "durationchange",
          "function": v
      }),
      Q.push({
          type: "playing",
          "function": s
      }),
      Q.push({
          type: "error",
          "function": r
      }),
      Q.push({
          type: "pause",
          "function": t
      }),
      Q.push({
          type: "timeupdate",
          "function": u
      }),
      Q.push({
          type: "resize",
          "function": w
      }),
      Q.push({
          type: "seeked",
          "function": x
      }),
      Q.push({
          type: "waiting",
          "function": y
      }),
      Q.push({
          type: "canplaythrough",
          "function": A
      }),
      Q.push({
          type: "canplay",
          "function": z
      }),
      Q.push({
          type: "loadedmetadata",
          "function": B
      });
      for (var b = 0; b < Q.length; b++)
          a.addEventListener(Q[b].type, Q[b]["function"])
  }
  function f(a) {
      R = [],
      R.push({
          type: "sourceopen",
          "function": c
      }),
      R.push({
          type: "error",
          "function": p
      });
      for (var b = 0; b < R.length; b++)
          a.addEventListener(R[b].type, R[b]["function"])
  }
  function g() {
      var a = 0;
      if (null !== P)
          for (a = 0; a < P.length; a++)
              _.removeEventListener(P[a].type, P[a]["function"]);
      if (null !== R)
          for (a = 0; a < R.length; a++)
              $.removeEventListener(R[a].type, R[a]["function"]);
      if (null !== Q)
          for (a = 0; a < Q.length; a++)
              Z.removeEventListener(Q[a].type, Q[a]["function"])
  }
  function h() {
      if (null === $ || "ended" === $.readyState)
          return $ = new MediaSource,
          f($),
          Z.src = window.URL.createObjectURL($),
          void debug.log("videoMediaSource::appendInitSegment new MediaSource()");
      if (debug.log("videoMediaSource::appendInitSegment start"),
      0 === $.sourceBuffers.length) {
          $.duration = 0;
          var a = 'video/mp4;codecs="avc1.' + E + '"';
          if (!MediaSource.isTypeSupported(a))
              return debug.log("not support" + a),
              void (lb && lb({
                  errorCode: 101
              }));
          _ = $.addSourceBuffer(a),
          d(_)
      }
      var b = D();
      return null === b ? void $.endOfStream("network") : (_.appendBuffer(b),
      void debug.log("videoMediaSource::appendInitSegment end, codecInfo = " + E))
  }
  function i(a) {
      if (null !== _ && "closed" !== $.readyState && "ended" !== $.readyState)
          try {
              if (X.length > 0)
                  return debug.count("1.segmentWaitDecode.length: " + X.length),
                  X.push(a),
                  void debug.count("2.segmentWaitDecode.length: " + X.length);
              _.updating ? (debug.log("updating.........."),
              X.push(a)) : _.appendBuffer(a)
          } catch (b) {
              debug.log("videoMediaSource::appendNextMediaSegment error >> initVideo"),
              X.length = 0,
              V.initVideo(!1),
              lb && lb({
                  errorCode: 101
              })
          }
  }
  function j() {
      Z.paused && (G(),
      S || mb || Z.play())
  }
  function k() {
      Z.paused || T || (debug.log("pause"),
      Z.pause())
  }
  function l() {
      var a = 60
        , b = 10
        , c = 1 * _.buffered.start(_.buffered.length - 1)
        , d = 1 * _.buffered.end(_.buffered.length - 1);
      d - c > a && _.remove(c, d - b)
  }
  function m() {
      if (null !== $)
          try {
              if (_ && _.buffered.length > 0 && (l(),
              S || Z.duration > ob && (Z.currentTime = (Z.duration - ob).toFixed(3),
              ob += 10 > nb ? .5 : .1),
              Z && Z.duration - Z.currentTime > kb && lb && lb({
                  errorCode: 101
              }),
              W && !O)) {
                  var a = 1 * _.buffered.start(_.buffered.length - 1)
                    , b = 1 * _.buffered.end(_.buffered.length - 1)
                    , c = 0;
                  if (c = 0 === Z.currentTime ? b - a : b - Z.currentTime,
                  c >= Y + .1) {
                      if (debug.log("跳秒"),
                      _.updating)
                          return;
                      var d = b - Y;
                      Z.currentTime = d.toFixed(3)
                  }
              }
          } catch (e) {
              debug.log("sourceBuffer has been removed")
          }
  }
  function n() {}
  function o() {
      X.length > 0 && (debug.count("1. onSourceUpdate .segmentWaitDecode.length: " + X.length),
      _.updating || (debug.count("2. onSourceUpdate .appendBuffer: " + X.length + "  " + X[0].length),
      _.appendBuffer(X[0]),
      X.shift()))
  }
  function p() {
      debug.log("videoMediaSource::onSourceError")
  }
  function q() {
      debug.log("videoMediaSource::onSourceBufferErrormsg")
  }
  function r() {
      debug.log("videoMediaSource::onError"),
      k(),
      lb && lb({
          errorCode: 101
      })
  }
  function s() {
      S = !0,
      T = !1,
      debug.log("playing "),
      cb || (cb = !0,
      I("PlayStart"))
  }
  function t() {
      S = !1,
      T = !0,
      debug.log("暂停播放----------------------------------------------")
  }
  function u() {
      var a = 4
        , b = 4
        , c = parseInt($.duration, 10)
        , d = parseInt(Z.currentTime, 10)
        , e = L.timestamp - K * (c - d + (1 !== K ? 1 : 0))
        , f = {
          timestamp: e,
          timestamp_usec: 0,
          timezone: L.timezone
      };
      0 === d || isNaN(c) || (O && V.waitingCallback(!1),
      !O && Math.abs(c - d) > b && 1 === K || Z.paused || (null === N ? (N = f,
      H(0, "currentTime")) : (N.timestamp <= f.timestamp && K >= 1 || N.timestamp > f.timestamp && 1 > K) && (O && V.timeStamp(f),
      N = f,
      U++,
      U > a && H(f.timestamp, "currentTime"))))
  }
  function v() {
      j(),
      m()
  }
  function w() {
      G()
  }
  function x() {
      j()
  }
  function y() {
      if (debug.log("需要缓冲下一帧"),
      W = !1,
      O && S && V.waitingCallback(!0),
      0 == bb)
          ab = Date.now(),
          bb++;
      else {
          bb++;
          var a = Date.now() - ab;
          debug.log("diffTime: " + a + "  Count: " + bb),
          bb >= 5 && 6e4 > a && 1.8 >= Y && (Y += .1,
          bb = 0,
          ab = 0,
          debug.log("delay + 0.1 = " + Y))
      }
  }
  function z() {
      debug.log("Can play !")
  }
  function A() {
      debug.log("Can play without waiting"),
      W = !0
  }
  function B() {
      debug.log("loadedmetadata")
  }
  function C(a, b) {
      for (var c = atob(a.substring("data:image/png;base64,".length)), d = new Uint8Array(c.length), e = 0, f = c.length; f > e; ++e)
          d[e] = c.charCodeAt(e);
      var g = new Blob([d.buffer],{
          type: "image/png"
      });
      pb(g, b + ".png")
  }
  var D = null
    , E = ""
    , F = null
    , G = null
    , H = null
    , I = null
    , J = null
    , K = 1
    , L = {
      timestamp: 0,
      timestamp_usec: 0,
      timezone: 0
  }
    , M = {
      timestamp: 0,
      timestamp_usec: 0,
      timezone: 0
  }
    , N = null
    , O = !1
    , P = null
    , Q = null
    , R = null
    , S = !1
    , T = !0
    , U = 0
    , V = a
    , W = !1
    , X = []
    , Y = .5
    , Z = null
    , $ = null
    , _ = null
    , ab = 0
    , bb = 0
    , cb = !1
    , db = null
    , eb = BrowserDetect()
    , fb = null
    , gb = 0
    , hb = 0
    , ib = 10
    , jb = 0
    , kb = 8
    , lb = null
    , mb = !1
    , nb = 25
    , ob = .5;
  b.prototype = {
      init: function(a) {
          J = BrowserDetect(),
          debug.log("videoMediaSource::init browserType = " + J),
          Z = a,
          Z.autoplay = "safari" === J ? !1 : !0,
          Z.controls = !1,
          Z.preload = "auto",
          e(Z),
          h()
      },
      setInitSegmentFunc: function(a) {
          D = a
      },
      getVideoElement: function() {
          return Z
      },
      setCodecInfo: function(a) {
          E = a
      },
      setMediaSegment: function(a) {
          i(a)
      },
      capture: function(a) {
          db && clearInterval(db);
          var b = document.createElement("canvas");
          b.width = Z.videoWidth,
          b.height = Z.videoHeight,
          W || "edge" === eb ? (b.getContext("2d").drawImage(Z, 0, 0, b.width, b.height),
          C(b.toDataURL(), a)) : db = setInterval(function() {
              W && (b.getContext("2d").drawImage(Z, 0, 0, b.width, b.height),
              C(b.toDataURL(), a),
              clearInterval(db))
          }, 200)
      },
      setInitSegment: function() {
          h()
      },
      setTimeStamp: function(a) {
          F = a
      },
      setVideoSizeCallback: function(a) {
          G = a
      },
      setAudioStartCallback: function(a) {
          H = a
      },
      getPlaybackTimeStamp: function() {
          return F
      },
      setSpeedPlay: function(a) {
          K = a
      },
      setvideoTimeStamp: function(a) {
          var b = 3
            , c = Math.abs(L.timestamp - a.timestamp) > b;
          0 === M.timestamp && V.timeStamp(a),
          c === !0 && (U = 0,
          M = a,
          H(M.timestamp, "init"),
          0 !== L.timestamp && O && (Z.currentTime = $.duration - .1,
          V.waitingCallback(!1)),
          N = null),
          L = a
      },
      pause: function() {
          mb = !0,
          k()
      },
      play: function() {
          mb = !1
      },
      setPlaybackFlag: function(a) {
          O = a
      },
      setTimeStampInit: function() {
          N = null,
          M = {
              timestamp: 0,
              timestamp_usec: 0,
              timezone: 0
          }
      },
      close: function() {
          g(),
          k()
      },
      setBeginDrawCallback: function(a) {
          I = a
      },
      setErrorCallback: function(a) {
          lb = a
      },
      terminate: function() {
          null !== Z && (g(),
          "open" === $.readyState && (_ && $.removeSourceBuffer(_),
          $.endOfStream()),
          _ = null,
          _ = null,
          $ = null,
          Z = null,
          db && (clearInterval(db),
          db = null),
          fb && (clearInterval(fb),
          fb = null),
          jb = 0,
          hb = 0,
          gb = 0)
      },
      getDuration: function() {
          return Z.duration - Z.currentTime
      },
      setFPS: function(a) {
          a && (nb = a)
      },
      setRtspOver: function() {
          parseInt(Z.duration) === parseInt(Z.currentTime) ? (V.timeStamp(L),
          V.fileOverCallback()) : (gb = parseInt(Z.currentTime),
          hb = parseInt(Z.duration),
          fb = setInterval(function() {
              gb === parseInt(Z.currentTime) && hb === parseInt(Z.duration) ? jb++ > ib && (fb && clearInterval(fb),
              fb = null,
              V.timeStamp(L),
              V.fileOverCallback()) : parseInt(Z.currentTime) >= parseInt(Z.duration) ? (fb && clearInterval(fb),
              fb = null,
              V.timeStamp(L),
              V.fileOverCallback()) : (gb = parseInt(Z.currentTime),
              hb = parseInt(Z.duration),
              jb = 0)
          }, 150))
      }
  };
  var pb = function(a) {
      var b = a.document
        , c = function() {
          return a.URL || a.webkitURL || a
      }
        , d = b.createElementNS("http://www.w3.org/1999/xhtml", "a")
        , e = "download"in d
        , f = function(a) {
          var b = new MouseEvent("click");
          a.dispatchEvent(b)
      }
        , g = /constructor/i.test(a.HTMLElement)
        , h = /CriOS\/[\d]+/.test(navigator.userAgent)
        , i = function(b) {
          (a.setImmediate || a.setTimeout)(function() {
              throw b
          }, 0)
      }
        , j = "application/octet-stream"
        , k = 4e4
        , l = function(a) {
          var b = function() {
              "string" == typeof a ? c().revokeObjectURL(a) : a.remove()
          };
          setTimeout(b, k)
      }
        , m = function(a, b, c) {
          b = [].concat(b);
          for (var d = b.length; d--; ) {
              var e = a["on" + b[d]];
              if ("function" == typeof e)
                  try {
                      e.call(a, c || a)
                  } catch (f) {
                      i(f)
                  }
          }
      }
        , n = function(a) {
          return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type) ? new Blob([String.fromCharCode(65279), a],{
              type: a.type
          }) : a
      }
        , o = function(b, i, k) {
          k || (b = n(b));
          var o, p = this, q = b.type, r = q === j, s = function() {
              m(p, "writestart progress write writeend".split(" "))
          }, t = function() {
              if ((h || r && g) && a.FileReader) {
                  var d = new FileReader;
                  return d.onloadend = function() {
                      var b = h ? d.result : d.result.replace(/^data:[^;]*;/, "data:attachment/file;")
                        , c = a.open(b, "_blank");
                      c || (a.location.href = b),
                      b = void 0,
                      p.readyState = p.DONE,
                      s()
                  }
                  ,
                  d.readAsDataURL(b),
                  void (p.readyState = p.INIT)
              }
              if (o || (o = c().createObjectURL(b)),
              r)
                  a.location.href = o;
              else {
                  var e = a.open(o, "_blank");
                  e || (a.location.href = o)
              }
              p.readyState = p.DONE,
              s(),
              l(o)
          };
          return p.readyState = p.INIT,
          e ? (o = c().createObjectURL(b),
          void setTimeout(function() {
              d.href = o,
              d.download = i,
              f(d),
              s(),
              l(o),
              p.readyState = p.DONE
          })) : void t()
      }
        , p = o.prototype
        , q = function(a, b, c) {
          return new o(a,b || a.name || "download",c)
      };
      return "undefined" != typeof navigator && navigator.msSaveOrOpenBlob ? function(a, b, c) {
          return b = b || a.name || "download",
          c || (a = n(a)),
          navigator.msSaveOrOpenBlob(a, b)
      }
      : (p.readyState = p.INIT = 0,
      p.WRITING = 1,
      p.DONE = 2,
      p.error = p.onwritestart = p.onprogress = p.onwrite = p.onabort = p.onerror = p.onwriteend = null,
      q)
  }(window);
  return new b
}

export { VideoMediaSource };
