import { G711AudioDecoder } from './Decode/audioDecoderG711';
import { debug } from '../debug';
import { reconstructRtpTimestamp } from './public1.js';

export class G711Session {
  constructor(codecName) {
      this.codecName = codecName;
      this.decoder = new G711AudioDecoder(codecName);
      this.samplingRate = null;
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
      var parsedFrame = {
          codec: 'G711',
          bufferData: decodedSamples,
          rtpTimeStamp: 1e3 * nextTimestampState.timestamp.timestamp + nextTimestampState.timestamp.timestamp_usec,
          samplingRate: this.samplingRate
      };

      if (includeStreamData === true) {
          parsedFrame.streamData = payloadBytes;
      }

      return parsedFrame;
  }

  setCodecInfo(codecInfo) {
      debug.log('Set codec info. for G711');
      this.samplingRate = codecInfo.ClockFreq - 0;
  }
}
