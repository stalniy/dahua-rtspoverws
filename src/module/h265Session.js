"use strict";
import { VideoBufferList, debug, reconstructRtpTimestamp } from './public1.js'
import createFFmpegCore from './Decode/ffmpeg-core.js';
import { H265Decoder } from './Decode/h265Decoder.js';
import { PlanarYuvWebGLCanvas } from './WebGLCanvas.js';


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

function splitAnnexBNalUnits(buffer) {
    var units = []
      , start = -1
      , zeroCount = 0;
    for (var index = 0; index < buffer.length; index++) {
        var value = buffer[index];
        if (0 === value) {
            zeroCount++;
            continue
        }
        if (zeroCount >= 2 && 1 === value) {
            -1 !== start && units.push(buffer.subarray(start, index - zeroCount)),
            start = index - zeroCount,
            zeroCount = 0;
            continue
        }
        zeroCount = 0
    }
    return -1 !== start && start < buffer.length && units.push(buffer.subarray(start)),
    units
}

function getNalUnitType(unit) {
    for (var index = 0, zeroCount = 0; index < unit.length; index++) {
        var value = unit[index];
        if (0 === value) {
            zeroCount++;
            continue
        }
        if (zeroCount >= 2 && 1 === value)
            return index + 1 < unit.length ? unit[index + 1] >> 1 & 63 : -1;
        zeroCount = 0
    }
    return -1
}

function stripAnnexBStartCode(unit) {
    for (var index = 0, zeroCount = 0; index < unit.length; index++) {
        var value = unit[index];
        if (0 === value) {
            zeroCount++;
            continue
        }
        if (zeroCount >= 2 && 1 === value)
            return unit.subarray(index + 1);
        zeroCount = 0
    }
    return unit
}

function concatNalUnits(units) {
    for (var totalLength = 0, index = 0; index < units.length; index++)
        totalLength += units[index].length;
    for (var buffer = new Uint8Array(totalLength), offset = 0, index = 0; index < units.length; index++)
        buffer.set(units[index], offset),
        offset += units[index].length;
    return buffer
}

function createBitmapFrameConverter() {
    var canvas = null
      , context = null
      , imageData = null
      , webglRenderer = null
      , webglUnavailable = !1
      , currentWidth = 0
      , currentHeight = 0;

    function clamp(value) {
        return value < 0 ? 0 : value > 255 ? 255 : value
    }
    function createSize(width, height) {
        return {
            w: width,
            h: height,
            getHalfSize: function() {
                return createSize(width >> 1, height >> 1)
            }
        }
    }

    return {
        isSupported: function() {
            return "function" == typeof OffscreenCanvas;
        },
        convert: function(frameData) {
            if (!frameData || !frameData.data || !frameData.option || !this.isSupported())
                return null;

            var width = frameData.width
              , height = frameData.height
              , yPlaneLength = frameData.option.ylen * height
              , uPlaneLength = (frameData.option.ulen || (frameData.option.ylen >> 1)) * (height >> 1)
              , vPlaneLength = (frameData.option.vlen || (frameData.option.ylen >> 1)) * (height >> 1)
              , yPlane = frameData.data.subarray(0, yPlaneLength)
              , uPlane = frameData.data.subarray(yPlaneLength, yPlaneLength + uPlaneLength)
              , vPlane = frameData.data.subarray(yPlaneLength + uPlaneLength, yPlaneLength + uPlaneLength + vPlaneLength);

            if (!canvas || currentWidth !== width || currentHeight !== height) {
                canvas = new OffscreenCanvas(width, height);
                context = null;
                imageData = null;
                webglRenderer = null;
                currentWidth = width;
                currentHeight = height;
            }

            if (!webglUnavailable && !webglRenderer)
                try {
                    webglRenderer = new PlanarYuvWebGLCanvas(canvas, createSize(width, height));
                } catch (error) {
                    webglUnavailable = !0;
                    webglRenderer = null;
                    debug.log("Worker WebGL YUV converter unavailable, falling back to CPU conversion", error);
                }

            if (webglRenderer) {
                webglRenderer.drawCanvas(frameData.data, frameData.option);
                return {
                    data: canvas.transferToImageBitmap(),
                    option: {
                        bitmapFrame: !0
                    },
                    width: width,
                    height: height,
                    codecType: frameData.codecType,
                    frameType: frameData.frameType
                };
            }

            if (!context)
                context = canvas.getContext("2d", {
                    alpha: !1,
                    desynchronized: !0,
                });

            if (!context)
                return null;

            if (!imageData || imageData.width !== width || imageData.height !== height)
                imageData = context.createImageData(width, height);

            for (var rgba = imageData.data, pixelIndex = 0, row = 0; row < height; row++)
                for (var chromaRow = row >> 1, column = 0; column < width; column++) {
                    var ySample = yPlane[pixelIndex]
                      , chromaIndex = chromaRow * (width >> 1) + (column >> 1)
                      , uSample = uPlane[chromaIndex]
                      , vSample = vPlane[chromaIndex]
                      , red = 1.16438 * ySample + 1.59603 * vSample - 222.92157
                      , green = 1.16438 * ySample - 0.39176 * uSample - 0.81297 * vSample + 135.57529
                      , blue = 1.16438 * ySample + 2.01723 * uSample - 276.83585
                      , rgbaOffset = 4 * pixelIndex;
                    rgba[rgbaOffset] = clamp(red);
                    rgba[rgbaOffset + 1] = clamp(green);
                    rgba[rgbaOffset + 2] = clamp(blue);
                    rgba[rgbaOffset + 3] = 255;
                    pixelIndex += 1;
                }

            context.putImageData(imageData, 0, 0);

            return {
                data: canvas.transferToImageBitmap(),
                option: {
                    bitmapFrame: !0
                },
                width: width,
                height: height,
                codecType: frameData.codecType,
                frameType: frameData.frameType
            };
        }
    }
}

export function H265Session() {
    "use strict";
    function a() {
        this.firstTime = 0,
        this.lastMSW = 0,
        this.lastPacketMsw = null
    }
    var b, c = 0, e = 0, f = !1, g = 0, h = 0, i = new H265SPSParser, j = {
        frameData: null,
        timeStamp: null
    }, k = {
        timestamp: null,
        timezone: null
    }, l = 0, m = 0, n = null, o = 0, p = 0, q = 0, r = 0, s = {
        width: 0,
        height: 0
    }, t = 0, u = 8e3, v = 0, w = null, x = "webcodecs", y = null, z = null, bitmapFrameConverter = createBitmapFrameConverter();
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
        setDecoderMode: async function(a) {
            x = "wasm" === a ? "wasm" : "webcodecs",
            z && (z.close(),
            z = null),
            "wasm" === x && (null === y && (y = await createFFmpegCore()),
            z = new H265Decoder(y),
            z.init())
        },
        init: async function(a) {
            this.videoBufferList = new VideoBufferList,
            this.firstDiffTime = 0,
            this.checkDelay = !0,
            this.timeData = null,
            w = null,
            await this.setDecoderMode(a)
        },
        parseRTPData: function(a, n, o, p, q) {
            var A = {};
            var B = reconstructRtpTimestamp(n, {
                firstTime: this.firstTime,
                lastMSW: this.lastMSW,
                lastPacketMsw: this.lastPacketMsw
            });
            this.firstTime = B.firstTime,
            this.lastMSW = B.lastMSW,
            this.lastPacketMsw = B.lastPacketMsw,
            k = B.timestamp,
            0 !== this.getFramerate() && "undefined" != typeof this.getFramerate() || "undefined" == typeof this.getTimeStamp() || (this.setFramerate(Math.round(1e3 / ((k.timestamp - this.getTimeStamp().timestamp === 0 ? 0 : 1e3) + (k.timestamp_usec - this.getTimeStamp().timestamp_usec)))),
            debug.log("setFramerate" + Math.round(1e3 / ((k.timestamp - this.getTimeStamp().timestamp === 0 ? 0 : 1e3) + (k.timestamp_usec - this.getTimeStamp().timestamp_usec))))),
            this.setTimeStamp(k);
            var C = n[22];
            b = n.subarray(24 + C, n.length - 8),
            c = (n[21] << 8) + n[20];
            var D = splitAnnexBNalUnits(b)
              , E = []
              , F = []
              , G = !1
              , H = !1;
            for (var I = 0; I < D.length; I++) {
                var J = D[I]
                  , K = getNalUnitType(J);
                switch (K) {
                default:
                    -1 !== K && F.push(J);
                    K >= 0 && 31 >= K && (H = !0);
                    break;
                case 33: // SPS
                    i.parse2(stripAnnexBStartCode(J));
                    E.push(J);
                    var L = q;
                    h = i.getSizeInfo().decodeSize;
                    l = L.width;
                    m = L.height;
                    (s.width != L.width || s.height != L.height) && (0 != s.width ? (s.width = L.width,
                    s.height = L.height,
                    A.resolution = s,
                    A.resolution.decodeMode = "canvas",
                    A.resolution.encodeMode = "h265") : (s.width = L.width,
                    s.height = L.height,
                    A.decodeStart = s,
                    A.decodeStart.decodeMode = "canvas",
                    A.decodeStart.encodeMode = "h265"));
                    break;
                case 32: // VPS
                case 34: // PPS
                    E.push(J);
                    break;
                case 16: // BLA_W_LP
                case 17: // BLA_W_RADL
                case 18: // BLA_N_LP
                case 19: // IDR_W_RADL
                case 20: // IDR_N_LP
                case 21: // CRA_NUT
                case 22: // RSV_IRAP_VCL22
                case 23: // RSV_IRAP_VCL23
                    G = !0;
                    H = !0;
                    F.push(J);
                    break;
                }
            }
            E.length > 0 && (w = concatNalUnits(E));
            var M = F.length > 0 ? concatNalUnits(F) : null
              , N = G ? "I" : H ? "P" : null
              , O = 1e3 * k.timestamp + k.timestamp_usec;
            0 == this.firstDiffTime ? (t = 0,
            this.firstDiffTime = Date.now() - O,
            debug.log("firstDiff: " + r)) : (0 > O - v && (this.firstDiffTime = t + (Date.now() - O).toFixed(0)),
            t = Date.now() - O - this.firstDiffTime,
            0 > t && (this.firstDiffTime = 0,
            t = 0),
            t > u && (A.error = {
                errorCode: 101
            },
            this.rtpReturnCallback(A))),
            v = O,
            j.frameData = null;

            j.frameData = null;
            j.timeStamp = null,
            e = 0,
            k = null === k.timestamp ? this.getTimeStamp() : k,
            j.timeStamp = k;

            if (null !== M && null !== N)
                if ("wasm" === x) {
                    if (null !== z && h > 0) {
                        z.setOutputSize(h);
                        var P = z.decode(new Uint8Array(b), N);
                        var Q = bitmapFrameConverter.convert(P);
                        P && (j.frameData = P,
                        j.timeStamp = k,
                        A.decodedData = {
                            frameData: Q || P,
                            timeStamp: k
                        })
                    }
                } else
                    A.nalUnits = {
                        frameType: N,
                        width: l,
                        height: m,
                        codecType: "h265",
                        timestamp: k,
                        configuration: null !== w ? new Uint8Array(w) : null,
                        rawStream: new Uint8Array(M)
                    };

            // Optional: Keep backup data for fallback
            o && (A.backupData = {
                stream: new Uint8Array(b), // Create copy for transfer
                frameType: N,
                width: l,
                height: m,
                codecType: "h265"
            },
            null !== k.timestamp && "undefined" != typeof k.timestamp ? A.backupData.timestamp_usec = k.timestamp_usec : A.backupData.timestamp = (c / 90).toFixed(0));

            // Send NAL units back to main thread
            this.rtpReturnCallback(A);

            // console.log('Sending NAL units to main thread:', {
            //     nalCount: nalUnits.length,
            //     frameType: G,
            //     width: l,
            //     height: m,
            //     timestamp: k
            // });

        },
        findIFrame: function() {
            return !1
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
            z && (z.close(),
            z = null)
        }
    },
    new a
};
