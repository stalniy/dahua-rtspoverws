import { debug } from '../debug';

export var AACSession = function() {
  function a(a, b) {
      var c = 1,
          e = null,
          f = null;
      if ("string" != typeof d) return void debug.log("wrong type of config in SDP");
      e = parseInt(d.substring(0, 2), 16), f = parseInt(d.substring(2, 4), 16);
      var g = e >> 3,
          h = (7 & e) << 1 | (128 & f) >> 7;
      i[0] = 255, i[1] = 249, i[2] = g - 1 << 6, i[2] |= h << 2, i[2] |= c >> 2, i[3] = c << 6, i[3] |= (a + 7 & 6144) >> 11, i[4] = (a + 7 & 2040) >> 3, i[5] = (a + 7 & 7) << 5, i[5] |= 1, i[6] = 84;
      var j = new Uint8Array(i.length + b.length);
      return j.set(i, 0), j.set(b, i.length), j
  }

  function b() {
      this.firstTime = 0, this.lastMSW = 0
  }
  var c = 7,
      d = null,
      e = null,
      f = null,
      g = null,
      h = 0,
      i = new Uint8Array(c),
      j = {
          seconds: null,
          useconds: null
      };
  return b.prototype = {
      parseRTPData: function(b, c, d) {
          var e = c[22];
          g = (c[21] << 8) + c[20];
          var f = c.length - 8 - (24 + e),
              i = c.subarray(24 + e, c.length - 8),
              k = i.subarray(0, 2),
              l = {},
              m = (c[19] << 24) + (c[18] << 16) + (c[17] << 8) + c[16] >>> 0,
              n = Date.UTC("20" + (m >> 26), (m >> 22 & 15) - 1, m >> 17 & 31, m >> 12 & 31, m >> 6 & 63, 63 & m) / 1e3;
          if (n -= 28800, 0 == this.firstTime) this.firstTime = n, this.lastMSW = 0, h = (c[21] << 8) + c[20], j.seconds = n, j.useconds = 0;
          else {
              var o, p = (c[21] << 8) + c[20];
              o = p > h ? p - h : p + 65535 - h, this.lastMSW += o, n > this.firstTime && (this.lastMSW -= 1e3), this.firstTime = n, j.seconds = n, j.useconds = this.lastMSW, h = p
          }
          if (255 === k[0] && 240 === (240 & k[1])) l = {
              codec: "AAC",
              bufferData: i,
              rtpTimeStamp: 1e3 * j.seconds + j.useconds
          }, d === !0 && (l.streamData = i.subarray(7, i.length));
          else {
              var q = a(f, i);
              l = {
                  codec: "AAC",
                  bufferData: q,
                  rtpTimeStamp: 1e3 * j.seconds + j.useconds
              }, d === !0 && (l.streamData = i)
          }
          return l
      },
      setCodecInfo: function(a) {
          debug.log("Set codec info. for AAC"), d = a.config, f = a.bitrate, e = a.clockFreq
      },
      getCodecInfo: function() {
          return {
              bitrate: f,
              clockFreq: e
          }
      }
  }, new b
};
