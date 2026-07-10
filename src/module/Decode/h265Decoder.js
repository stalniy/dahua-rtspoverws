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
          var yLength = this.module._getYLength(framePointer);
          var frameHeight = this.module._getHeight(framePointer);

          if (!this.isFirstFrame()) {
              this.setIsFirstFrame(true);
              return {
                  firstFrame: true
              };
          }

          if (yLength <= 0 || frameHeight <= 0) {
              return;
          }

          return {
              data: new Uint8Array(this.outputBufferView),
              option: {
                  ylen: yLength,
                  height: frameHeight,
                  beforeDecoding: Date.now()
              },
              width: yLength,
              height: frameHeight,
              codecType: 'h265',
              decodingTime: decodingTime,
              frameType: frameType
          };
      } finally {
          this.module._FrameFree(framePointer);
      }
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
