import { G711AudioDecoder } from './Decode/audioDecoderG711'
import { debug } from '../debug';

export var G711Session = function(a) {
  function b() {
      d = new G711AudioDecoder(a), this.firstTime = 0, this.lastMSW = 0
  }
  var c = 0,
      d = null,
      e = null,
      f = 0,
      g = {
          seconds: null,
          useconds: null
      };
  return b.prototype = {
      parseRTPData: function(a, b, h) {
          var i = b[22],
              j = b.subarray(24 + i, b.length - 8);
          c = (b[21] << 8) + b[20];
          var k = (b[19] << 24) + (b[18] << 16) + (b[17] << 8) + b[16] >>> 0,
              l = Date.UTC("20" + (k >> 26), (k >> 22 & 15) - 1, k >> 17 & 31, k >> 12 & 31, k >> 6 & 63, 63 & k) / 1e3;
          if (l -= 28800, 0 == this.firstTime) this.firstTime = l, this.lastMSW = 0, f = (b[21] << 8) + b[20], g.seconds = l, g.useconds = 0;
          else {
              var m, n = (b[21] << 8) + b[20];
              m = n > f ? n - f : n + 65535 - f, this.lastMSW += m, l > this.firstTime && (this.lastMSW -= 1e3), this.firstTime = l, g.seconds = l, g.useconds = this.lastMSW, f = n
          }
          var o = d.decode(j),
              p = {
                  codec: "G711",
                  bufferData: o,
                  rtpTimeStamp: 1e3 * g.seconds + g.useconds,
                  samplingRate: e
              };
          return h === !0 && (p.streamData = j), p
      },
      setCodecInfo: function(a) {
          debug.log("Set codec info. for G711"), e = a.ClockFreq - 0
      }
  }, new b
};
