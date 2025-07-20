import { debug } from '../../debug.js';

export function H264Decoder(Module) {
  function a() {
      k = Module._OpenDecoder(0, 0, 0),
      a.prototype.setIsFirstFrame(!1)
  }
  var b, c, d, e, f, g, h, i, j, k = null, l = new Uint8Array, m = !1;
  return a.prototype = {
      init: function() {
          debug.log("H264 Decoder init")
      },
      setOutputSize: function(a) {
          i != 2 * a && (i = 2 * a,
          j = Module._malloc(i),
          l = new Uint8Array(Module.HEAPU8.buffer,j,i))
      },
      decode: function(j, m) {
          if (b = Date.now(),
          c = new Uint8Array(j),
          l.set(c),
          d = Module._FrameAlloc(),
          Module._DecodeFrame(k, l.byteOffset, j.byteLength, i, d),
          e = Date.now() - b,
          g = Module._getYLength(d),
          f = Module._getHeight(d),
          !a.prototype.isFirstFrame())
              return a.prototype.setIsFirstFrame(!0),
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
                  codecType: "h264",
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
          Module._free(j),
          j = null
      }
  },
  new a
}
