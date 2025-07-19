// import { H264Session } from './h264Session.js';
// import { H265Session } from './h265Session.js';
// import { IvsSession } from './ivsSession.js';
// import { MjpegSession } from './mjpegSession.js';
import { videoEncoding, debug, decodeMode } from './public1.js';

debug.log("video worker loaded")
sendMessage("WorkerReady");
addEventListener("message", receiveMessage, false);
var videoRtpSessionsArray = [],
    sdpInfo = null,
    rtpSession = null,
    isBackupCommand = !1,
    isStepPlay = !1,
    // isForward = !0,
    framerate = 0,
    // backupFrameInfo = null,
    videoCHID = -1,
    h264Session = null,
    h265Session = null,
    mjpegSession = null,
    ivsSession = null,
    channelId = null,
    dropout = 1;

let lockPromise = null;
function receiveMessage(a) {
    if (lockPromise) {
        return lockPromise.then(() => receiveMessage(a));
    }
    var b = a.data;
    switch (channelId = a.data.channelId, b.type) {
        case "sdpInfo":
            sdpInfo = b.data, framerate = 0;
            lockPromise = setVideoRtpSession(sdpInfo);
            break;
        case "MediaData":
            if (isStepPlay === !0) {
                buffering(b);
                break
            }
            videoCHID = b.data.rtspInterleave[1], "undefined" != typeof videoRtpSessionsArray[videoCHID] && videoRtpSessionsArray[videoCHID].parseRTPData(b.data.rtspInterleave, b.data.payload, isBackupCommand, dropout, b.info);
            break;
        case "initStartTime":
            videoRtpSessionsArray[videoCHID].initStartTime()
            break
        case "end":
            sendMessage("end")
            break
    }
}

async function setVideoRtpSession(a) {
    videoRtpSessionsArray = [];
    isStepPlay = !1;

    for (var b = 0; b < a.sdpInfo.length; b++) {
        rtpSession = null;
        videoEncoding.setMode(a.decodeMode);
        debug.log('SDP:', a.sdpInfo[b]);

        if ("H264" === a.sdpInfo[b].codecName) {
            if (null === h264Session) {
                h264Session = await import('./h264Session.js').then(module => module.H264Session());
            }
            rtpSession = h264Session;
            rtpSession.init(a.decodeMode);
            rtpSession.setFramerate(a.sdpInfo[b].Framerate);
            rtpSession.setGovLength(a.govLength);
            rtpSession.setCheckDelay(a.checkDelay);
        } else if ("H265" === a.sdpInfo[b].codecName) {
            if (null === h265Session) {
                h265Session = await import('./h265Session.js').then(module => module.H265Session());
            }
            rtpSession = h265Session;
            rtpSession.init();
            rtpSession.setFramerate(a.sdpInfo[b].Framerate);
            rtpSession.setGovLength(a.govLength);
            rtpSession.setCheckDelay(a.checkDelay);
        } else if ("JPEG" === a.sdpInfo[b].codecName) {
            if (null === mjpegSession) {
                mjpegSession = await import('./mjpegSession.js').then(module => module.MjpegSession());
            }
            rtpSession = mjpegSession;
            rtpSession.init();
            rtpSession.setFramerate(a.sdpInfo[b].Framerate);
        } else if ("stream-assist-frame" === a.sdpInfo[b].codecName) {
            if (null === ivsSession) {
                ivsSession = await import('./ivsSession.js').then(module => module.IvsSession());
            }
            rtpSession = ivsSession;
            rtpSession.init();
        }

        if ("undefined" != typeof a.sdpInfo[b].Framerate) {
            framerate = a.sdpInfo[b].Framerate;
        }

        if (null !== rtpSession) {
            rtpSession.setBufferfullCallback(BufferFullCallback);
            rtpSession.setReturnCallback(RtpReturnCallback);
            videoCHID = a.sdpInfo[b].RtpInterlevedID;
            videoRtpSessionsArray[videoCHID] = rtpSession;
        }
    }
}

function buffering(a) {
    videoCHID = a.data.rtspInterleave[1], "undefined" != typeof videoRtpSessionsArray[videoCHID] && videoRtpSessionsArray[videoCHID].bufferingRtpData(a.data.rtspInterleave, a.data.header, a.data.payload)
}

function BufferFullCallback() {
    videoRtpSessionsArray[videoCHID].findCurrent(), sendMessage("stepPlay", "BufferFull")
}

function RtpReturnCallback(a) {
    var b = null,
        c = null;
    if (null === a || "undefined" == typeof a) return b = null, void (c = null);
    if ("undefined" != typeof a.error ? (sendMessage("error", a.error), b = a.decodedData) : (b = a.decodedData, null !== a.decodeMode && "undefined" != typeof a.decodeMode && (videoEncoding.setMode(a.decodeMode), sendMessage("setVideoTagMode", a.decodeMode))), null !== b && "undefined" != typeof b)
        if (null !== b.frameData && "canvas" === decodeMode) {
            b.frameData.firstFrame === !0 && sendMessage("firstFrame", b.frameData.firstFrame);
            var d = {
                bufferIdx: b.frameData.bufferIdx,
                width: b.frameData.width,
                height: b.frameData.height,
                codecType: b.frameData.codecType,
                frameType: b.frameData.frameType,
                timeStamp: null
            };
            null !== b.timeStamp && "undefined" != typeof b.timeStamp && (d.timeStamp = b.timeStamp), sendMessage("videoInfo", d), "undefined" != typeof b.frameData.data && null !== b.frameData.data && sendMessage("canvasRender", b.frameData.data)
        } else if (null !== b.frameData && "video" === decodeMode) {
            null !== b.initSegmentData && (sendMessage("codecInfo", b.codecInfo), sendMessage("initSegment", b.initSegmentData));
            var d = {
                codecType: b.frameData.codecType
            };
            "undefined" != typeof b.frameData.width && (d.width = b.frameData.width, d.height = b.frameData.height), sendMessage("videoInfo", d), sendMessage("videoTimeStamp", b.timeStamp), b.frameData.length > 0 && (sendMessage("mediaSample", b.mediaSample), sendMessage("videoRender", b.frameData))
        } else sendMessage("drop", a.decodedData);
    null != a.resolution && sendMessage("MSEResolutionChanged", a.resolution), null != a.decodeStart && sendMessage("DecodeStart", a.decodeStart), null != a.ivsDraw && sendMessage("ivsDraw", a)
}

function sendMessage(a, b) {
    var c = {
        type: a,
        data: b,
        channelId: channelId
    };
    "canvasRender" === a ? postMessage(c, [b.buffer]) : postMessage(c)
}
