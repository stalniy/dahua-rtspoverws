import { VideoMediaSource } from "./videoMediaSource.js";
import { BrowserDetect } from "./module/public1.js";
import { mp4Remux } from "./module/mp4remux.js";
import { StreamDrawer } from "./streamdrawer";
import { IvsDraw } from './ivs.js'
import { debug } from './debug.js';
import { AudioPlayerGxx, AudioPlayerAAC } from './audioPlayer.js';
import VideoWorker from './module/videoWorker.js?worker';
import AudioWorker from './module/audioWorker.js?worker';

export default function WorkerManager() {
    function a() {
        O = !0,
        o = this
    }
    function b() {
        return Y
    }
    function c() {
        null !== z && z(!1)
    }
    function d(b) {
        var c = b.data;
        switch (c.type) {
        case "WorkerReady":
            zb && zb();
            break;
        case "canvasRender":
            k(0, "currentTime"),
            i(c.data, c.option),
            vb++;
            break;
        case "initSegment":
            Y = c.data,
            j();
            break;
        case "mediaSample":
            null === $.samples && ($.samples = new Array(kb)),
            null === c.data.frame_time_stamp && (c.data.frameDuration = Math.round(qb / L)),
            1 !== jb && (c.data.frameDuration = qb / Math.abs(jb)),
            $.samples[_++] = c.data,
            ob += c.data.frameDuration,
            pb += c.data.frameDuration,
            lb = kb;
            break;
        case "videoRender":
            var d = new Uint8Array(c.data.length + ab);
            if (0 !== ab && d.set(bb),
            d.set(c.data, ab),
            bb = d,
            ab = bb.length,
            _ % kb === 0 && 0 !== _) {
                if (null !== $.samples[0].frameDuration ? ($.baseMediaDecodeTime = 1 === cb ? 0 : nb,
                nb = ob) : $.baseMediaDecodeTime = Math.round(qb / L) * kb * (cb - 1),
                "chrome" == I && 1 === jb)
                    for (var e = $.samples.length, f = pb / kb, g = 0; e > g; g++)
                        $.samples[g].frameDuration = f;
                pb = 0,
                Z = mp4Remux.mediaSegment(cb, $, bb, $.baseMediaDecodeTime),
                cb++,
                _ = 0,
                bb = null,
                ab = 0,
                null !== X ? X.setMediaSegment(Z) : mb === !1 && (debug.log("workerManager::videoMS error!! recreate videoMS"),
                j()),
                null !== p && p.stopRendering()
            }
            break;
        case "mediasegmentData":
            X.setMediaSegment(c.data),
            mb === !1 && (debug.log("videoMS error!! recreate videoMS"),
            j());
            break;
        case "videoInfo":
            J = c.data,
            0 === ub && (ub = performance.now(),
            "canvas" === P && C(J.timeStamp));
            break;
        case "time":
            break;
        case "videoTimeStamp":
            fb = c.data,
            null !== X && null !== fb && X.setvideoTimeStamp(fb);
            break;
        case "firstFrame":
            p.startRendering(),
            "undefined" != typeof p.setFPS && p.setFPS(L);
            break;
        case "drop":
            break;
        case "codecInfo":
            db = c.data,
            null !== X && X.setCodecInfo(db);
            break;
        case "stepPlay":
            switch (c.data) {
            case "needBuffering":
                R = !0,
                w("request", T);
                break;
            case "BufferFull":
                if (R = !1,
                w("complete"),
                Cb) {
                    var h = {
                        type: "stepPlay",
                        data: "findIFrame"
                    };
                    videoProcessWorker.postMessage(h),
                    p.startRendering(),
                    Cb = !1
                }
            }
            break;
        case "setVideoTagMode":
            a.prototype.setLiveMode(c.data);
            break;
        case "playbackFlag":
            Bb.type = c.data === !0 ? "playback" : "live",
            null !== X && X.setPlaybackFlag(c.data);
            break;
        case "error":
            null !== A && A(c.data);
            break;
        case "MSEResolutionChanged":
            E(c.data);
            break;
        case "DecodeStart":
            var m = c.data.width - 0
              , n = c.data.height - 0;
            S.setAttribute("width", m),
            S.setAttribute("height", n),
            a.prototype.setLiveMode(c.data.decodeMode),
            B(c.data);
            break;
        case "ivsDraw":
            P = "canvas"
            var o = c.data.ivsDraw
              , q = c.data.channel;
            if ("canvas" === P && (void 0 === J || null === J))
                break;
            if ("canvas" !== P && (void 0 === fb || null === fb))
                break;
            var r = "canvas" === P ? J.timeStamp : fb;
            r = 1e3 * r.timestamp + r.timestamp_usec;
            var s = "canvas" === P ? r : r - parseInt(1e3 * X.getDuration());
            null !== G && (H.setCallback(G),
            H.draw(o, s, r, q));
            break;
        case "end":
            X && X.setRtspOver(),
            p && p.setRtspOver();
            break;
        default:
            debug.log("workerManager::videoWorker unknown data = " + c.data)
        }
    }
    function e(a) {
        var b = a.data;
        switch (b.type) {
        case "render":
            if (V === !0)
                break;
            rb !== b.codec && (null !== q && (sb = q.getVolume(),
            tb = q.getInitVideoTimeStamp(),
            q.terminate()),
            "AAC" === b.codec ? "edge" === I || "firefox" === I ? (q = null,
            null !== A && A({
                errorCode: 201
            })) : q = new AudioPlayerAAC : "safari" === I ? (q = null,
            null !== A && A({
                errorCode: 201
            })) : (q = new AudioPlayerGxx,
            q.setSamplingRate(b.samplingRate)),
            null !== q && (q.setInitVideoTimeStamp(tb),
            q.audioInit(sb) || (q = null)),
            rb = b.codec),
            null !== q && (null === J || "undefined" == typeof J ? q.bufferAudio(b.data, b.rtpTimeStamp, null) : q.bufferAudio(b.data, b.rtpTimeStamp, J.codecType))
        }
    }
    function f(a) {
        var b = a.data;
        switch (b.type) {
        case "rtpData":
            v(b.data)
        }
    }
    function g(a) {
        var b = {
            type: "getRtpData",
            data: a
        };
        n.postMessage(b)
    }
    function h(a) {
        null !== X && (X.close(),
        X = null),
        kb = a === !1 ? ib : Math.abs(jb),
        $.samples = new Array(kb),
        mb = !1,
        cb = 1,
        Z = null,
        _ = 0,
        bb = null,
        ab = 0
    }
    function i(a, b) {
        null !== a && null !== p && ("mjpeg" === J.codecType ? p.drawMJPEG(a, J.width, J.height, J.codecType, J.frameType, J.timeStamp, b) : (
          /*b.realWidth = Jb.width,
        b.realHeight = Jb.height, */
        p.draw(a, J.width, J.height, J.codecType, J.frameType, J.timeStamp)))
    }
    function j() {
        mb = !0,
        null === X ? (X = VideoMediaSource(o),
        X.setCodecInfo(db),
        X.setInitSegmentFunc(b),
        X.setVideoSizeCallback(c),
        X.setBeginDrawCallback(t),
        X.init(eb),
        X.setErrorCallback(A),
        X.setSpeedPlay(jb),
        X.setPlaybackFlag(W),
        X.setFPS(L)) : (X.getVideoElement(),
        X.setInitSegment()),
        X.setAudioStartCallback(k)
    }
    function k(a, b) {
        null !== q && q.setBufferingFlag(a, b)
    }
    var videoProcessWorker = null
      , audioProcessWorker = null
      , n = null
      , o = null
      , p = null
      , q = null
      , r = null
      , s = null
      , t = null
      , u = null
      , v = null
      , w = null
      , x = null
      , y = null
      , z = null
      , A = null
      , B = null
      , C = null
      , D = null
      , E = null
      , F = null
      , G = null
      , H = null
      , I = BrowserDetect()
      , J = null
      , K = null
      , L = 0
      , M = null
      , N = !1
      , O = !0
      , P = ""
      , Q = !0
      , R = !1
      , S = null
      , T = null
      , U = null
      , V = !1
      , W = !1
      , X = null
      , Y = null
      , Z = null
      , $ = {
        id: 1,
        samples: null,
        baseMediaDecodeTime: 0
    }
      , _ = 0
      , ab = 0
      , bb = null
      , cb = 1
      , db = ""
      , eb = null
      , fb = null
      , gb = 4
      , hb = 4
      , ib = "chrome" !== I ? hb : gb
      , jb = 1
      , kb = ib
      , lb = kb
      , mb = !1
      , nb = 0
      , ob = 0
      , pb = 0
      , qb = 1e3
      , rb = null
      , sb = 0
      , tb = 0
      , ub = 0
      , vb = 0
      , wb = 1e3
      , xb = null
      , yb = null
      , zb = null
      , Ab = 0
      , Bb = {
        type: "live",
        codec: "",
        width: 0,
        height: 0,
        isLimitSpeed: null
    }
      , Cb = !1
      , Db = null
      , Eb = null
      , Fb = null
      , Gb = !1
      , Hb = {
        5: "MJPEG",
        8: "H264",
        12: "H265"
    }
      , Ib = {
        1: 4e3,
        2: 8e3,
        3: 11025,
        4: 16e3,
        5: 2e4,
        6: 22050,
        7: 32e3,
        8: 44100,
        9: 48e3,
        10: 96e3,
        11: 128e3,
        12: 192e3,
        13: 64e3
    }
      , Jb = {
        width: 0,
        height: 0
    };
    a.prototype = {
        init(canvasElement, videoConfig, channelNumber, audioTalkEnabled) {
            Ab = channelNumber,
            S = canvasElement,
            eb = videoConfig,
            o.channel = channelNumber;
            window.navigator.userAgent;
            videoProcessWorker = new VideoWorker({ name: 'video' }),
            audioProcessWorker = new AudioWorker({ name: 'audio' }),
            videoProcessWorker.onmessage = d,
            audioProcessWorker.onmessage = e;
            var bufferSize = audioTalkEnabled === !0 ? 500 : 15;
            p = new StreamDrawer(Ab,this,S,bufferSize),
            H = IvsDraw(),
            p.setResizeCallback(s),
            yb = document.getElementById("count-fps"),
            xb = document.getElementById("span-fps")
        },
        async sendSdpInfo(a, b, c) {
            var sdpInfoMessage = {
                type: "sdpInfo",
                data: {
                    sdpInfo: a,
                    aacCodecInfo: b,
                    decodeMode: P,
                    govLength: M,
                    lessRateCanvas: Gb,
                    checkDelay: Q
                }
            };

            await Promise.all([
                new Promise((resolve) => {
                    const listener = (event) => {
                        if (event.data.type === "sdpInfoProcessed") {
                            debug.log("videoProcessWorker.sdpInfoProcessed");
                            videoProcessWorker.removeEventListener("message", listener);
                            resolve();
                        }
                    };
                    videoProcessWorker.addEventListener("message", listener);
                    videoProcessWorker.postMessage(sdpInfoMessage);
                }),
                new Promise((resolve) => {
                    const listener = (event) => {
                        if (event.data.type === "sdpInfoProcessed") {
                            debug.log("audioProcessWorker.sdpInfoProcessed");
                            audioProcessWorker.removeEventListener("message", listener);
                            resolve();
                        }
                    };
                    audioProcessWorker.addEventListener("message", listener);
                    audioProcessWorker.postMessage(sdpInfoMessage);
                }),
            ]);
            debug.log("sdpInfoProcessed");

            N = c;
            if (N)
                try {
                    window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext,
                    n = new Worker("./media/ump/Workers/audioTalkWorker.js"),
                    n.onmessage = f,
                    null === r && (r = new Talk,
                    r.init(),
                    r.setSendAudioTalkBufferCallback(g));
                    var e = r.initAudioOut();
                    n.postMessage(sdpInfoMessage),
                    sdpInfoMessage = {
                        type: "sampleRate",
                        data: e
                    },
                    // TODO: should wait for response here as well
                    n.postMessage(sdpInfoMessage)
                } catch (h) {
                    return N = !1,
                    void debug.error("Web Audio API is not supported in this web browser! : " + h)
                }
            rb = null,
            mb = !1,
            K = a
        },
        parseRTPData: function(a, b) {
            function c() {
                for (var a = b[22] + 24, c = 24; a > c; )
                    if (g == b[c]) {
                        if (c + 4 > a)
                            return debug.log("i: " + c),
                            -1;
                        N.width = b[c + 2] << 3,
                        N.height = b[c + 3] << 3,
                        Jb.width = N.width,
                        Jb.height = N.height,
                        c += 4
                    } else if (h == b[c]) {
                        if (c + 4 > b.length)
                            return debug.log("i: " + c),
                            -1;
                        N.I_frame_interval = b[c + 1],
                        N.encode_type = b[c + 2],
                        N.frame_rate = b[c + 3],
                        c += 4
                    } else if (i == b[c])
                        N.width = (b[c + 5] << 8) + b[c + 4],
                        N.height = (b[c + 7] << 8) + b[c + 6],
                        Jb.width = N.width,
                        Jb.height = N.height,
                        c += 8;
                    else if (j == b[c])
                        c += 4;
                    else if (p == b[c])
                        c += 8;
                    else if (k == b[c]) {
                        if (c + 4 > a)
                            return debug.log("i: " + c),
                            -1;
                        var d = (b[c + 2] << 8) + b[c + 3];
                        c += d
                    } else if (y == b[c])
                        N.h264_svc_flag = !0,
                        N.svc = b[c + 2],
                        c += 4;
                    else if (r == b[c])
                        c += 8;
                    else if (v == b[c])
                        c += 8;
                    else if (E == b[c]) {
                        var e = b[c + 1]
                          , f = b[c + 2];
                        c += 8,
                        c += e * f * 16
                    } else if (G == b[c])
                        c += 8;
                    else if (H == b[c])
                        c += 8;
                    else if (w == b[c])
                        c += 8;
                    else if (x == b[c])
                        c += 8;
                    else if (z == b[c])
                        c += 8;
                    else if (J <= b[c] && b[c] < K)
                        N.timeStampmsw = (b[c + 3] << 8) + b[c + 2],
                        c += 4;
                    else if (K <= b[c] && b[c] < L)
                        c += b[c + 1];
                    else if (n == b[c])
                        c += 4;
                    else if (q == b[c])
                        c += 4;
                    else if (s == b[c])
                        c += 4;
                    else if (u == b[c])
                        c += 8;
                    else if (B == b[c]) {
                        var e = b[c + 1];
                        c += 8,
                        c += 16 * e
                    } else if (C == b[c])
                        c += 4;
                    else {
                        if (I != b[c])
                            return debug.log("parseVideoInfo error ext_type:0x" + b[c]),
                            debug.log("i: " + c),
                            -1;
                        var a = (b[c + 5] << 8) + b[c + 4];
                        c += 8,
                        c += a
                    }
            }
            function d() {
                N.ChannelCount = 0;
                for (var a = b[22] + 24, c = 24; a > c; )
                    if (g == b[c])
                        c += 4;
                    else if (h == b[c])
                        c += 4;
                    else if (i == b[c])
                        c += 8;
                    else if (j == b[c])
                        c += 4;
                    else if (t == b[c])
                        c += b[c + 1];
                    else if (p == b[c])
                        c += 8;
                    else if (k == b[c]) {
                        var d = b[c + 2] << 8 + b[c + 3];
                        c += d
                    } else if (A == b[c])
                        N.ChannelCount = b[c + 1],
                        N.channel = b[c + 2],
                        c += 4;
                    else if (z == b[c])
                        c += 8;
                    else {
                        if (J != b[c])
                            return debug.log("parseAudioInfo error ext_type:0x" + b[c]),
                            debug.log("i: " + c),
                            -1;
                        N.timeStampmsw = (b[c + 3] << 8) + b[c + 2],
                        c += 4
                    }
                0 == N.ChannelCount && (N.ChannelCount = 1,
                N.channel = 0);
                for (var a = b[22] + 24, c = 24; a > c; )
                    if (b[c] == g)
                        c += 4;
                    else if (b[c] == h)
                        c += 4;
                    else if (b[c] == i)
                        c += 8;
                    else if (b[c] == j)
                        N.audio_type = b[c + 2],
                        N.samplingRate = Ib[b[c + 3]],
                        c += 4;
                    else if (b[c] == t)
                        c += b[c + 1];
                    else if (b[c] == p)
                        c += 8;
                    else if (b[c] == k) {
                        var d = b[c + 2] << 8 + b[c + 3];
                        c += d
                    } else if (b[c] == A)
                        c += 4;
                    else if (b[c] == z)
                        c += 8;
                    else {
                        if (J != b[c])
                            return debug.log("parseAudioInfo error ext_type:0x" + b[c]),
                            debug.log("i: " + c),
                            -1;
                        c += 4
                    }
            }
            function e() {}
            var f = b[4]
              , g = 128
              , h = 129
              , i = 130
              , j = 131
              , k = 132
              , n = 133
              , p = 136
              , q = 137
              , r = 138
              , s = 139
              , t = 140
              , u = 144
              , v = 145
              , w = 146
              , x = 147
              , y = 148
              , z = 149
              , A = 150
              , B = 151
              , C = 152
              , E = 153
              , G = 154
              , H = 155
              , I = 156
              , J = 160
              , K = 176
              , L = 255
              , M = {
                type: "MediaData",
                data: {
                    rtspInterleave: a,
                    payload: b
                },
                info: null,
                channel: o.channel
            }
              , N = {};
            if (253 == f || 254 == f || 252 == f || 251 == f) {
                if (c(),
                null != Db) {
                    if (Db != N.encode_type && void 0 !== N.encode_type)
                        return Db = N.encode_type,
                        void D(Hb[N.encode_type])
                } else
                    Db = N.encode_type;
                videoProcessWorker && (M.info = N,
                videoProcessWorker.postMessage(M))
            } else if (240 == f) {
                if (d(),
                null != Fb) {
                    if (Fb != N.audio_type)
                        return Fb = N.audio_type,
                        void F("audioType")
                } else
                    Fb = N.audio_type;
                if (null != Eb) {
                    if (Eb != N.samplingRate)
                        return Eb = N.samplingRate,
                        void F("samplingRate")
                } else
                    Eb = N.samplingRate;
                switch (N.audio_type + "") {
                case "10":
                case "14":
                case "26":
                case "27":
                case "28":
                case "29":
                case "30":
                    audioProcessWorker && (M.info = N,
                    audioProcessWorker.postMessage(M))
                }
            } else
                241 == f ? (e(),
                videoProcessWorker && (M.info = N,
                videoProcessWorker.postMessage(M))) : debug.log("mediaType:   " + f)
        },
        setCallback(eventName, callback) {
            switch (eventName) {
            case "timeStamp":
                u = callback;
                break;
            case "ResolutionChanged":
                s = callback,
                null !== p && p.setResizeCallback(s);
                break;
            case "audioTalk":
                v = callback;
                break;
            case "stepRequest":
                w = callback;
                break;
            case "metaEvent":
                x = callback;
                break;
            case "videoMode":
                y = callback;
                break;
            case "loadingBar":
                z = callback;
                break;
            case "Error":
                A = callback;
                break;
            case "PlayStart":
                t = callback,
                null !== p && p.setBeginDrawCallback(t);
                break;
            case "DecodeStart":
                B = callback;
                break;
            case "UpdateCanvas":
                C = callback,
                null !== p && p.setupdateCanvasCallback(C);
                break;
            case "FrameTypeChange":
                D = callback;
                break;
            case "MSEResolutionChanged":
                E = callback;
                break;
            case "audioChange":
                F = callback;
                break;
            case "WorkerReady":
                zb = callback;
                break;
            case "IvsDraw":
                G = callback;
                break;
            case "FileOver":
                this.fileOverCallback = callback;
                break;
            case "Waiting":
                this.waitingCallback = callback;
                break;
            default:
                debug.log(`workerManager::setCallback() : type "${eventName}" is unknown`)
            }
        },
        capture(filename) {
            if (p) p.capture(filename);
            if (X) X.capture(filename);
        },
        setDeviceInfo: function(a) {
            U = a.mode
        },
        setFPS: function(a) {
            var b = 30;
            L = 0 === a ? b : a,
            h(1 !== jb)
        },
        setGovLength: function(a) {
            M = a
        },
        setLiveMode(decodeMode) {
            null !== y && y(decodeMode);
            P = null === decodeMode ? "canvas" : decodeMode,
            "video" === P ? null !== p && p.renewCanvas() : "canvas" === P && h(!1)
        },
        setPlayMode: function(playMode) {
            W = playMode
        },
        controlAudio: function(audioCommand, audioValue) {
            console.log(q)
            switch (debug.log(audioCommand + " " + audioValue),
            audioCommand) {
            case "audioPlay":
                "start" === audioValue ? null !== q && q.play() : (sb = 0,
                null !== q && q.stop());
                break;
            case "volumn":
                sb = audioValue,
                null !== q && q.controlVolumn(audioValue);
                break;
            case "audioSamplingRate":
                null !== q && q.setSamplingRate(audioValue)
            }
        },
        controlAudioTalk: function(talkCommand, talkValue) {
            if (null !== r)
                switch (talkCommand) {
                case "onOff":
                    "on" === talkValue || r.stopAudioOut();
                    break;
                case "volumn":
                    r.controlVolumnOut(talkValue)
                }
        },
        reassignCanvas: function() {
            null !== p && p.reassignCanvas()
        },
        digitalZoom: function(zoomLevel) {
            null !== p && p.digitalZoom(zoomLevel)
        },
        playbackSpeed: function(speed) {
            jb = speed,
            p.setFrameInterval(jb)
        },
        timeStamp: function(timestamp) {
            C && C(timestamp)
        },
        initVideo: function(videoMode) {
            h(videoMode)
        },
        setFpsFrame: function(frameCount) {
            wb = frameCount,
            vb = 0,
            ub = 0
        },
        setCheckDelay: function(delayEnabled) {
            Q = delayEnabled
        },
        initStartTime: function() {
            var a = {
                type: "initStartTime"
            };
            videoProcessWorker.postMessage(a),
            p.stopRendering(),
            p.startRendering()
        },
        terminate: function() {
            "backup" !== U && (videoProcessWorker && (videoProcessWorker.terminate(),
            videoProcessWorker = null),
            audioProcessWorker && (audioProcessWorker.terminate(),
            audioProcessWorker = null)),
            n && n.terminate(),
            r && (r.terminate(),
            r = null),
            p && p.terminate(),
            q && q.terminate(),
            X && X.terminate(),
            zb && (zb = null),
            p = null,
            O = !0
        },
        postRtspOver: function() {
            videoProcessWorker.postMessage({
                type: "end"
            })
        },
        pause: function() {
            X && X.pause(),
            videoProcessWorker && p.pause()
        },
        play: function() {
            X && X.play(),
            videoProcessWorker && p.play()
        },
        setLessRate: function(lessRateEnabled) {
            Gb = lessRateEnabled
        }
    };
    return new a
};
