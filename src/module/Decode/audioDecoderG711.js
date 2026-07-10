export class G711AudioDecoder {
  constructor(codecName) {
      this.codecName = codecName;
      this.muLawBias = 132;
      this.signBitMask = 128;
      this.quantizationMask = 15;
      this.segmentShift = 4;
      this.segmentMask = 112;
  }

  decodeMuLawSample(encodedByte) {
      var invertedByte = ~encodedByte;
      var decodedSample = ((invertedByte & this.quantizationMask) << 3) + this.muLawBias;

      decodedSample <<= (invertedByte & this.segmentMask) >> this.segmentShift;

      return invertedByte & this.signBitMask ? this.muLawBias - decodedSample : decodedSample - this.muLawBias;
  }

  decodeALawSample(encodedByte) {
      var toggledByte = encodedByte ^ 85;
      var decodedSample = (toggledByte & this.quantizationMask) << 4;
      var segment = (toggledByte & this.segmentMask) >> this.segmentShift;

      switch (segment) {
      case 0:
          decodedSample += 8;
          break;
      case 1:
          decodedSample += 264;
          break;
      default:
          decodedSample += 264;
          decodedSample <<= segment - 1;
      }

      return toggledByte & this.signBitMask ? decodedSample : -decodedSample;
  }

  decode(encodedBytes) {
      var inputBytes = new Uint8Array(encodedBytes);
      var pcmSamples = new Int16Array(inputBytes.length);

      for (var sampleIndex = 0; sampleIndex < inputBytes.length; sampleIndex++) {
          if (this.codecName === 'G.711A') {
              pcmSamples[sampleIndex] = this.decodeALawSample(inputBytes[sampleIndex]);
          } else if (this.codecName === 'G.711Mu') {
              pcmSamples[sampleIndex] = this.decodeMuLawSample(inputBytes[sampleIndex]);
          }
      }

      var normalizedSamples = new Float32Array(pcmSamples.length);

      for (var normalizedIndex = 0; normalizedIndex < pcmSamples.length; normalizedIndex++) {
          normalizedSamples[normalizedIndex] = pcmSamples[normalizedIndex] / Math.pow(2, 15);
      }

      return normalizedSamples;
  }
}
