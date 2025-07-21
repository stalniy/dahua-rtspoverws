import { debug } from '../debug.js';

debug.log("audio worker loaded")
addEventListener("message", receiveMessage, !1);

var audioRtpSessionsArray = []
  , sdpInfo = null
  , rtpSession = null
  , isBackupCommand = !1;

postMessage({ type: "WorkerReady" });

function receiveMessage(a) {
    var b = a.data;
    switch (b.type) {
    case "sdpInfo":
        sdpInfo = b.data.sdpInfo;
        var c = b.data.aacCodecInfo;
        setAudioRtpSession(sdpInfo, c).then(() => {
            debug.log("audio sdpInfo processed");
            postMessage({ type: "sdpInfoProcessed", hasAudioSession: !!rtpSession });
        });
        break;
    case "MediaData":
        var d = b.data.rtspInterleave[1];
        if ("undefined" != typeof audioRtpSessionsArray[d]) {
            var e = b.data
              , f = audioRtpSessionsArray[d].parseRTPData(e.rtspInterleave, e.payload, isBackupCommand, b.info);
            null !== f && "undefined" != typeof f && null !== f.streamData && "undefined" != typeof f.streamData && (f.streamData = null),
            sendMessage("render", f)
        }
    }
}
async function setAudioRtpSession(sdpInfo, b) {
    let G711Session, G726Session, AACSession;
    for (var c = sdpInfo, d = 0; d < sdpInfo.length; d++)
        if (-1 === c[d].trackID.search("trackID=t")) {
            switch (rtpSession = null,
            c[d].codecName) {
            case "G.711A":
            case "G.711Mu":
                G711Session = await import('./g711Session.js').then(m => m.G711Session);
                rtpSession = new G711Session(c[d].codecName);
                rtpSession.setCodecInfo(c[d]);
                break;
            case "G.726-16":
            case "G.726-24":
            case "G.726-32":
            case "G.726-40":
                var e = parseInt(c[d].codecName.substr(6, 2));
                debug.log(e);
                G726Session = await import('./g726Session.js').then(m => m.G726Session);
                rtpSession = new G726Session(e);
                break;
            case "mpeg4-generic":
                AACSession = await import('./aacSession.js').then(m => m.AACSession);
                rtpSession = new AACSession();
                debug.log("aacCodecInfo:  " + JSON.stringify(b)),
                rtpSession.setCodecInfo(b)
                break;
            }
            var f = c[d].RtpInterlevedID;
            if (audioRtpSessionsArray[f] = rtpSession,
            null != rtpSession)
                return
        }
}
function sendMessage(a, b) {
    var c = {
        type: a,
        codec: b.codec,
        data: b.bufferData,
        rtpTimeStamp: b.rtpTimeStamp,
        samplingRate: b.samplingRate || 8e3
    };
    if ("render" === a)
        postMessage(c, [b.bufferData.buffer]);
    else if ("backup" === a) {
        var d = {
            type: a,
            data: b
        };
        postMessage(d)
    } else
        postMessage(c)
}
