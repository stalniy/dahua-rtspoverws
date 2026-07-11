import { debug } from '../../debug.js';

export class H265Decoder {
  constructor(Module) {
      this.module = Module;
      this.decoderHandle = Module._OpenDecoder(1, 0, 0);
      this.outputBufferSize = 0;
      this.outputBufferPointer = null;
      this.outputBufferView = new Uint8Array();
      this.firstFrameDecoded = false;
  }

  init() {
      debug.log('H265 Decoder init');
  }

  setOutputSize(outputSize) {
      var requiredBufferSize = 2 * outputSize;

      if (this.outputBufferSize === requiredBufferSize) {
          return;
      }

      this.free();
      this.outputBufferSize = requiredBufferSize;
      this.outputBufferPointer = this.module._malloc(requiredBufferSize);
      this.outputBufferView = new Uint8Array(this.module.HEAPU8.buffer, this.outputBufferPointer, requiredBufferSize);
  }

  decode(encodedFrame, frameType) {
      var decodeStartedAt = Date.now();
      var inputBytes = new Uint8Array(encodedFrame);

      this.outputBufferView.set(inputBytes);

      var framePointer = this.module._FrameAlloc();

      try {
          var decodeResult = this.module._DecodeFrame(
              this.decoderHandle,
              this.outputBufferView.byteOffset,
              encodedFrame.byteLength,
              this.outputBufferSize,
              framePointer
          );

          debug.log('decode result', decodeResult);

          var decodingTime = Date.now() - decodeStartedAt;
          var frameWidth = this.module._getWidth(framePointer);
          var yStride = this.module._getYLength(framePointer);
          var uStride = this.module._getULength(framePointer);
          var vStride = this.module._getVLength(framePointer);
          var frameHeight = this.module._getHeight(framePointer);
          var chromaHeight = Math.max(1, frameHeight >> 1);
          var totalLength = yStride * frameHeight + uStride * chromaHeight + vStride * chromaHeight;

          if (frameWidth <= 0 || yStride <= 0 || frameHeight <= 0 || totalLength <= 0) {
              return;
          }

          if (!this.isFirstFrame()) {
              this.setIsFirstFrame(true);
              return {
                  firstFrame: true,
                  width: frameWidth,
                  height: frameHeight,
                  codecType: 'h265',
                  frameType: frameType
              };
          }

          var compactPlaneData = this.copyFramePlanes(frameWidth, frameHeight, yStride, uStride, vStride);

          return {
              data: compactPlaneData.data,
              option: {
                  width: frameWidth,
                  ylen: compactPlaneData.ylen,
                  ulen: compactPlaneData.ulen,
                  vlen: compactPlaneData.vlen,
                  height: frameHeight,
                  beforeDecoding: Date.now()
              },
              width: frameWidth,
              height: frameHeight,
              codecType: 'h265',
              decodingTime: decodingTime,
              frameType: frameType
          };
      } finally {
          this.module._FrameFree(framePointer);
      }
  }

  copyFramePlanes(frameWidth, frameHeight, yStride, uStride, vStride) {
      var chromaHeight = Math.max(1, frameHeight >> 1);
      var chromaWidth = Math.max(1, frameWidth >> 1);
      var compactYLength = frameWidth * frameHeight;
      var compactULength = chromaWidth * chromaHeight;
      var compactVLength = chromaWidth * chromaHeight;
      var compactData = new Uint8Array(compactYLength + compactULength + compactVLength);
      var sourceOffset = 0;
      var targetOffset = 0;

      for (var row = 0; row < frameHeight; row++) {
          var sourceRowOffset = sourceOffset + row * yStride;
          compactData.set(this.outputBufferView.subarray(sourceRowOffset, sourceRowOffset + frameWidth), targetOffset);
          targetOffset += frameWidth;
      }

      sourceOffset += yStride * frameHeight;

      for (var row = 0; row < chromaHeight; row++) {
          var sourceRowOffset = sourceOffset + row * uStride;
          compactData.set(this.outputBufferView.subarray(sourceRowOffset, sourceRowOffset + chromaWidth), targetOffset);
          targetOffset += chromaWidth;
      }

      sourceOffset += uStride * chromaHeight;

      for (var row = 0; row < chromaHeight; row++) {
          var sourceRowOffset = sourceOffset + row * vStride;
          compactData.set(this.outputBufferView.subarray(sourceRowOffset, sourceRowOffset + chromaWidth), targetOffset);
          targetOffset += chromaWidth;
      }

      return {
          data: compactData,
          ylen: frameWidth,
          ulen: chromaWidth,
          vlen: chromaWidth
      };
  }

  setIsFirstFrame(isFirstFrame) {
      this.firstFrameDecoded = isFirstFrame;
  }

  isFirstFrame() {
      return this.firstFrameDecoded;
  }

  free() {
      if (this.outputBufferPointer) {
          this.module._free(this.outputBufferPointer);
          this.outputBufferPointer = null;
      }
  }

  close() {
      this.free();
      this.module._CloseDecoder(this.decoderHandle);
      this.decoderHandle = null;
  }
}
