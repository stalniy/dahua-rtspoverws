import { debug } from '../../debug.js';

export class MJPEGDecoder {
  #isFirstIFrame = false;
  #width = 0;
  #height = 0;

  constructor() {
    debug.log("MJPEG Decoder");
  }

  setIsFirstFrame(isFirst) {
    this.#isFirstIFrame = isFirst;
  }

  isFirstFrame() {
    return this.#isFirstIFrame;
  }

  setResolution(width, height) {
    this.#width = width;
    this.#height = height;
  }

  decode(data) {
    if (!this.isFirstFrame()) {
      this.setIsFirstFrame(true);
      return {
        firstFrame: true
      };
    }

    return {
      data: data,
      width: this.#width,
      height: this.#height,
      codecType: "mjpeg"
    };
  }

  free() {
    // do nothing
  }

  close() {
    // do nothing
  }
}
