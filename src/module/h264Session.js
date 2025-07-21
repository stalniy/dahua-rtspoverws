import { H264Decoder } from './Decode/h264Decoder.js';
import { mp4Remux } from './mp4remux.js';
import { VideoBufferList, debug } from './public1.js'

function H264SPSParser() {
    function a() {
        x = 0,
        y = new Map
    }
    function b(a, b) {
        var c = b
          , d = x + c >> l;
        return c = x + b & i,
        a[d] >> j - (c & j) & 1
    }
    function c(a) {
        var b = x >> l
          , c = 8 * (b + 1)
          , d = c - x;
        if (8 > d)
            for (var e = 0; 3 > e; e++) {
                var f = a[b + e];
                f = 0 == e ? f >> d << d : 2 == e ? f & 255 >> 8 - d | 1 << d : 0,
                a.set([f], b + e)
            }
        else
            a.set([0], b),
            a.set([1], b + 1)
    }
    function d(a, c) {
        var d = 0
          , e = 0
          , f = 0;
        if (1 === c)
            e = b(a, d);
        else
            for (var g = 0; c > g; g++)
                f = b(a, g),
                e = (e << 1) + f;
        return x += c,
        e
    }
    function e(a, c) {
        for (var d = 0, e = 0, f = 0, g = c; x + g < 8 * a.length && !(e = b(a, g++)); )
            d++;
        if (0 === d)
            return x += 1,
            0;
        f = 1 << d;
        for (var h = d - 1; h >= 0; h--,
        g++)
            e = b(a, g),
            f |= e << h;
        var i = d * k + 1;
        return x += i,
        f - 1
    }
    function f(a, b) {
        var c = e(a, b);
        return 1 & c ? (c + 1) / k : -c / k
    }
    function g(a) {
        y.set("cpb_cnt_minus1", e(a, 0)),
        y.set("bit_rate_scale", d(a, m)),
        y.set("cpb_size_scale", d(a, m));
        for (var b = y.get("cpb_cnt_minus1"), c = new Array(b), f = new Array(b), g = new Array(b), h = 0; b >= h; h++)
            c[h] = e(a, 0),
            f[h] = e(a, 0),
            g[h] = d(a, 1);
        y.set("bit_rate_value_minus1", c),
        y.set("cpb_size_value_minus1", f),
        y.set("cbr_flag", g),
        y.set("initial_cpb_removal_delay_length_minus1", d(a, n)),
        y.set("cpb_removal_delay_length_minus1", d(a, n)),
        y.set("dpb_output_delay_length_minus1", d(a, n)),
        y.set("time_offset_length", d(a, n))
    }
    function h(a) {
        y.set("aspect_ratio_info_present_flag", d(a, 1)),
        y.get("aspect_ratio_info_present_flag") && (y.set("aspect_ratio_idc", d(a, p)),
        y.get("aspect_ratio_idc") === v && (c(a, s),
        y.set("sar_width", d(a, s)),
        c(a, s),
        y.set("sar_height", d(a, s)))),
        y.set("overscan_info_present_flag", d(a, 1)),
        y.get("overscan_info_present_flag") && y.set("overscan_appropriate_flag", d(a, 1)),
        y.set("video_signal_type_present_flag", d(a, 1)),
        y.get("video_signal_type_present_flag") && (y.set("video_format", d(a, l)),
        y.set("video_full_range_flag", d(a, 1)),
        y.set("colour_description_present_flag", d(a, 1)),
        y.get("colour_description_present_flag") && (y.set("colour_primaries", d(a, p)),
        y.set("transfer_characteristics", d(a, p)),
        y.set("matrix_coefficients", d(a, p)))),
        y.set("chroma_loc_info_present_flag", d(a, 1)),
        y.get("chroma_loc_info_present_flag") && (y.set("chroma_sample_loc_type_top_field", e(a, 0)),
        y.set("chroma_sample_loc_type_bottom_field", e(a, 0))),
        y.set("timing_info_present_flag", d(a, 1)),
        y.get("timing_info_present_flag") && (y.set("num_units_in_tick", d(a, t)),
        y.set("time_scale", d(a, t)),
        y.set("fixed_frame_rate_flag", d(a, 1))),
        y.set("nal_hrd_parameters_present_flag", d(a, 1)),
        y.get("nal_hrd_parameters_present_flag") && g(a),
        y.set("vcl_hrd_parameters_present_flag", d(a, 1)),
        y.get("vcl_hrd_parameters_present_flag") && g(a),
        (y.get("nal_hrd_parameters_present_flag") || y.get("vcl_hrd_parameters_present_flag")) && y.set("low_delay_hrd_flag", d(a, 1)),
        y.set("pic_struct_present_flag", d(a, 1)),
        y.set("bitstream_restriction_flag", d(a, 1)),
        y.get("bitstream_restriction_flag") && (y.set("motion_vectors_over_pic_boundaries_flag", d(a, 1)),
        y.set("max_bytes_per_pic_denom", e(a, 0)),
        y.set("max_bits_per_mb_denom", e(a, 0)))
    }
    var i = 7
      , j = 7
      , k = 2
      , l = 3
      , m = 4
      , n = 5
      , o = 6
      , p = 8
      , q = 12
      , r = 15
      , s = 16
      , t = 32
      , u = 64
      , v = 255
      , w = 256
      , x = 0
      , y = null;
    return a.prototype = {
        parse: function(a) {
            x = 0,
            y.clear(),
            y.set("forbidden_zero_bit", d(a, 1)),
            y.set("nal_ref_idc", d(a, k)),
            y.set("nal_unit_type", d(a, n)),
            y.set("profile_idc", d(a, p)),
            y.set("profile_compatibility", d(a, p)),
            y.set("level_idc", d(a, p)),
            y.set("seq_parameter_set_id", e(a, 0));
            var b = y.get("profile_idc")
              , c = 100
              , g = 110
              , i = 122
              , j = 244
              , m = 44
              , r = 83
              , t = 86
              , v = 118
              , z = 128
              , A = 138
              , B = 139
              , C = 134;
            if ((b === c || b === g || b === i || b === j || b === m || b === r || b === t || b === v || b === z || b === A || b === B || b === C) && (y.set("chroma_format_idc", e(a, 0)),
            y.get("chroma_format_idc") === l && y.set("separate_colour_plane_flag", d(a, 1)),
            y.set("bit_depth_luma_minus8", e(a, 0)),
            y.set("bit_depth_chroma_minus8", e(a, 0)),
            y.set("qpprime_y_zero_transform_bypass_flag", d(a, 1)),
            y.set("seq_scaling_matrix_present_flag", d(a, 1)),
            y.get("seq_scaling_matrix_present_flag"))) {
                for (var D = y.get("chroma_format_idc") !== l ? p : q, E = new Array(D), F = 0; D > F; F++)
                    if (E[F] = d(a, 1),
                    E[F])
                        for (var G = o > F ? s : u, H = 8, I = 8, J = 0, K = 0; G > K; K++)
                            I && (J = f(a, 0),
                            I = (H + J + w) % w),
                            H = 0 === I ? H : I;
                y.set("seq_scaling_list_present_flag", E)
            }
            if (y.set("log2_max_frame_num_minus4", e(a, 0)),
            y.set("pic_order_cnt_type", e(a, 0)),
            0 === y.get("pic_order_cnt_type"))
                y.set("log2_max_pic_order_cnt_lsb_minus4", e(a, 0));
            else if (1 === y.get("pic_order_cnt_type")) {
                y.set("delta_pic_order_always_zero_flag", d(a, 1)),
                y.set("offset_for_non_ref_pic", f(a, 0)),
                y.set("offset_for_top_to_bottom_field", f(a, 0)),
                y.set("num_ref_frames_in_pic_order_cnt_cycle", e(a, 0));
                for (var L = 0; L < y.get("num_ref_frames_in_pic_order_cnt_cycle"); L++)
                    y.set("num_ref_frames_in_pic_order_cnt_cycle", f(a, 0))
            }
            return y.set("num_ref_frames", e(a, 0)),
            y.set("gaps_in_frame_num_value_allowed_flag", d(a, 1)),
            y.set("pic_width_in_mbs_minus1", e(a, 0)),
            y.set("pic_height_in_map_units_minus1", e(a, 0)),
            y.set("frame_mbs_only_flag", d(a, 1)),
            0 === y.get("frame_mbs_only_flag") && y.set("mb_adaptive_frame_field_flag", d(a, 1)),
            y.set("direct_8x8_interence_flag", d(a, 1)),
            y.set("frame_cropping_flag", d(a, 1)),
            1 === y.get("frame_cropping_flag") && (y.set("frame_cropping_rect_left_offset", e(a, 0)),
            y.set("frame_cropping_rect_right_offset", e(a, 0)),
            y.set("frame_cropping_rect_top_offset", e(a, 0)),
            y.set("frame_cropping_rect_bottom_offset", e(a, 0))),
            y.set("vui_parameters_present_flag", d(a, 1)),
            y.get("vui_parameters_present_flag") && h(a),
            !0
        },
        getSizeInfo: function() {
            var a = 0
              , b = 0;
            0 === y.get("chroma_format_idc") ? a = b = 0 : 1 === y.get("chroma_format_idc") ? a = b = k : y.get("chroma_format_idc") === k ? (a = k,
            b = 1) : y.get("chroma_format_idc") === l && (0 === y.get("separate_colour_plane_flag") ? a = b = 1 : 1 === y.get("separate_colour_plane_flag") && (a = b = 0));
            var c = y.get("pic_width_in_mbs_minus1") + 1
              , d = y.get("pic_height_in_map_units_minus1") + 1
              , e = (k - y.get("frame_mbs_only_flag")) * d
              , f = 0
              , g = 0
              , h = 0
              , i = 0;
            1 === y.get("frame_cropping_flag") && (f = y.get("frame_cropping_rect_left_offset"),
            g = y.get("frame_cropping_rect_right_offset"),
            h = y.get("frame_cropping_rect_top_offset"),
            i = y.get("frame_cropping_rect_bottom_offset"));
            var j = c * s * e * s
              , m = c * s - a * (f + g)
              , n = e * s - b * (k - y.get("frame_mbs_only_flag")) * (h + i)
              , o = {
                width: m,
                height: n,
                decodeSize: j
            };
            return o
        },
        getSpsValue: function(a) {
            return y.get(a)
        },
        getCodecInfo: function() {
            var a = y.get("profile_idc").toString(s)
              , b = y.get("profile_compatibility") < r ? "0" + y.get("profile_compatibility").toString(s) : y.get("profile_compatibility").toString(s)
              , c = y.get("level_idc").toString(s);
            return a + b + c
        }
    },
    new a
}
export function H264Session(ffmpeg) {
    function a(a) {
        a !== I && ("video" === a ? I = "video" : (I = "canvas",
        o = !0,
        p = 0,
        q.frameData.firstFrame = !0))
    }
    function b(a, b, c) {
        var d = "";
        return a * b > 921600 && c === !1 ? (d = "video",
        Q && M > 0 && 3 >= M && (d = "canvas")) : d = "canvas",
        d
    }
    function c() {
        this.decoder = new H264Decoder(ffmpeg),
        this.firstDiffTime = 0,
        this.firstTime = 0,
        this.lastMSW = 0
    }
    var d = 0
      , e = 0
      , f = 0
      , g = 1048576
      , h = !1
      , i = (new Uint8Array(g),
    new Uint8Array(["0x00", "0x00", "0x00", "0x01"]),
    new H264SPSParser)
      , j = 0
      , k = null
      , l = null
      , m = 0
      , n = 8e3
      , o = !1
      , p = 0
      , q = {
        frameData: null,
        timeStamp: null,
        initSegmentData: null,
        mediaSample: null,
        dropPercent: 0,
        dropCount: 0,
        codecInfo: "",
        playback: !1
    }
      , r = {
        timestamp: null,
        timezone: null
    }
      , s = {}
      , t = null
      , u = null
      , v = !1
      , w = !1
      , x = 0
      , y = 0
      , z = 786432
      , A = 0
      , B = 0
      , C = !1
      , D = 0
      , E = null
      , F = 0
      , G = null
      , H = 0
      , I = ""
      , J = null
      , K = 0
      , L = 0
      , M = 0
      , N = 0
      , O = {
        width: 0,
        height: 0
    }
      , P = null
      , Q = !1;
    return c.prototype = {
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
        setTimeStamp: function(a) {
            this.timeData = a
        },
        getTimeStamp: function() {
            return this.timeData
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
        getFramerate: function() {
            return M
        },
        setGovLength: function(a) {
            J = a
        },
        getGovLength: function() {
            return J
        },
        setDecodingTime: function(a) {
            this.decodingTime = a
        },
        getDropPercent: function() {
            return K
        },
        getDropCount: function() {
            return L
        },
        initStartTime: function() {
            this.firstDiffTime = 0,
            this.calcGov = 0
        },
        setCheckDelay: function(a) {
            this.checkDelay = a
        },
        init: function(a) {
            v = !1,
            h = !1,
            I = a,
            this.decoder.setIsFirstFrame(!1),
            this.videoBufferList = new VideoBufferList,
            this.firstDiffTime = 0,
            this.checkDelay = !0,
            this.timeData = null
        },
        setFramerate: function(a) {
            a > 0 && "undefined" != typeof a && (M = a,
            null !== this.videoBufferList && (this.videoBufferList.setMaxLength(6 * M),
            this.videoBufferList.setBUFFERING(4 * M)))
        },
        parseRTPData: function(c, g, J, K, L) {
            {
                var M = null
                  , Q = {}
                  , R = (g[19] << 24) + (g[18] << 16) + (g[17] << 8) + g[16] >>> 0
                  , S = Date.UTC("20" + (R >> 26), (R >> 22 & 15) - 1, R >> 17 & 31, R >> 12 & 31, R >> 6 & 63, 63 & R) / 1e3;
                L.timeStampmsw
            }
            if (S -= 28800,
            I || 253 !== g[4] || (P = 0 === g[5] ? !1 : !0,
            I = b(L.width, L.height, P)),
            "" !== I) {
                if (0 == this.firstTime)
                    this.firstTime = S,
                    this.lastMSW = 0,
                    G = (g[21] << 8) + g[20],
                    r = {
                        timestamp: this.firstTime,
                        timestamp_usec: 0
                    };
                else {
                    var T, U = (g[21] << 8) + g[20];
                    T = U > G ? U - G : U + 65535 - G,
                    this.lastMSW += T,
                    S > this.firstTime && (this.lastMSW -= 1e3),
                    this.firstTime = S,
                    r = {
                        timestamp: S,
                        timestamp_usec: this.lastMSW
                    },
                    G = U
                }
                0 !== this.getFramerate() && "undefined" != typeof this.getFramerate() || "undefined" == typeof this.getTimeStamp() || (this.setFramerate(Math.round(1e3 / ((r.timestamp - this.getTimeStamp().timestamp === 0 ? 0 : 1e3) + (r.timestamp_usec - this.getTimeStamp().timestamp_usec)))),
                debug.log("setFramerate" + Math.round(1e3 / ((r.timestamp - this.getTimeStamp().timestamp === 0 ? 0 : 1e3) + (r.timestamp_usec - this.getTimeStamp().timestamp_usec))))),
                this.setTimeStamp(r);
                for (var V = g[22], W = g.subarray(24 + V, g.length - 8), X = g.subarray(g.length - 8, g.length), Y = ((X[7] << 24) + (X[6] << 16) + (X[5] << 8) + X[4],
                []), Z = 0; Z <= W.length; )
                    if (0 == W[Z])
                        if (0 == W[Z + 1])
                            if (1 == W[Z + 2]) {
                                if (Y.push(Z),
                                Z += 3,
                                5 == (31 & W[Z]) || 1 == (31 & W[Z]))
                                    break
                            } else
                                0 == W[Z + 2] ? Z++ : Z += 3;
                        else
                            Z += 2;
                    else
                        Z += 1;
                var $ = "P";
                d = (g[21] << 8) + g[20];
                for (var _, ab = 0, Z = 0; Z < Y.length; Z++)
                    switch (M = W.subarray(Y[Z] + 3, Y[Z + 1]),
                    _ = 31 & W[Y[Z] + 3]) {
                    default:
                        break;
                    case 1:
                        $ = "P",
                        ab = Y[Z] - 1;
                        break;
                    case 5:
                        $ = "I",
                        ab = Y[Z] - 1;
                        break;
                    case 28:
                        break;
                    case 7:
                        i.parse(M);
                        var bb = L;
                        j = i.getSizeInfo().decodeSize,
                        (null === k || null === l || k.width !== bb.width || k.height !== bb.height || l !== i.getCodecInfo()) && (v = !1,
                        k = bb,
                        l = i.getCodecInfo(),
                        this.decoder.setIsFirstFrame(!1)),
                        A = x = bb.width,
                        B = y = bb.height,
                        t = M,
                        (O.width != bb.width || O.height != bb.height) && (0 != O.width ? (O.width = bb.width,
                        O.height = bb.height,
                        Q.resolution = O,
                        Q.resolution.decodeMode = b(O.width, O.height, P),
                        Q.resolution.encodeMode = "h264") : (O.width = bb.width,
                        O.height = bb.height,
                        Q.decodeStart = O,
                        Q.decodeStart.decodeMode = I,
                        Q.decodeStart.encodeMode = "h264"));
                        break;
                    case 8:
                        u = M;
                        break;
                    case 6:
                        break;
                    case 9:
                    }
                if (J && o === !1 && (Q.backupData = {
                    stream: new Uint8Array(W),
                    frameType: $,
                    width: A,
                    height: B,
                    codecType: "h264"
                },
                null !== r.timestamp && "undefined" != typeof r.timestamp ? Q.backupData.timestamp_usec = r.timestamp_usec : Q.backupData.timestamp = (d / 90).toFixed(0)),
                "canvas" === I) {
                    var cb = 1e3 * r.timestamp + r.timestamp_usec;
                    if (0 == this.firstDiffTime ? (m = 0,
                    this.firstDiffTime = Date.now() - cb,
                    debug.log("firstDiff: " + N)) : (0 > cb - E && (this.firstDiffTime = m + (Date.now() - cb).toFixed(0)),
                    m = Date.now() - cb - this.firstDiffTime,
                    0 > m && (this.firstDiffTime = 0,
                    m = 0),
                    m > n && (Q.error = {
                        errorCode: 101
                    },
                    this.rtpReturnCallback(Q))),
                    E = cb,
                    f !== j && (this.decoder.free(),
                    f = j,
                    this.decoder.setOutputSize(f)),
                    o === !0 && "P" === $)
                        return void (e = 0);
                    o === !0 && (o = !1),
                    "I" === $ && 2 > p && p++,
                    q.frameData = null,
                    (J !== !0 || h !== !0) && (q.frameData = this.decoder.decode(W)),
                    q.timeStamp = null,
                    e = 0,
                    r = null === r.timestamp ? this.getTimeStamp() : r,
                    q.timeStamp = r
                } else {
                    var db = null;
                    if (v)
                        q.initSegmentData = null;
                    else {
                        v = !0;
                        var L = {
                            id: 1,
                            width: x,
                            height: y,
                            type: "video",
                            profileIdc: i.getSpsValue("profile_idc"),
                            profileCompatibility: 0,
                            levelIdc: i.getSpsValue("level_idc"),
                            sps: [t],
                            pps: [u],
                            timescale: 1e3,
                            fps: this.getFramerate()
                        };
                        debug.log(JSON.stringify(L)),
                        q.initSegmentData = mp4Remux.initSegment(L),
                        q.codecInfo = i.getCodecInfo()
                    }
                    if (ab || debug.log("11111111111111111111111111111111111111111"),
                    "I" === $) {
                        var eb = ab;
                        db = W.subarray(eb, W.length)
                    } else
                        db = W.subarray(ab, W.length);
                    var fb = db.length - 4;
                    db[0] = (4278190080 & fb) >>> 24,
                    db[1] = (16711680 & fb) >>> 16,
                    db[2] = (65280 & fb) >>> 8,
                    db[3] = 255 & fb;
                    var gb = this.getFramerate()
                      , hb = {
                        duration: Math.round(1 / gb * 1e3),
                        size: db.length,
                        frame_time_stamp: null,
                        frameDuration: null
                    };
                    if (h)
                        hb.frame_time_stamp = d,
                        q.frameData = new Uint8Array(db),
                        q.mediaSample = hb;
                    else {
                        if (J === !1) {
                            if (hb.frame_time_stamp = 1e3 * r.timestamp + r.timestamp_usec - N,
                            w === !1)
                                hb.frame_time_stamp = 0,
                                N = 1e3 * r.timestamp + r.timestamp_usec,
                                hb.frameDuration = 0,
                                s = hb,
                                w = !0;
                            else {
                                var ib = s.frame_time_stamp
                                  , jb = hb.frame_time_stamp;
                                hb.frameDuration = Math.abs(jb - ib),
                                hb.frameDuration > 3e3 && (hb.frameDuration = 0),
                                s = hb
                            }
                            q.frameData = new Uint8Array(db),
                            q.mediaSample = hb
                        }
                        r = null === r.timestamp ? this.getTimeStamp() : r,
                        q.timeStamp = r
                    }
                    e = 0
                }
                var kb = A * B;
                if (h === !0) {
                    var lb = (H / F * 100).toFixed(0) < 60;
                    kb > z ? 5e3 > F ? (a("video"),
                    Q.decodeMode = "video") : lb === !0 ? (a("video"),
                    Q.decodeMode = "video") : (a("canvas"),
                    Q.decodeMode = "canvas") : (a("canvas"),
                    Q.decodeMode = "canvas")
                }
                return q.playback = h,
                Q.decodedData = q,
                C === !0 ? ("I" === $ && D++,
                2 === D && (D = 0,
                C = !1),
                void debug.info("H264Session::stop")) : void this.rtpReturnCallback(Q)
            }
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
        setLessRate: function(a) {
            Q = a
        },
        setInitSegment: function() {
            v = !1,
            k = null,
            l = null
        },
        terminate() {
            this.decoder.close();
        }
    },
    new c
};
