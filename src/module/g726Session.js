import { G726xAudioDecoder } from './Decode/audioDecoderG726x';
import { debug } from '../debug';
import { reconstructRtpTimestamp } from './public1.js';

export class G726Session {
  constructor(bitrate) {
	  this.bitrate = bitrate;
	  this.decoder = new G726xAudioDecoder(bitrate);
	  this.firstTime = 0;
	  this.lastMSW = 0;
	  this.lastPacketMsw = null;
  }

  parseRTPData(_interleavedHeader, rtpPacket, includeStreamData) {
	  var extensionLength = rtpPacket[22];
	  var payloadBytes = rtpPacket.subarray(24 + extensionLength, rtpPacket.length - 8);
	  var nextTimestampState = reconstructRtpTimestamp(rtpPacket, {
		  firstTime: this.firstTime,
		  lastMSW: this.lastMSW,
		  lastPacketMsw: this.lastPacketMsw
	  });

	  this.firstTime = nextTimestampState.firstTime;
	  this.lastMSW = nextTimestampState.lastMSW;
	  this.lastPacketMsw = nextTimestampState.lastPacketMsw;

	  var decodedSamples = this.decoder.decode(payloadBytes);
	  var normalizedSamples = new Float32Array(decodedSamples.length);

	  for (var sampleIndex = 0; sampleIndex < decodedSamples.length; sampleIndex++) {
		  normalizedSamples[sampleIndex] = decodedSamples[sampleIndex] / Math.pow(2, 15);
	  }

	  var parsedFrame = {
		  codec: 'G726',
		  bufferData: normalizedSamples,
		  rtpTimeStamp: 1e3 * nextTimestampState.timestamp.timestamp + nextTimestampState.timestamp.timestamp_usec
	  };

	  if (includeStreamData === true) {
		  parsedFrame.bitrate = this.bitrate;
		  parsedFrame.streamData = payloadBytes;
	  }

	  return parsedFrame;
  }

  setCodecInfo() {
	  debug.log('Set codec info. for G726');
  }
}
