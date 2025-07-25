"use strict";
import { VideoBufferList, debug } from './public1.js'
import { H265Decoder } from './Decode/h265Decoder.js';


function H265SPSParser() {
    function a() {
        g = 0,
        h = new Map
    }
    function b() {
        if (l >= k)
            return 0;
        var a = j[l++];
        return 0 == a ? (o++,
        k > l && 2 == o && 3 == j[l] && (l++,
        o = 0)) : o = 0,
        a
    }
    function c() {
        return 0 == m && (n = b(),
        m = 8),
        m--,
        n >> m & 1
    }

    function d(a, b) {
        for (var d = 0; b > 0; )
            d <<= 1,
            d |= c(),
            b--;
        return d
    }
    function e() {
        for (var a = 0; k > l && 0 == c(); )
            a++;
        return d(null, a) + ((1 << a) - 1)
    }
    function f(a, b) {
        if (a) {
            h.set("general_profile_space", d(i, 2)),
            h.set("general_tier_flag", d(i, 1)),
            h.set("general_profile_idc", d(i, 5));
            for (var c = new Array(32), e = 0; 32 > e; e++)
                c[e] = d(i, 1);
            h.set("general_progressive_source_flag", d(i, 1)),
            h.set("general_interlaced_source_flag", d(i, 1)),
            h.set("general_non_packed_constraint_flag", d(i, 1)),
            h.set("general_frame_only_constraint_flag", d(i, 1));
            var f = h.get("general_profile_idc");
            4 === f || c[4] || 5 === f || c[5] || 6 === f || c[6] || 7 === f || c[7] || 8 === f || c[8] || 9 === f || c[9] || 10 === f || c[10] ? (h.set("general_max_12bit_constraint_flag", d(i, 1)),
            h.set("general_max_10bit_constraint_flag", d(i, 1)),
            h.set("general_max_8bit_constraint_flag", d(i, 1)),
            h.set("general_max_422chroma_constraint_flag", d(i, 1)),
            h.set("general_max_420chroma_constraint_flag", d(i, 1)),
            h.set("general_max_monochrome_constraint_flag", d(i, 1)),
            h.set("general_intra_constraint_flag", d(i, 1)),
            h.set("general_one_picture_only_constraint_flag", d(i, 1)),
            h.set("general_lower_bit_rate_constraint_flag", d(i, 1)),
            5 === f || c[5] || 9 === f || c[9] || 10 === f || c[10] ? (h.set("general_max_14bit_constraint_flag", d(i, 1)),
            h.set("general_reserved_zero_33bits", d(i, 33))) : h.set("general_reserved_zero_34bits", d(i, 34))) : h.set("general_reserved_zero_43bits", d(i, 43)),
            f >= 1 && 5 >= f || c[1] || c[2] || c[3] || c[4] || c[5] || c[9] ? h.set("general_inbld_flag", d(i, 1)) : h.set("general_reserved_zero_bit", d(i, 1))
        }
        h.set("general_level_idc", d(i, 8));
        var g = new Array(b)
          , j = new Array(b);
        for (q = 0; b > q; q++)
            g[q] = d(i, 1),
            j[q] = d(i, 1);
        var k = new Array(8)
          , l = new Array(b)
          , m = new Array(b)
          , n = new Array(b)
          , o = []
          , p = new Array(b);
        if (b > 0)
            for (var q = b; 8 > q; q++)
                k[q] = d(i, 2);
        for (var q = 0; b > q; q++) {
            if (g[q]) {
                m[q] = d(i, 2),
                n[q] = d(i, 1),
                l[q] = d(i, 5);
                for (var e = 0; 32 > e; e++)
                    o[q][e] = d(i, 1);
                h.set("sub_layer_progressive_source_flag", d(i, 1)),
                h.set("sub_layer_interlaced_source_flag", d(i, 1)),
                h.set("sub_layer_non_packed_constraint_flag", d(i, 1)),
                h.set("sub_layer_frame_only_constraint_flag", d(i, 1)),
                4 === l[q] || o[q][4] || 5 === l[q] || o[q][5] || 6 === l[q] || o[q][6] || 7 === l[q] || o[q][7] || 8 === l[q] || o[q][8] || 9 === l[q] || o[q][9] || 10 === l[q] || o[q][10] ? (h.set("sub_layer_max_12bit_constraint_flag", d(i, 1)),
                h.set("sub_layer_max_10bit_constraint_flag", d(i, 1)),
                h.set("sub_layer_max_8bit_constraint_flag", d(i, 1)),
                h.set("sub_layer_max_422chroma_constraint_flag", d(i, 1)),
                h.set("sub_layer_max_420chroma_constraint_flag", d(i, 1)),
                h.set("sub_layer_max_monochrome_constraint_flag", d(i, 1)),
                h.set("sub_layer_intra_constraint_flag", d(i, 1)),
                h.set("sub_layer_one_picture_only_constraint_flag", d(i, 1)),
                h.set("sub_layer_lower_bit_rate_constraint_flag", d(i, 1)),
                5 === l[q] || o[q][5] ? (h.set("sub_layer_max_14bit_constraint_flag", d(i, 1)),
                h.set("sub_layer_lower_bit_rate_constraint_flag", d(i, 1)),
                p[q] = d(i, 33)) : p[q] = d(i, 34)) : h.set("sub_layer_reserved_zero_43bits", d(i, 43)),
                l[q] >= 1 && l[q] <= 5 || 9 == l[q] || o[1] || o[2] || o[3] || o[4] || o[5] || o[9] ? h.set("sub_layer_inbld_flag", d(i, 1)) : h.set("sub_layer_reserved_zero_bit", d(i, 1))
            }
            j[q] && h.set("sub_layer_level_idc", d(i, 8))
        }
    }
    var g = 0
      , h = null
      , i = null
      , j = null
      , k = 0
      , l = 0
      , m = 0
      , n = 0
      , o = 0;
    return a.prototype = {
        parse: function(a) {
            i = a,
            g = 0,
            h.clear(),
            h.set("forbidden_zero_bit", d(i, 1)),
            h.set("nal_unit_type", d(i, 6)),
            h.set("nuh_layer_id", d(i, 6)),
            h.set("nuh_temporal_id_plus1", d(i, 3)),
            h.set("sps_video_parameter_set_id", d(i, 4)),
            0 === h.get("nuh_layer_id") ? h.set("sps_max_sub_layers_minus1", d(i, 3)) : h.set("sps_ext_or_max_sub_layers_minus1", d(i, 3));
            var b = 0 !== h.get("nuh_layer_id") && 7 === h.get("sps_ext_or_max_sub_layers_minus1");
            return b || (h.set("sps_max_sub_layers_minus1", d(i, 1)),
            f(1, h.get("sps_max_sub_layers_minus1"))),
            d(i, 84),
            h.set("sps_seq_parameter_set_id", e(i, 0)),
            b ? (h.set("update_rep_format_flag", d(i, 1)),
            h.get("update_rep_format_flag") && h.set("sps_rep_format_idx", d(i, 8))) : (h.set("chroma_format_idc", e(i, 0)),
            3 === h.get("chroma_format_idc") && h.set("separate_colour_plane_flag", d(i, 1)),
            h.set("pic_width_in_luma_samples", e(i, 0)),
            h.set("pic_height_in_luma_samples", e(i, 0)),
            h.set("conformance_window_flag", d(i, 1)),
            h.get("conformance_window_flag") && (h.set("conf_win_left_offset", e(i, 0)),
            h.set("conf_win_right_offset", e(i, 0)),
            h.set("conf_win_top_offset", e(i, 0)),
            h.set("conf_win_bottom_offset", e(i, 0)))),
            !0
        },
        parse2: function(a) {
            var b = a.length;
            if (i = a,
            j = a,
            k = a.length,
            l = 0,
            m = 0,
            n = 0,
            o = 0,
            g = 0,
            h.clear(),
            20 > b)
                return !1;
            d(i, 16),
            d(i, 4);
            var c = d(i, 3);
            if (h.set("sps_max_sub_layers_minus1", c),
            c > 6)
                return !1;
            d(i, 1),
            d(i, 2),
            d(i, 1);
            d(i, 5);
            d(i, 32),
            d(i, 1),
            d(i, 1),
            d(i, 1),
            d(i, 1),
            d(i, 43),
            d(i, 1),
            h.set("general_level_idc", d(i, 8));
            for (var f = [], p = [], q = 0; c > q; q++)
                f[q] = d(i, 1),
                p[q] = d(i, 1);
            if (c > 0)
                for (var q = c; 8 > q; q++) {
                    d(i, 2)
                }
            for (var q = 0; c > q; q++)
                f[q] && (d(i, 2),
                d(i, 1),
                d(i, 5),
                d(i, 32),
                d(i, 1),
                d(i, 1),
                d(i, 1),
                d(i, 1),
                d(i, 44)),
                p[q] && d(i, 8);
            var r = e(i, 0);
            if (h.set("sps_seq_parameter_set_id", r),
            r > 15)
                return !1;
            var s = e(i, 0);
            if (h.set("chroma_format_idc", s),
            r > 3)
                return !1;
            3 == s && d(i, 1),
            h.set("pic_width_in_luma_samples", e(i, 0)),
            h.set("pic_height_in_luma_samples", e(i, 0)),
            d(i, 1) && (e(i, 0),
            e(i, 0),
            e(i, 0),
            e(i, 0));
            var t = e(i, 0)
              , u = e(i, 0);
            return t != u ? !1 : !0
        },
        getSizeInfo: function() {
            var a = h.get("pic_width_in_luma_samples")
              , b = h.get("pic_height_in_luma_samples");
            if (h.get("conformance_window_flag")) {
                var c = h.get("chroma_format_idc")
                  , d = h.get("separate_colour_plane_flag");
                "undefined" == typeof d && (d = 0);
                var e = 1 !== c && 2 !== c || 0 !== d ? 1 : 2
                  , f = 1 === c && 0 === d ? 2 : 1;
                a -= e * h.get("conf_win_right_offset") + e * h.get("conf_win_left_offset"),
                b -= f * h.get("conf_win_bottom_offset") + f * h.get("conf_win_top_offset")
            }
            var g = a * b
              , i = {
                width: a,
                height: b,
                decodeSize: g
            };
            return i
        },
        getSpsValue: function(a) {
            return h.get(a)
        }
    },
    new a
}
export function H265Session(ffmpeg) {
    "use strict";
    function a() {
        this.decoder = H265Decoder(ffmpeg),
        this.firstTime = 0,
        this.lastMSW = 0
    }
    var b, c = 0, d = 0, e = 0, f = !1, g = 0, h = 0, i = new H265SPSParser, j = {
        frameData: null,
        timeStamp: null
    }, k = {
        timestamp: null,
        timezone: null
    }, l = 0, m = 0, n = null, o = 0, p = 0, q = 0, r = 0, s = {
        width: 0,
        height: 0
    }, t = 0, u = 8e3, v = 0;
    return a.prototype = {
        setReturnCallback: function(a) {
            this.rtpReturnCallback = a
        },
        setBufferfullCallback: function(a) {
            null !== this.videoBufferList && this.videoBufferList.setBufferFullCallback(a)
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
        setGovLength: function(a) {
            n = a
        },
        getGovLength: function() {
            return n
        },
        setDecodingTime: function(a) {
            this.decodingTime = a
        },
        getDropPercent: function() {
            return o
        },
        getDropCount: function() {
            return p
        },
        initStartTime: function() {
            this.firstDiffTime = 0,
            this.calcGov = 0
        },
        setCheckDelay: function(a) {
            this.checkDelay = a
        },
        init: function() {
            this.decoder.setIsFirstFrame(!1),
            this.videoBufferList = new VideoBufferList,
            this.firstDiffTime = 0,
            this.checkDelay = !0,
            this.timeData = null
        },
        parseRTPData: function(a, n, o, p, q) {
            var w = null
              , x = {}
              , y = (n[19] << 24) + (n[18] << 16) + (n[17] << 8) + n[16] >>> 0
              , z = Date.UTC("20" + (y >> 26), (y >> 22 & 15) - 1, y >> 17 & 31, y >> 12 & 31, y >> 6 & 63, 63 & y) / 1e3;
            if (z -= 28800,
            0 == this.firstTime)
                this.firstTime = z,
                this.lastMSW = 0,
                d = (n[21] << 8) + n[20],
                k = {
                    timestamp: this.firstTime,
                    timestamp_usec: 0
                };
            else {
                var A, B = (n[21] << 8) + n[20];
                A = B > d ? B - d : B + 65535 - d,
                this.lastMSW += A,
                z > this.firstTime && (this.lastMSW -= 1e3),
                this.firstTime = z,
                k = {
                    timestamp: z,
                    timestamp_usec: this.lastMSW
                },
                d = B
            }
            0 !== this.getFramerate() && "undefined" != typeof this.getFramerate() || "undefined" == typeof this.getTimeStamp() || (this.setFramerate(Math.round(1e3 / ((k.timestamp - this.getTimeStamp().timestamp === 0 ? 0 : 1e3) + (k.timestamp_usec - this.getTimeStamp().timestamp_usec)))),
            debug.log("setFramerate" + Math.round(1e3 / ((k.timestamp - this.getTimeStamp().timestamp === 0 ? 0 : 1e3) + (k.timestamp_usec - this.getTimeStamp().timestamp_usec))))),
            this.setTimeStamp(k);
            var C = n[22];
            b = n.subarray(24 + C, n.length - 8),
            c = (n[21] << 8) + n[20];
            for (var D = [], E = 0; E <= b.length; )
                if (0 == b[E])
                    if (0 == b[E + 1])
                        if (1 == b[E + 2]) {
                            if (D.push(E),
                            E += 3,
                            5 == (31 & b[E]) || 1 == (31 & b[E]))
                                break
                        } else
                            0 == b[E + 2] ? E++ : E += 3;
                    else
                        E += 2;
                else
                    E += 1;
            for (var F, G = "P", E = 0; E < D.length; E++)
                switch (w = b.subarray(D[E] + 3, D[E + 1]),
                F = b[D[E] + 3] >> 1 & 63) {
                default:
                    break;
                case 33:
                    G = "I",
                    i.parse2(w);
                    var H = q;
                    h = i.getSizeInfo().decodeSize,
                    l = H.width,
                    m = H.height,
                    (s.width != H.width || s.height != H.height) && (0 != s.width ? (s.width = H.width,
                    s.height = H.height,
                    x.resolution = s,
                    x.resolution.decodeMode = "canvas",
                    x.resolution.encodeMode = "h265") : (s.width = H.width,
                    s.height = H.height,
                    x.decodeStart = s,
                    x.decodeStart.decodeMode = "canvas",
                    x.decodeStart.encodeMode = "h265"))
                }
            var I = 1e3 * k.timestamp + k.timestamp_usec;
            0 == this.firstDiffTime ? (t = 0,
            this.firstDiffTime = Date.now() - I,
            debug.log("firstDiff: " + r)) : (0 > I - v && (this.firstDiffTime = t + (Date.now() - I).toFixed(0)),
            t = Date.now() - I - this.firstDiffTime,
            0 > t && (this.firstDiffTime = 0,
            t = 0),
            t > u && (x.error = {
                errorCode: 101
            },
            this.rtpReturnCallback(x))),
            v = I,
            j.frameData = null,
            g !== h && (this.decoder.free(),
            g = h,
            this.decoder.setOutputSize(g)),
            (o !== !0 || f !== !0) && (j.frameData = this.decoder.decode(b),
            j.frameData.frameType = G),
            j.timeStamp = null,
            e = 0,
            k = null === k.timestamp ? this.getTimeStamp() : k,
            j.timeStamp = k,
            o && (x.backupData = {
                stream: b,
                frameType: G,
                width: l,
                height: m,
                codecType: "h265"
            },
            null !== k.timestamp && "undefined" != typeof k.timestamp ? x.backupData.timestamp_usec = k.timestamp_usec : x.backupData.timestamp = (c / 90).toFixed(0)),
            x.decodedData = j,
            this.rtpReturnCallback(x)
        },
        findIFrame: function() {
            if (null !== this.videoBufferList) {
                var a = this.videoBufferList.findIFrame();
                if (null === a || "undefined" == typeof a)
                    return !1;
                var b = {};
                return this.setTimeStamp(a.timeStamp),
                b.frameData = this.decoder.decode(a.buffer),
                b.timeStamp = a.timeStamp,
                b
            }
        },
        getFramerate: function() {
            return q
        },
        setFramerate: function(a) {
            a > 0 && "undefined" != typeof a && (q = a,
            null !== this.videoBufferList && (this.videoBufferList.setMaxLength(6 * q),
            this.videoBufferList.setBUFFERING(4 * q)))
        },
        getTimeStamp: function() {
            return this.timeData
        },
        setTimeStamp: function(a) {
            this.timeData = a
        },
        terminate() {
            this.decoder.close();
        }
    },
    new a
};
