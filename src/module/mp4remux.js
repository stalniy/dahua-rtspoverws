import { debug } from "../debug";

export function MP4Remux() {
    function a() {
        for (var a in c)
            c[a] = [a.charCodeAt(0), a.charCodeAt(1), a.charCodeAt(2), a.charCodeAt(3)];
        b = 0,
        d.FTYP = new Uint8Array([105, 115, 111, 109, 0, 0, 0, 1, 105, 115, 111, 109, 97, 118, 99, 49]),
        d.STSD_PREFIX = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]),
        d.STTS = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]),
        d.STSC = d.STCO = d.STTS,
        d.STSZ = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
        d.HDLR_VIDEO = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0]),
        d.HDLR_AUDIO = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0]),
        d.DREF = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1]),
        d.SMHD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]),
        d.VMHD = new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0])
    }
    var b, c = [], d = {};
    c = {
        avc1: [],
        avcC: [],
        btrt: [],
        dinf: [],
        dref: [],
        esds: [],
        ftyp: [],
        hdlr: [],
        mdat: [],
        mdhd: [],
        mdia: [],
        mfhd: [],
        minf: [],
        moof: [],
        moov: [],
        mp4a: [],
        mvex: [],
        mvhd: [],
        sdtp: [],
        stbl: [],
        stco: [],
        stsc: [],
        stsd: [],
        stsz: [],
        stts: [],
        tfdt: [],
        tfhd: [],
        traf: [],
        trak: [],
        trun: [],
        trex: [],
        tkhd: [],
        vmhd: [],
        smhd: []
    };
    var e = function(a) {
        for (var b = 8, c = Array.prototype.slice.call(arguments, 1), d = 0; d < c.length; d++)
            b += c[d].byteLength;
        var e = new Uint8Array(b)
          , f = 0;
        e[f++] = b >>> 24 & 255,
        e[f++] = b >>> 16 & 255,
        e[f++] = b >>> 8 & 255,
        e[f++] = 255 & b,
        e.set(a, f),
        f += 4;
        for (var d = 0; d < c.length; d++)
            e.set(c[d], f),
            f += c[d].byteLength;
        return e
    }
      , f = function(a) {
        var b = a.config
          , d = b.length
          , f = new Uint8Array([0, 0, 0, 0, 3, 23 + d, 0, 1, 0, 4, 15 + d, 64, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5].concat([d]).concat(b).concat([6, 1, 2]));
        return e(c.esds, f)
    }
      , g = function(a) {
        return e(c.mp4a, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, (65280 & a.channelcount) >> 8, 255 & a.channelcount, (65280 & a.samplesize) >> 8, 255 & a.samplesize, 0, 0, 0, 0, (65280 & a.samplerate) >> 8, 255 & a.samplerate, 0, 0]), f(a))
    }
      , h = function(a) {
        var b = a.sps || []
          , d = a.pps || []
          , f = []
          , g = []
          , h = 0;
        for (h = 0; h < b.length; h++)
            f.push((65280 & b[h].byteLength) >>> 8),
            f.push(255 & b[h].byteLength),
            f = f.concat(Array.prototype.slice.call(b[h]));
        for (h = 0; h < d.length; h++)
            g.push((65280 & d[h].byteLength) >>> 8),
            g.push(255 & d[h].byteLength),
            g = g.concat(Array.prototype.slice.call(d[h]));
        return e(c.avc1, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, (65280 & a.width) >> 8, 255 & a.width, (65280 & a.height) >> 8, 255 & a.height, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 17, 17]), e(c.avcC, new Uint8Array([1, a.profileIdc, a.profileCompatibility, a.levelIdc, 255].concat([b.length]).concat(f).concat([d.length]).concat(g))))
    }
      , i = function(a) {
        return "audio" === a.type ? e(c.stsd, d.STSD_PREFIX, g(a)) : e(c.stsd, d.STSD_PREFIX, h(a))
    }
      , j = function() {
        return e(c.dinf, e(c.dref, d.DREF))
    }
      , k = function(a) {
        var b = e(c.stbl, i(a), e(c.stts, d.STTS), e(c.stsc, d.STSC), e(c.stsz, d.STSZ), e(c.stco, d.STCO));
        return b
    }
      , l = function(a) {
        var b = a.timescale
          , d = a.duration;
        return e(c.mdhd, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, b >>> 24 & 255, b >>> 16 & 255, b >>> 8 & 255, 255 & b, d >>> 24 & 255, d >>> 16 & 255, d >>> 8 & 255, 255 & d, 85, 196, 0, 0]))
    }
      , m = function(a) {
        var b = null;
        return b = "audio" === a.type ? d.HDLR_AUDIO : d.HDLR_VIDEO,
        e(c.hdlr, b)
    }
      , n = function(a) {
        var b = null;
        return b = "audio" === a.type ? e(c.smhd, d.SMHD) : e(c.vmhd, d.VMHD),
        e(c.minf, b, j(), k(a))
    }
      , o = function(a) {
        var b = a.id
          , d = a.duration
          , f = a.width
          , g = a.height;
        return e(c.tkhd, new Uint8Array([0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, b >>> 24 & 255, b >>> 16 & 255, b >>> 8 & 255, 255 & b, 0, 0, 0, 0, d >>> 24 & 255, d >>> 16 & 255, d >>> 8 & 255, 255 & d, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, f >>> 8 & 255, 255 & f, 0, 0, g >>> 8 & 255, 255 & g, 0, 0]))
    }
      , p = function(a) {
        return e(c.mdia, l(a), m(a), n(a))
    }
      , q = function(a) {
        var b = a.id
          , d = new Uint8Array([0, 0, 0, 0, b >>> 24 & 255, b >>> 16 & 255, b >>> 8 & 255, 255 & b, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]);
        return e(c.trex, d)
    }
      , r = function(a, b) {
        return debug.log("mvhd:  timescale: " + a + "  duration: " + b),
        e(c.mvhd, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a >>> 24 & 255, a >>> 16 & 255, a >>> 8 & 255, 255 & a, b >>> 24 & 255, b >>> 16 & 255, b >>> 8 & 255, 255 & b, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255]))
    }
      , s = function(a) {
        return e(c.trak, o(a), p(a))
    }
      , t = function(a) {
        return e(c.mvex, q(a))
    }
      , u = function(a) {
        var b = r(a.timescale, a.duration)
          , d = s(a)
          , f = t(a);
        return e(c.moov, b, d, f)
    }
      , v = function(a, b) {
        return [0, 0, 3, 5, (4278190080 & a.length) >>> 24, (16711680 & a.length) >>> 16, (65280 & a.length) >>> 8, 255 & a.length, (4278190080 & b) >>> 24, (16711680 & b) >>> 16, (65280 & b) >>> 8, 255 & b, 0, 0, 0, 0]
    }
      , w = function(a, b) {
        var d = null
          , f = null
          , g = null
          , h = 0
          , i = b;
        if (f = a.samples || [],
        null === f[0].frameDuration)
            for (i += 24 + 4 * f.length,
            d = trunHeader(f, i),
            h = 0; h < f.length; h++)
                g = f[h],
                d = d.concat([(4278190080 & g.size) >>> 24, (16711680 & g.size) >>> 16, (65280 & g.size) >>> 8, 255 & g.size]);
        else
            for (i += 24 + 4 * f.length + 4 * f.length,
            d = v(f, i),
            h = 0; h < f.length; h++)
                g = f[h],
                d = d.concat([(4278190080 & g.frameDuration) >>> 24, (16711680 & g.frameDuration) >>> 16, (65280 & g.frameDuration) >>> 8, 255 & g.frameDuration, (4278190080 & g.size) >>> 24, (16711680 & g.size) >>> 16, (65280 & g.size) >>> 8, 255 & g.size]);
        return e(c.trun, new Uint8Array(d))
    }
      , x = function(a, b) {
        return "audio" === a.type ? audioTrun(a, b) : w(a, b)
    }
      , y = function(a) {
        var b = new Uint8Array([0, 0, 0, 0, a >>> 24 & 255, a >>> 16 & 255, a >>> 8 & 255, 255 & a]);
        return e(c.mfhd, b)
    }
      , z = function(a) {
        var b = null
          , d = null
          , f = null
          , g = null;
        return b = e(c.tfhd, new Uint8Array([0, 2, 0, 0, 0, 0, 0, 1])),
        d = e(c.tfdt, new Uint8Array([0, 0, 0, 0, a.baseMediaDecodeTime >>> 24 & 255, a.baseMediaDecodeTime >>> 16 & 255, a.baseMediaDecodeTime >>> 8 & 255, 255 & a.baseMediaDecodeTime])),
        g = 72,
        f = x(a, g),
        e(c.traf, b, d, f)
    }
      , A = function(a, b) {
        return e(c.moof, y(a), z(b))
    }
      , B = function(a) {
        return e(c.mdat, a)
    };
    return a.prototype = {
        initSegment: function(a) {
            var b = e(c.ftyp, d.FTYP);
            debug.log(a);
            var f = u(a)
              , g = new Uint8Array(b.byteLength + f.byteLength);
            return g.set(b, 0),
            g.set(f, b.byteLength),
            g
        },
        mediaSegment: function(a, b, c) {
            var d = A(a, b)
              , e = B(c)
              , f = null;
            return f = new Uint8Array(d.byteLength + e.byteLength),
            f.set(d),
            f.set(e, d.byteLength),
            f
        }
    },
    new a
}

export const mp4Remux = new MP4Remux();
