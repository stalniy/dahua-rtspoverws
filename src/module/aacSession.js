import { debug } from '../debug';
import { reconstructRtpTimestamp } from './public1.js';

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
      this.firstTime = 0, this.lastMSW = 0, this.lastPacketMsw = null
  }
  var c = 7,
      d = null,
      e = null,
      f = null,
      i = new Uint8Array(c);
  return b.prototype = {
      parseRTPData: function(b, c, d) {
          var e = c[22];
          var f = c.length - 8 - (24 + e),
              i = c.subarray(24 + e, c.length - 8),
              k = i.subarray(0, 2),
              l = {};
          var m = reconstructRtpTimestamp(c, {
              firstTime: this.firstTime,
              lastMSW: this.lastMSW,
              lastPacketMsw: this.lastPacketMsw
          });
          this.firstTime = m.firstTime,
          this.lastMSW = m.lastMSW,
          this.lastPacketMsw = m.lastPacketMsw;
          var n = 1e3 * m.timestamp.timestamp + m.timestamp.timestamp_usec;
          if (255 === k[0] && 240 === (240 & k[1])) l = {
              codec: "AAC",
              bufferData: i,
              rtpTimeStamp: n
          }, d === !0 && (l.streamData = i.subarray(7, i.length));
          else {
              var q = a(f, i);
              l = {
                  codec: "AAC",
                  bufferData: q,
                  rtpTimeStamp: n
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
