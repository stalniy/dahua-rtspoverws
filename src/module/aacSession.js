import { debug } from '../debug';
import { reconstructRtpTimestamp } from './public1.js';

export class AACSession {
  constructor() {
      this.adtsHeaderLength = 7;
      this.audioSpecificConfig = null;
      this.clockFrequency = null;
      this.bitrate = null;
      this.adtsHeaderBytes = new Uint8Array(this.adtsHeaderLength);
      this.firstTime = 0;
      this.lastMSW = 0;
      this.lastPacketMsw = null;
  }

  addAdtsHeader(frameLength, audioBytes) {
      var channelConfig = 1;

      if (typeof this.audioSpecificConfig !== 'string') {
          debug.log('wrong type of config in SDP');
          return;
      }

      var firstConfigByte = parseInt(this.audioSpecificConfig.substring(0, 2), 16);
      var secondConfigByte = parseInt(this.audioSpecificConfig.substring(2, 4), 16);
      var audioObjectType = firstConfigByte >> 3;
      var samplingFrequencyIndex = (7 & firstConfigByte) << 1 | (128 & secondConfigByte) >> 7;

      this.adtsHeaderBytes[0] = 255;
      this.adtsHeaderBytes[1] = 249;
      this.adtsHeaderBytes[2] = audioObjectType - 1 << 6;
      this.adtsHeaderBytes[2] |= samplingFrequencyIndex << 2;
      this.adtsHeaderBytes[2] |= channelConfig >> 2;
      this.adtsHeaderBytes[3] = channelConfig << 6;
      this.adtsHeaderBytes[3] |= (frameLength + 7 & 6144) >> 11;
      this.adtsHeaderBytes[4] = (frameLength + 7 & 2040) >> 3;
      this.adtsHeaderBytes[5] = (frameLength + 7 & 7) << 5;
      this.adtsHeaderBytes[5] |= 1;
      this.adtsHeaderBytes[6] = 84;

      var frameWithHeader = new Uint8Array(this.adtsHeaderBytes.length + audioBytes.length);
      frameWithHeader.set(this.adtsHeaderBytes, 0);
      frameWithHeader.set(audioBytes, this.adtsHeaderBytes.length);

      return frameWithHeader;
  }

  parseRTPData(_interleavedHeader, rtpPacket, includeStreamData) {
      var extensionLength = rtpPacket[22];
      var payloadLength = rtpPacket.length - 8 - (24 + extensionLength);
      var payloadBytes = rtpPacket.subarray(24 + extensionLength, rtpPacket.length - 8);
      var syncBytes = payloadBytes.subarray(0, 2);
      var nextTimestampState = reconstructRtpTimestamp(rtpPacket, {
          firstTime: this.firstTime,
          lastMSW: this.lastMSW,
          lastPacketMsw: this.lastPacketMsw
      });

      this.firstTime = nextTimestampState.firstTime;
      this.lastMSW = nextTimestampState.lastMSW;
      this.lastPacketMsw = nextTimestampState.lastPacketMsw;

      var rtpTimestamp = 1e3 * nextTimestampState.timestamp.timestamp + nextTimestampState.timestamp.timestamp_usec;
      var parsedFrame;

      if (syncBytes[0] === 255 && (240 & syncBytes[1]) === 240) {
          parsedFrame = {
              codec: 'AAC',
              bufferData: payloadBytes,
              rtpTimeStamp: rtpTimestamp
          };

          if (includeStreamData === true) {
              parsedFrame.streamData = payloadBytes.subarray(7, payloadBytes.length);
          }

          return parsedFrame;
      }

      var framedPayload = this.addAdtsHeader(payloadLength, payloadBytes);
      parsedFrame = {
          codec: 'AAC',
          bufferData: framedPayload,
          rtpTimeStamp: rtpTimestamp
      };

      if (includeStreamData === true) {
          parsedFrame.streamData = payloadBytes;
      }

      return parsedFrame;
  }

  setCodecInfo(codecInfo) {
      debug.log('Set codec info. for AAC');
      this.audioSpecificConfig = codecInfo.config;
      this.bitrate = codecInfo.bitrate;
      this.clockFrequency = codecInfo.clockFreq;
  }

  getCodecInfo() {
      return {
          bitrate: this.bitrate,
          clockFreq: this.clockFrequency
      };
  }
}
