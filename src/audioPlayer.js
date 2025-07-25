"use strict";
import { debug } from './debug';

export function AudioPlayerAAC() {
    function a(a, b) {
        var c = new Uint8Array(a.byteLength + b.byteLength);
        return c.set(new Uint8Array(a), 0),
        c.set(new Uint8Array(b), a.byteLength),
        c
    }
    function b() {
        n = "audio/aac",
        p = document.createElement("audio"),
        document.body.appendChild(p),
        p.addEventListener("error", d)
    }
    function c() {
        var a = !1;
        return window.MediaSource ? window.MediaSource.isTypeSupported(n) ? (o = new MediaSource,
        o.addEventListener("sourceopen", e),
        o.addEventListener("sourceclose", g),
        o.addEventListener("sourceended", h),
        o.addEventListener("error", i),
        o.addEventListener("abort", j),
        a = !0) : debug.error("Unsupported MIME type or codec: ", n) : debug.error("MediaSource API is not supported!"),
        a
    }
    function d(a) {
        switch (debug.error(a),
        a.target.error.code) {
        case a.target.error.MEDIA_ERR_ABORTED:
            debug.error("audio tag error : You aborted the media playback.");
            break;
        case a.target.error.MEDIA_ERR_NETWORK:
            debug.error("audio tag error : A network error caused the media download to fail.");
            break;
        case a.target.error.MEDIA_ERR_DECODE:
            debug.error("audio tag error : The media playback was aborted due to a corruption problem or because the media used features your browser did not support.");
            break;
        case a.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
            debug.error("audio tag error : The media could not be loaded, either because the server or network failed or because the format is not supported.");
            break;
        default:
            debug.error("audio tag error : An unknown media error occurred.")
        }
    }
    function e() {
        if (debug.info("sourceopened"),
        null === q)
            try {
                q = o.addSourceBuffer(n),
                q.addEventListener("updateend", f)
            } catch (a) {
                return void debug.error("Exception calling addSourceBuffer : " + a)
            }
    }
    function f() {
        p.paused && p.play()
    }
    function g() {
        debug.info("sourceclose")
    }
    function h() {
        debug.info("sourceended")
    }
    function i() {
        debug.info("error")
    }
    function j() {
        debug.info("abort")
    }
    function k() {
        o.removeEventListener("sourceopen", e),
        o.removeEventListener("sourceclose", g),
        o.removeEventListener("sourceended", h),
        o.removeEventListener("error", i),
        o.removeEventListener("abort", j),
        q.removeEventListener("updateend", f),
        p.removeEventListener("error", d)
    }
    function l() {}
    var m = 200
      , n = null
      , o = null
      , p = null
      , q = null
      , r = 0
      , s = new Uint8Array
      , t = 0
      , u = 0
      , v = null
      , w = !1
      , x = null
      , y = 0;
    return l.prototype = {
        audioInit: function(a) {
            b();
            var d = c();
            return d && null !== p && (p.src = window.URL.createObjectURL(o),
            this.controlVolumn(a),
            p.play()),
            d
        },
        play: function() {
            this.controlVolumn(r)
        },
        stop: function() {
            p.volume = 0,
            r = 0
        },
        bufferAudio: function(b, c) {
            var d = c - t;
            if ((d > m || 0 > d) && (s = new Uint8Array,
            x = new Array,
            w = !0),
            w && (x.push(y),
            y += b.length),
            t = c,
            s = a(s, b),
            null !== q && !w && !q.updating)
                try {
                    null !== x ? null !== v && (parseInt(x.length / 16) - parseInt(v) >= 2 && (v += 1),
                    y = parseInt(16 * v, 10),
                    y < x.length ? (q.appendBuffer(s.subarray(x[y], s.length)),
                    q.buffered.length > 0 && (p.currentTime = q.buffered.end(0))) : q.buffered.length > 0 && (p.currentTime = q.buffered.end(0) - .3)) : q.appendBuffer(s),
                    s = new Uint8Array,
                    x = null,
                    y = 0
                } catch (e) {}
        },
        controlVolumn: function(a) {
            if (h.state === "suspended") {
                h.resume();
            }
            r = a,
            null !== p && (p.volume = 0 >= a ? 0 : a >= 1 ? 1 : a,
            r = a)
        },
        getVolume: function() {
            return r
        },
        terminate: function() {
            o && (k(),
            "open" === o.readyState && (o.removeSourceBuffer(q),
            o.endOfStream())),
            p && p.parentElement.removeChild(p),
            q = null,
            o = null,
            p = null
        },
        setBufferingFlag: function(a, b) {
            "init" === b ? u = a : w && (0 === a || "undefined" == typeof a || null === a ? v = null : (v = a - u,
            u = 0),
            w = !1)
        },
        getBufferingFlag: function() {
            return w
        },
        setInitVideoTimeStamp: function(a) {
            u = a
        },
        getInitVideoTimeStamp: function() {
            return u
        },
        setSamplingRate: function() {}
    },
    new l
}
export function AudioPlayerGxx() {
    function a(a, c) {
        var d = c - o;
        if ((d > e || 0 > d) && (m = 0,
        t = 0,
        r = !0,
        null !== u && u.stop()),
        m - h.currentTime < 0 && (m = 0),
        o = c,
        s = b(s, a, t),
        t += a.length,
        !r) {
            var g = 0;
            if (t / a.length > 1 && (null !== q && (g = q * f),
            g >= t || null === q))
                return void (t = 0);
            var i = null;
            i = h.createBuffer(1, t - g, l.samplingRate),
            i.getChannelData(0).set(s.subarray(g, t)),
            t = 0,
            u = h.createBufferSource(),
            u.buffer = i,
            u.connect(j),
            m || (m = h.currentTime + .1),
            u.start(m),
            m += i.duration
        }
    }
    function b(a, b, c) {
        var d = 8e4
          , e = a;
        return c + b.length >= e.length && (e = new Float32Array(e.length + d),
        e.set(e, 0)),
        e.set(b, c),
        e
    }
    function c() {}
    var d = 8e4
      , e = 200
      , f = 8e3
      , g = 1
      , h = null
      , i = null
      , j = null
      , k = 0
      , l = {
        type: "G.711",
        samplingRate: f,
        bitrate: "8000"
    }
      , m = 0
      , n = !1
      , o = 0
      , p = 0
      , q = null
      , r = !1
      , s = new Float32Array(d)
      , t = 0
      , u = null;
    return c.prototype = {
        audioInit: function(a) {
            if (m = 0,
            null !== h)
                debug.info("Audio context already defined!");
            else
                try {
                    return window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext,
                    h = new AudioContext,
                    h.onstatechange = function() {
                        debug.info("Audio Context State changed :: " + h.state),
                        "running" === h.state && (n = !0)
                    }
                    ,
                    i = h.createGain(),
                    j = h.createBiquadFilter(),
                    j.connect(i),
                    j.type = "lowpass",
                    j.frequency.value = 4e3,
                    j.gain.value = 40,
                    i.connect(h.destination),
                    this.controlVolumn(a),
                    !0
                } catch (b) {
                    return debug.error("Web Audio API is not supported in this web browser! : " + b),
                    !1
                }
        },
        play: function() {
            this.controlVolumn(k)
        },
        stop: function() {
            k = 0,
            i.gain.value = 0,
            m = 0
        },
        bufferAudio: function(b, c) {
            n && a(b, c)
        },
        controlVolumn: function(a) {
            k = a;
            var b = a / g;
            0 >= b ? (i.gain.value = 0,
            m = 0) : i.gain.value = b >= 1 ? 1 : b
        },
        getVolume: function() {
            return k
        },
        terminate: function() {
            "closed" !== h.state && (m = 0,
            n = !1,
            h.close())
        },
        setBufferingFlag: function(a, b) {
            "init" === b ? p = a : r && (0 === a || "undefined" == typeof a || null === a ? q = null : (q = a - p,
            p = 0),
            r = !1)
        },
        getBufferingFlag: function() {
            return r
        },
        setInitVideoTimeStamp: function(a) {
            p = a
        },
        getInitVideoTimeStamp: function() {
            return p
        },
        setSamplingRate: function(a) {
            l.samplingRate = a
        }
    },
    new c
}
