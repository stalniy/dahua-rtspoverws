import { VideoBufferList, debug, decodeMode } from './public1.js';
import { MJPEGDecoder } from './Decode/MjpegDecoder.js';

export function MjpegSession() {
    function a() {
        this.decoder = new MJPEGDecoder,
        this.firstTime = 0,
        this.lastMSW = 0
    }
    var b = 0
      , c = 0
      , d = 0
      , e = {
        frameData: null,
        timeStamp: null
    }
      , f = {
        timestamp: null,
        timezone: null
    }
      , g = 0
      , h = 0
      , i = 0
      , j = 0
      , k = 0
      , l = 0
      , m = !1
      , n = null
      , o = null
      , p = null
      , q = null
      , r = 0
      , s = 0
      , t = 0
      , u = 0
      , v = 8e3
      , w = 0
      , x = {
        width: 0,
        height: 0
    };
    return a.prototype = {
        init: function() {
            this.decoder.setIsFirstFrame(!1),
            this.videoBufferList = new VideoBufferList,
            d = 0,
            this.timeData = null
        },
        parseRTPData: function(a, d, q, r, s) {
            var t = new Uint8Array(1048576);
            b = s.width,
            c = s.height,
            n = {},
            o = {};
            var y = d[22]
              , z = d.subarray(24 + y, d.length - 8);
            p = z.length;
            var A = (d[19] << 24) + (d[18] << 16) + (d[17] << 8) + d[16] >>> 0
              , B = Date.UTC("20" + (A >> 26), (A >> 22 & 15) - 1, A >> 17 & 31, A >> 12 & 31, A >> 6 & 63, 63 & A) / 1e3;
            if (B -= 28800,
            0 == this.firstTime)
                this.firstTime = B,
                this.lastMSW = 0,
                l = (d[21] << 8) + d[20],
                f = {
                    timestamp: this.firstTime,
                    timestamp_usec: 0
                };
            else {
                var C, D = (d[21] << 8) + d[20];
                C = D > l ? D - l : D + 65535 - l,
                this.lastMSW += C,
                B > this.firstTime && (this.lastMSW -= 1e3),
                this.firstTime = B,
                f = {
                    timestamp: B,
                    timestamp_usec: this.lastMSW
                },
                l = D
            }
            0 !== this.getFramerate() && "undefined" != typeof this.getFramerate() || "undefined" == typeof this.getTimeStamp() || this.setFramerate(Math.round(1e3 / ((f.timestamp - this.getTimeStamp().timestamp === 0 ? 0 : 1e3) + (f.timestamp_usec - this.getTimeStamp().timestamp_usec)))),
            this.setTimeStamp(f),
            k = (d[21] << 8) + d[20],
            h = p,
            j = h,
            t = this.appendBuffer(t, z, g),
            g += p,
            t[g + j - 2] = 255,
            t[g + j - 1] = 217,
            i++,
            (x.width != b || x.height != c) && (0 != x.width ? (x.width = b,
            x.height = c,
            o.resolution = x,
            o.resolution.decodeMode = "canvas",
            o.resolution.encodeMode = "mjpeg") : (x.width = b,
            x.height = c,
            o.decodeStart = x,
            o.decodeStart.decodeMode = "canvas",
            o.decodeStart.encodeMode = "mjpeg"));
            var E = 1e3 * f.timestamp + f.timestamp_usec;
            0 == this.firstDiffTime ? (u = 0,
            this.firstDiffTime = Date.now() - E,
            debug.log("firstDiff: " + this.firstTime)) : (0 > E - w && (this.firstDiffTime = u + (Date.now() - E).toFixed(0)),
            u = Date.now() - E - this.firstDiffTime,
            0 > u && (this.firstDiffTime = 0,
            u = 0),
            u > v && (o.error = {
                errorCode: 101
            },
            this.rtpReturnCallback(o))),
            w = E,
            e.frameData = null,
            (q !== !0 || m !== !0) && (this.decoder.setResolution(b, c),
            e.frameData = this.decoder.decode(t.subarray(0, g))),
            e.timeStamp = null,
            f = null === f.timestamp ? this.getTimeStamp() : f,
            e.timeStamp = f,
            q === !0 && (o.backupData = {
                stream: t.subarray(0, g),
                width: b,
                height: c,
                codecType: "mjpeg"
            },
            null !== f.timestamp && "undefined" != typeof f.timestamp ? o.backupData.timestamp_usec = f.timestamp_usec : o.backupData.timestamp = (k / 90).toFixed(0)),
            g = 0,
            e.playback = m,
            o.decodedData = e,
            "canvas" !== decodeMode && (o.decodeMode = "canvas"),
            this.rtpReturnCallback(o)
        },
        getVideoBuffer: function(a) {
            return null !== this.videoBufferList ? this.videoBufferList.searchNodeAt(a) : void 0
        },
        clearBuffer: function() {
            null !== this.videoBufferList && this.videoBufferList.clear()
        },
        findCurrent: function() {
            null !== this.videoBufferList && this.videoBufferList.searchTimestamp(this.getTimeStamp())
        },
        findIFrame: function() {
            null !== this.videoBufferList && this.videoBufferList.findIFrame()
        },
        SetRtpInterlevedID: function(a) {
            this.interleavedID = a
        },
        setTimeStamp: function(a) {
            this.timeData = a
        },
        getTimeStamp: function() {
            return this.timeData
        },
        getRTPPacket: function() {},
        calculatePacketTime: function() {},
        ntohl: function(a) {
            return (a[0] << 24) + (a[1] << 16) + (a[2] << 8) + a[3] >>> 0
        },
        appendBuffer: function(a, b, c) {
            var d = 1048576;
            if (c + b.length >= a.length) {
                var e = new Uint8Array(a.length + d);
                e.set(a, 0),
                a = e
            }
            return a.set(b, c),
            a
        },
        setFramerate: function(a) {
            a > 0 && "undefined" != typeof a && (t = a,
            null !== this.videoBufferList && (this.videoBufferList.setMaxLength(6 * t),
            this.videoBufferList.setBUFFERING(4 * t)))
        },
        getFramerate: function() {
            return t
        },
        setReturnCallback: function(a) {
            this.rtpReturnCallback = a
        },
        setBufferfullCallback: function(a) {
            null !== this.videoBufferList && this.videoBufferList.setBufferFullCallback(a)
        },
        setGovLength: function(a) {
            q = a
        },
        getGovLength: function() {
            return q
        },
        setDecodingTime: function(a) {
            this.decodingTime = a
        },
        getDropPercent: function() {
            return r
        },
        getDropCount: function() {
            return s
        },
        initStartTime: function() {
            this.firstDiffTime = 0,
            this.calcGov = 0
        },
        setCheckDelay: function(a) {
            this.checkDelay = a
        },
        terminate() {}
    },
    new a
};
