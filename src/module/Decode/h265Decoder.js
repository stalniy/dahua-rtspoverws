import { debug } from '../../debug.js';

export function H265Decoder(Module) {
    function a() {
        k = Module._OpenDecoder(1, 0, 0),
        a.prototype.setIsFirstFrame(!1);
    }
    var b, c, d, e, f, g, h, i, j, k = null, l = new Uint8Array, m = !1;
    return a.prototype = {
        init: function() {
            debug.log("H265 Decoder init")
        },
        setOutputSize: function(a) {
            i != 2 * a && (i = 2 * a,
            j = Module._malloc(i),
            l = new Uint8Array(Module.HEAPU8.buffer,j,i))
        },
        decode: function(j, m) {
            b = Date.now(),
            c = new Uint8Array(j),
            l.set(c),
            d = Module._FrameAlloc();
            const result = Module._DecodeFrame(k, l.byteOffset, j.byteLength, i, d);
            debug.log('decode result', result);
            e = Date.now() - b;
            g = Module._getYLength(d);
            f = Module._getHeight(d);

            if (!a.prototype.isFirstFrame())
                return Module._FrameFree(d),a.prototype.setIsFirstFrame(!0),
                {
                    firstFrame: !0
                };
            if (g > 0 && f > 0) {
                b = Date.now();
                var n = new Uint8Array(l);

                return h = {
                    data: n,
                    option: {
                        ylen: g,
                        height: f,
                        beforeDecoding: b
                    },
                    width: g,
                    height: f,
                    codecType: "h265",
                    decodingTime: e,
                    frameType: m
                },
                Module._FrameFree(d),
                h
            }
        },
        setIsFirstFrame: function(a) {
            m = a
        },
        isFirstFrame: function() {
            return m
        },
        free: function() {
            Module._free(j);
            j = null
        }
    },
    new a
}
