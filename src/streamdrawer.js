import {
  WebGLCanvas,
  ImageWebGLCanvas,
  YUVWebGLCanvas,
} from "./module/WebGLCanvas";
import { debug } from "./debug.js";
import { base64ArrayBuffer } from "./module/public1.js";

"use strict";
function BufferNode(a) {
    this.buffer = a,
    this.previous = null,
    this.next = null
}
function StreamDrawer(a, b, c, d) {
    function e() {
        function a() {
            this.first = null,
            this.size = 0
        }
        var b = l || 15;
        return a.prototype = {
            enqueue: function(a, c, d, e, f, g, h) {
                this.size >= b ? this.clear() : 0;
                var i = new Q(a,c,d,e,f,g,h);
                if (null === this.first)
                    this.first = i;
                else {
                    for (var j = this.first; null !== j.next; )
                        j = j.next;
                    j.next = i
                }
                return this.size += 1,
                i
            },
            dequeue: function() {
                var a = null;
                return null !== this.first && (a = this.first,
                this.first = this.first.next,
                this.size -= 1),
                a
            },
            clear: function() {
                debug.log("BufferQueue clear!");
                for (var a = null; null !== this.first; )
                    a = this.first,
                    this.first = this.first.next,
                    this.size -= 1,
                    a.buffer = null,
                    a = null;
                this.size = 0,
                this.first = null
            }
        },
        new a
    }
    function f() {
        s = "rgb2d",
        u = null,
        R = new e,
        t = J,
        I = !1
    }
    function g(a, b) {
        a > 0 && b > 0 && (o.width = a,
        o.height = b)
    }
    function h(a, b) {
        for (var c = atob(a.substring("data:image/png;base64,".length)), d = new Uint8Array(c.length), e = 0, f = c.length; f > e; ++e)
            d[e] = c.charCodeAt(e);
        var g = new Blob([d.buffer],{
            type: "image/png"
        });
        T(g, b + ".png")
    }
    function i(a) {
        return ("undefined" == typeof q || "undefined" == typeof r || q !== a.width || r !== a.height) && (s = "ImageWebGL",
        S(a.width, a.height),
        q = a.width,
        r = a.height),
        z = a.time,
        null !== z && k.timeStamp(z),
        "undefined" != typeof p ? (p.drawCanvas(a),
        H && (H = !1,
        h(o.toDataURL(), G)),
        E.free(a),
        !0) : (debug.log("drawer is undefined in StreamDrawer!"),
        !1)
    }
    function j() {
        window.requestAnimationFrame(V)
    }
    var k = b
      , l = d
      , m = !0
      , n = a
      , o = c
      , p = null
      , q = null
      , r = null
      , s = null
      , t = null
      , u = null
      , v = null
      , w = null
      , x = null
      , y = 0
      , z = null
      , A = 0
      , B = 0
      , C = 0
      , D = 0
      , E = new ImagePool
      , F = null
      , G = ""
      , H = !1
      , I = !1
      , J = 16.7
      , K = 20
      , L = 1e3
      , M = null
      , N = 0
      , O = !1
      , P = 3
      , Q = function() {
        function a(a, b, c, d, e, f, g) {
            BufferNode.call(this, a),
            this.width = b,
            this.height = c,
            this.codecType = d,
            this.frameType = e,
            this.timeStamp = f,
            this.option = {};
            for (var h in g)
                this.option[h] = g[h]
        }
        return a
    }()
      , R = null
      , S = function(a, b) {
        var c = new Size(a,b);
        switch (s) {
        case "RGB2d":
            p = new RGB2dCanvas(o,c);
            break;
        case "YUVWebGL":
            p = new YUVWebGLCanvas(o,c);
            break;
        case "ImageWebGL":
            p = new ImageWebGLCanvas(o,c);
            break;
        case "WebGL":
            p = new WebGLCanvas(o,c)
        }
    }
      , T = function(a) {
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
    }(window)
      , U = function() {
        if (0 == R.size && O === !0)
            return k.fileOverCallback(),
            void f.prototype.stopRendering();

        F = R.dequeue();
        const isVideoFrame = window.VideoFrame && F && F.buffer instanceof VideoFrame;
        if (null !== F && null !== F.buffer && ("mjpeg" === F.codecType || isVideoFrame || F.buffer.length > 0)) {
            ("undefined" == typeof q || "undefined" == typeof r || q !== F.width || r !== F.height || u !== F.codecType) && (s = ("h264" === F.codecType || "h265" === F.codecType) && !isVideoFrame ? "YUVWebGL" : "ImageWebGL",
            S(F.width, F.height),
            ("undefined" == q || null == q || 0 == q) && w("PlayStart"),
            "mjpeg" !== F.codecType && g(F.option.realWidth, F.option.realHeight),
            q = F.width,
            r = F.height,
            u = F.codecType),
            z = F.timeStamp,
            k.timeStamp(z);

            if ("undefined" != typeof p) {
                p.drawCanvas(F.buffer, F.option),
                o.updatedCanvas = !0,
                x(z),
                Math.abs(z.timestamp - A) > P && k.waitingCallback(!1),
                A = z.timestamp,
                H && (H = !1,
                h(o.toDataURL(), G));
                if ("mjpeg" === F.codecType) {
                    E.free(F.buffer);
                } else if (isVideoFrame) {
                    F.buffer.close();
                } else {
                    delete F.buffer;
                    F.buffer = null;
                }
                F.previous = null,
                F.next = null,
                F = null;
                return !0;
            }
            debug.log("drawer is undefined in StreamDrawer!")
        }
        return !1
    }
      , V = function(a) {
        var b = 200;
        if (I === !0) {
            if (0 === y || b > a - y)
                return 0 === y && (y = a),
                void (null !== R && window.requestAnimationFrame(V));
            D += a - B,
            D > C && (U() ? C += t : 0),
            D > L && (C = 0,
            D = 0),
            B = a,
            window.requestAnimationFrame(V)
        }
    };
    return f.prototype = {
        getDrawingStrategy: function() {
            return s
        },
        reassignCanvas: function() {
            var a = $('canvas[kind-channel-id="' + n + '"]')[0];
            o !== a && (q = 0,
            r = 0)
        },
        drawMJPEG: function(a, b, c, d, e, f) {
            var g = E.alloc();
            g.width = b,
            g.height = c,
            g.codecType = d,
            g.frameType = e,
            g.time = f,
            g.onload = function() {
                m === !1 ? i(this) : null !== R && R.enqueue(this, this.width, this.height, this.codecType, this.frameType, this.time, this.option)
            }
            ,
            g.setAttribute("src", "data:image/jpeg;base64," + base64ArrayBuffer(a))
        },
        draw(frameBuffer, width, height, codecType, frameType, timestamp, options) {
            // If not using buffered rendering, draw immediately
            if (m === false) {
                // Check if canvas dimensions or codec type changed, reinitialize if needed
                if ((typeof q === "undefined" || typeof r === "undefined" ||
                     q !== width || r !== height || u !== codecType)) {

                    // Set drawing strategy based on codec type
                    s = (codecType === "h264" || codecType === "h265") ? "YUVWebGL" : "ImageWebGL";
                    S(width, height);
                    q = width;
                    r = height;
                    u = codecType;
                }

                // Update current frame timestamp
                z = timestamp;
                if (z !== null) {
                    k.timeStamp(z);
                }

                // Draw the frame if drawer is available
                if (typeof p !== "undefined") {
                    p.drawCanvas(frameBuffer);
                    o.updatedCanvas = true;

                    // Handle screenshot capture if requested
                    if (H && (H = false, h(o.toDataURL(), G)));

                    return true;
                } else {
                    debug.log("drawer is undefined in StreamDrawer!");
                    return false;
                }
            } else {
                // Use buffered rendering - enqueue the frame for later processing
                if (R !== null) {
                    R.enqueue(frameBuffer, width, height, codecType, frameType, timestamp, options);
                }
                return;
            }
        },
        capture: function(a) {
            G = a,
            H = !0
        },
        digitalZoom: function(a) {
            "undefined" != typeof p && null !== p && p.updateVertexArray(a)
        },
        setResizeCallback: function(a) {
            v = a
        },
        getCodecType: function() {
            return u
        },
        getFrameTimestamp: function() {
            return z
        },
        initStartTime: function() {
            0 === y && m !== !1 && j()
        },
        startRendering: function() {
            0 === y && m !== !1 && (I = !0,
            window.requestAnimationFrame(V))
        },
        pause: function() {
            I = !1
        },
        play: function() {
            I = !0
        },
        stopRendering: function() {
            I = !1,
            y = 0
        },
        setFPS: function(a) {
            "undefined" == typeof a ? (t = J,
            M = K) : 0 === a ? (t = J,
            M = K) : (t = L / a,
            M = 1 * a),
            N = t
        },
        setFrameInterval: function(a) {
            t = a * N
        },
        getCanvas: function() {
            return o
        },
        renewCanvas: function() {
            S(q, r),
            "undefined" != typeof p && null !== p && p.initCanvas()
        },
        setBeginDrawCallback: function(a) {
            w = a
        },
        setupdateCanvasCallback: function(a) {
            x = a
        },
        terminate: function() {
            y = 0,
            z = null,
            null !== R && (R.clear(),
            R = null),
            p && p.clearCanvas(),
            p = null,
            O = !1
        },
        setRtspOver: function() {
            O = !0
        }
    },
    new f
}
function Size(a, b) {
    function c(a, b) {
        c.prototype.w = a,
        c.prototype.h = b
    }
    return c.prototype = {
        toString: function() {
            return "(" + c.prototype.w + ", " + c.prototype.h + ")"
        },
        getHalfSize: function() {
            return new Size(c.prototype.w >>> 1,c.prototype.h >>> 1)
        },
        length: function() {
            return c.prototype.w * c.prototype.h
        }
    },
    new c(a,b)
}
var ImagePool = function() {
    this.metrics = {},
    this._clearMetrics(),
    this._objpool = []
};
ImagePool.prototype.alloc = function() {
    var a = null;
    return 0 === this._objpool.length ? (a = new Image,
    this.metrics.totalalloc++) : (a = this._objpool.pop(),
    this.metrics.totalfree--),
    a
}
,
ImagePool.prototype.free = function(a) {
    a.length > 0 && (debug.log("It is not zero length = " + a.length),
    this._objpool.push(a),
    this.metrics.totalfree++)
}
,
ImagePool.prototype.collect = function() {
    this._objpool = [];
    var a = this.metrics.totalalloc - this.metrics.totalfree;
    this._clearMetrics(a)
}
,
ImagePool.prototype._clearMetrics = function(a) {
    this.metrics.totalalloc = a || 0,
    this.metrics.totalfree = 0
}
;

export { StreamDrawer, Size, ImagePool };
