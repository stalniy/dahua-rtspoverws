import { videoEncoding, debug, decodeMode } from './public1.js';
import { default as loadFFMPEG } from './Decode/ffmpeg-core.js';

// import { loadFFMPEG } from './Decode/ffmpeg.js';

var videoRtpSessionsArray = []
  , sdpInfo = null
  , rtpSession = null
//   , decodeMode = ""
  , isBackupCommand = !1
  , isStepPlay = !1
//   , isForward = !0
  , framerate = 0
//   , backupFrameInfo = null
  , videoCHID = -1
  , h264Session = null
  , h265Session = null
  , mjpegSession = null
  , ivsSession = null
  , channelId = null
  , dropout = 1;

debug.log("video worker loaded");
sendMessage("WorkerReady")
addEventListener("message", receiveMessage, false);

function receiveMessage(message) {
    var payload = message.data;
    channelId = payload.channelId;
    switch (payload.type) {
    case "sdpInfo":
        sdpInfo = payload.data,
        framerate = 0,
        setVideoRtpSession(sdpInfo).then(() => {
            debug.log("video sdpInfo processed");
            sendMessage("sdpInfoProcessed")
        })
        break;
    case "MediaData":
        if (isStepPlay === !0) {
            buffering(payload);
            break
        }
        videoCHID = payload.data.rtspInterleave[1],
        "undefined" != typeof videoRtpSessionsArray[videoCHID] && videoRtpSessionsArray[videoCHID].parseRTPData(payload.data.rtspInterleave, payload.data.payload, isBackupCommand, dropout, payload.info, payload.channel);
        break;
    case "initStartTime":
        videoRtpSessionsArray[videoCHID].initStartTime();
        break;
    case "end":
        sendMessage("end")
    }
}
async function setVideoRtpSession(a) {
    videoRtpSessionsArray = [],
    isStepPlay = !1;
    for (let b = 0; b < a.sdpInfo.length; b++) {
        rtpSession = null;
        videoEncoding.setMode(a.decodeMode);

        if (a.sdpInfo[b].codecName === "H264") {
          if (h264Session === null) {
            const [ffmpeg, H264Session] = await Promise.all([
              loadFFMPEG(),
              import('./h264Session.js').then(m => m.H264Session)
            ]);
            h264Session = new H264Session(ffmpeg);
          }
          rtpSession = h264Session;
          rtpSession.init(a.decodeMode);
          rtpSession.setFramerate(a.sdpInfo[b].Framerate);
          rtpSession.setGovLength(a.govLength);
          rtpSession.setCheckDelay(a.checkDelay);
          rtpSession.setLessRate(a.lessRateCanvas);
        } else if (a.sdpInfo[b].codecName === "H265") {
          if (h265Session === null) {
            const [ffmpeg, H265Session] = await Promise.all([
              loadFFMPEG(),
              import('./h265Session.js').then(m => m.H265Session)
            ]);
            h265Session = new H265Session(ffmpeg);
          }
          rtpSession = h265Session;
          rtpSession.init();
          rtpSession.setFramerate(a.sdpInfo[b].Framerate);
          rtpSession.setGovLength(a.govLength);
          rtpSession.setCheckDelay(a.checkDelay);
        } else if (a.sdpInfo[b].codecName === "JPEG") {
          if (mjpegSession === null) {
            mjpegSession = await import('./mjpegSession.js').then(module => module.MjpegSession());
          }
          rtpSession = mjpegSession;
          rtpSession.init();
          rtpSession.setFramerate(a.sdpInfo[b].Framerate);
        } else if (a.sdpInfo[b].codecName === "stream-assist-frame") {
          debug.log(a.sdpInfo[b]);
          if (ivsSession === null) {
            ivsSession = await import('./ivsSession.js').then(module => module.IvsSession());
          }
          rtpSession = ivsSession;
          rtpSession.init();
        }

        if (typeof a.sdpInfo[b].Framerate !== "undefined") {
          framerate = a.sdpInfo[b].Framerate;
        }

        if (rtpSession !== null) {
          rtpSession.setBufferfullCallback(BufferFullCallback);
          rtpSession.setReturnCallback(RtpReturnCallback);
          videoCHID = a.sdpInfo[b].RtpInterlevedID;
          videoRtpSessionsArray[videoCHID] = rtpSession;
        }
    }
}
function buffering(a) {
    videoCHID = a.data.rtspInterleave[1],
    "undefined" != typeof videoRtpSessionsArray[videoCHID] && videoRtpSessionsArray[videoCHID].bufferingRtpData(a.data.rtspInterleave, a.data.header, a.data.payload)
}
function BufferFullCallback() {
    videoRtpSessionsArray[videoCHID].findCurrent(),
    sendMessage("stepPlay", "BufferFull")
}
function RtpReturnCallback(a) {
    var b = null
      , c = null;

    if (null === a || "undefined" == typeof a)
        return b = null,
        void (c = null);
    if ("undefined" != typeof a.error ? (sendMessage("error", a.error),
    b = a.decodedData) : (b = a.decodedData,
    null !== a.decodeMode && "undefined" != typeof a.decodeMode && (videoEncoding.setMode(a.decodeMode),
    sendMessage("setVideoTagMode", a.decodeMode))),
    null != a.decodeStart && (sendMessage("DecodeStart", a.decodeStart),
    videoEncoding.setMode(a.decodeStart.decodeMode)),
    null !== b && "undefined" != typeof b)
        if (void 0 !== b.frameData && null !== b.frameData && "canvas" === decodeMode) {
            b.frameData.firstFrame === !0 && sendMessage("firstFrame", b.frameData.firstFrame);
            var d = {
                bufferIdx: b.frameData.bufferIdx,
                width: b.frameData.width,
                height: b.frameData.height,
                codecType: b.frameData.codecType,
                frameType: b.frameData.frameType,
                timeStamp: null
            };
            null !== b.timeStamp && "undefined" != typeof b.timeStamp && (d.timeStamp = b.timeStamp),
            sendMessage("videoInfo", d),
            "undefined" != typeof b.frameData.data && null !== b.frameData.data &&
            sendMessage("canvasRender", b.frameData.data, b.frameData.option)
        } else if (null !== b.frameData && "video" === decodeMode) {
            null !== b.initSegmentData && (sendMessage("codecInfo", b.codecInfo),
            sendMessage("initSegment", b.initSegmentData));
            var d = {
                codecType: b.frameData.codecType
            };
            "undefined" != typeof b.frameData.width && (d.width = b.frameData.width,
            d.height = b.frameData.height),
            sendMessage("videoInfo", d),
            sendMessage("videoTimeStamp", b.timeStamp),
            b.frameData.length > 0 && (sendMessage("mediaSample", b.mediaSample),
            sendMessage("videoRender", b.frameData))
        } else
            sendMessage("drop", a.decodedData);
    null != a.resolution && sendMessage("MSEResolutionChanged", a.resolution),
    null != a.ivsDraw && sendMessage("ivsDraw", a)
}
function sendMessage(a, b, c) {
    var d = {
        type: a,
        data: b,
        channelId: channelId,
        option: c
    };
    "canvasRender" === a ? postMessage(d, [b.buffer]) : postMessage(d)
}
