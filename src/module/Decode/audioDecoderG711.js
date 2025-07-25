import { debug } from '../../debug.js';
export function G711AudioDecoder(a) {
  function b(a) {
      var b = 0,
          c = ~a;
      return b = ((c & g) << 3) + e, b <<= (c & i) >> h, c & f ? e - b : b - e
  }

  function c(a) {
      var b = 0,
          c = 0;
      switch (a ^= 85, b = (a & g) << 4, c = (a & i) >> h) {
          case 0:
              b += 8;
              break;
          case 1:
              b += 264;
              break;
          default:
              b += 264, b <<= c - 1
      }
      return a & f ? b : -b
  }

  function d() {}
  var e = 132,
      f = 128,
      g = 15,
      h = 4,
      i = 112;
  return d.prototype = {
      decode: function(d) {
          var e = new Uint8Array(d),
              f = new Int16Array(e.length),
              g = 0;
          if ("G.711A" == a)
              for (g = 0; g < e.length; g++) f[g] = c(e[g]);
          else if ("G.711Mu" == a)
              for (g = 0; g < e.length; g++) f[g] = b(e[g]);
          var h = new Float32Array(f.length);
          for (g = 0; g < f.length; g++) h[g] = f[g] / Math.pow(2, 15);
          return h
      }
  }, new d
}
