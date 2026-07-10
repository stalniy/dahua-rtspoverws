import { debug, CommonAudioUtil } from '../public1.js';

var AUDIO_ENCODING_LINEAR = 3;
var PCM_SAMPLE_MASK = 65280;

function clampSigned16(sampleValue) {
  if (sampleValue > 32767) {
	  return 32767;
  }

  if (sampleValue < -32768) {
	  return -32768;
  }

  return sampleValue;
}

class G726BitrateDecoder {
  constructor(config) {
	  this.bitsPerCode = config.bitsPerCode;
	  this.codeMask = (1 << config.bitsPerCode) - 1;
	  this.reconstructSignMask = 1 << (config.bitsPerCode - 1);
	  this.reconstructionScaleTable = config.reconstructionScaleTable;
	  this.updateScaleTable = config.updateScaleTable;
	  this.speedControlTable = config.speedControlTable;
	  this.outputSampleTransform = config.outputSampleTransform;
	  this.outputLength = config.outputLength;
	  this.unpackCodes = config.unpackCodes;
	  this.audioUtil = new CommonAudioUtil();
	  this.state = this.audioUtil.g726InitState();
  }

  decodeCode(rawCode) {
	  var code = rawCode & this.codeMask;
	  var zeroPredictor = this.audioUtil.predictorZero(this.state);
	  var zeroPredictorHalf = zeroPredictor >> 1;
	  var predictedSignal = zeroPredictor + this.audioUtil.predictorPole(this.state);
	  var predictedSignalHalf = predictedSignal >> 1;
	  var stepSize = this.audioUtil.stepSize(this.state);
	  var reconstructedDifference = this.audioUtil.reconstruct(
		  code & this.reconstructSignMask,
		  this.reconstructionScaleTable[code],
		  stepSize
	  );
	  var reconstructedSample = reconstructedDifference < 0
		  ? predictedSignalHalf - (16383 & reconstructedDifference)
		  : predictedSignalHalf + reconstructedDifference;
	  var poleDifference = reconstructedSample - predictedSignalHalf + zeroPredictorHalf;

	  this.state = this.audioUtil.update(
		  this.bitsPerCode,
		  stepSize,
		  this.updateScaleTable[code],
		  this.speedControlTable[code],
		  reconstructedDifference,
		  reconstructedSample,
		  poleDifference,
		  this.state
	  );

	  if (AUDIO_ENCODING_LINEAR !== 3) {
		  return -1;
	  }

	  return this.outputSampleTransform(reconstructedSample);
  }

  decode(encodedBytes) {
	  var sampleCodes = new Uint8Array(encodedBytes);
	  var decodedSamples = new Int16Array(this.outputLength(sampleCodes.length));
	  var outputIndex = 0;

	  for (var byteOffset = 0; byteOffset < sampleCodes.length; byteOffset += 1) {
		  var unpackResult = this.unpackCodes(sampleCodes, byteOffset);

		  if (unpackResult === null) {
			  continue;
		  }

		  for (var codeIndex = 0; codeIndex < unpackResult.codes.length; codeIndex++) {
			  decodedSamples[outputIndex] = this.decodeCode(unpackResult.codes[codeIndex]) & PCM_SAMPLE_MASK;
			  outputIndex += 1;
		  }

		  byteOffset = unpackResult.nextOffset;
	  }

	  return decodedSamples;
  }
}

function unpackG72616Codes(inputBytes, byteOffset) {
  return {
	  codes: [
		  inputBytes[byteOffset] >> 6,
		  inputBytes[byteOffset] >> 4,
		  inputBytes[byteOffset] >> 2,
		  inputBytes[byteOffset]
	  ],
	  nextOffset: byteOffset
  };
}

function unpackG72624Codes(inputBytes, byteOffset) {
  if (byteOffset + 2 >= inputBytes.length) {
	  return null;
  }

  return {
	  codes: [
		  inputBytes[byteOffset] >> 5,
		  inputBytes[byteOffset] >> 2,
		  (inputBytes[byteOffset] << 1) | (inputBytes[byteOffset + 1] >> 7),
		  inputBytes[byteOffset + 1] >> 4,
		  inputBytes[byteOffset + 1] >> 1,
		  (inputBytes[byteOffset + 1] << 2) | (inputBytes[byteOffset + 2] >> 6),
		  inputBytes[byteOffset + 2] >> 3,
		  inputBytes[byteOffset + 2]
	  ],
	  nextOffset: byteOffset + 2
  };
}

function unpackG72632Codes(inputBytes, byteOffset) {
  return {
	  codes: [
		  (240 & inputBytes[byteOffset]) >> 4,
		  15 & inputBytes[byteOffset]
	  ],
	  nextOffset: byteOffset
  };
}

function unpackG72640Codes(inputBytes, byteOffset) {
  if (byteOffset + 4 >= inputBytes.length) {
	  return null;
  }

  return {
	  codes: [
		  inputBytes[byteOffset] >> 3,
		  (inputBytes[byteOffset] << 2) | (inputBytes[byteOffset + 1] >> 6),
		  inputBytes[byteOffset + 1] >> 1,
		  (inputBytes[byteOffset + 1] << 4) | (inputBytes[byteOffset + 2] >> 4),
		  (inputBytes[byteOffset + 2] << 1) | (inputBytes[byteOffset + 3] >> 7),
		  inputBytes[byteOffset + 3] >> 2,
		  (inputBytes[byteOffset + 3] << 3) | (inputBytes[byteOffset + 4] >> 5),
		  inputBytes[byteOffset + 4]
	  ],
	  nextOffset: byteOffset + 4
  };
}

function createG72616Decoder() {
  return new G726BitrateDecoder({
	  bitsPerCode: 2,
	  reconstructionScaleTable: [116, 365, 365, 116],
	  updateScaleTable: [-704, 14048, 14048, -704],
	  speedControlTable: [0, 3584, 3584, 0],
	  outputSampleTransform: function(sampleValue) {
		  return sampleValue << 2;
	  },
	  outputLength: function(byteLength) {
		  return 4 * byteLength;
	  },
	  unpackCodes: unpackG72616Codes
  });
}

function createG72624Decoder() {
  return new G726BitrateDecoder({
	  bitsPerCode: 3,
	  reconstructionScaleTable: [-2048, 135, 273, 373, 373, 273, 135, -2048],
	  updateScaleTable: [-128, 960, 4384, 18624, 18624, 4384, 960, -128],
	  speedControlTable: [0, 512, 1024, 3584, 3584, 1024, 512, 0],
	  outputSampleTransform: function(sampleValue) {
		  return sampleValue << 2;
	  },
	  outputLength: function(byteLength) {
		  return Math.floor(8 * byteLength / 3);
	  },
	  unpackCodes: unpackG72624Codes
  });
}

function createG72632Decoder() {
  return new G726BitrateDecoder({
	  bitsPerCode: 4,
	  reconstructionScaleTable: [
		  -2048, 4, 135, 213, 273, 323, 373, 425,
		  425, 373, 323, 273, 213, 135, 4, -2048
	  ],
	  updateScaleTable: [-12, 18, 41, 64, 112, 198, 355, 1122, 1122, 355, 198, 112, 64, 41, 18, -12],
	  speedControlTable: [0, 0, 0, 512, 512, 512, 1536, 3584, 3584, 1536, 512, 512, 512, 0, 0, 0],
	  outputSampleTransform: function(sampleValue) {
		  return clampSigned16(sampleValue << 2);
	  },
	  outputLength: function(byteLength) {
		  return 2 * byteLength;
	  },
	  unpackCodes: unpackG72632Codes
  });
}

function createG72640Decoder() {
  return new G726BitrateDecoder({
	  bitsPerCode: 5,
	  reconstructionScaleTable: [
		  -2048, -66, 28, 104, 169, 224, 274, 318,
		  358, 395, 429, 459, 488, 514, 539, 566,
		  566, 539, 514, 488, 459, 429, 395, 358,
		  318, 274, 224, 169, 104, 28, -66, -2048
	  ],
	  updateScaleTable: [
		  448, 448, 768, 1248, 1280, 1312, 1856, 3200,
		  4512, 5728, 7008, 8960, 11456, 14080, 16928, 22272,
		  22272, 16928, 14080, 11456, 8960, 7008, 5728, 4512,
		  3200, 1856, 1312, 1280, 1248, 768, 448, 448
	  ],
	  speedControlTable: [
		  0, 0, 0, 0, 0, 512, 512, 512,
		  512, 512, 1024, 1536, 2048, 2560, 3072, 3072,
		  3072, 3072, 2560, 2048, 1536, 1024, 512, 512,
		  512, 512, 512, 0, 0, 0, 0, 0
	  ],
	  outputSampleTransform: function(sampleValue) {
		  return sampleValue << 2;
	  },
	  outputLength: function(byteLength) {
		  return Math.floor(8 * byteLength / 5);
	  },
	  unpackCodes: unpackG72640Codes
  });
}

export class G726xAudioDecoder {
  constructor(bitrate) {
	  this.bitrate = bitrate;
	  this.decoder = null;

	  switch (bitrate) {
	  case 16:
		  this.decoder = createG72616Decoder();
		  break;
	  case 24:
		  this.decoder = createG72624Decoder();
		  break;
	  case 32:
		  this.decoder = createG72632Decoder();
		  break;
	  case 40:
		  this.decoder = createG72640Decoder();
		  break;
	  default:
		  debug.log('wrong bits');
	  }
  }

  decode(encodedBytes) {
	  if (!this.decoder) {
		  return new Int16Array();
	  }

	  return this.decoder.decode(encodedBytes);
  }
}
