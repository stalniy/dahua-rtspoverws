"use strict";
import { debug } from './debug';

function concatUint8Arrays(existingBytes, nextBytes) {
    var combinedBytes = new Uint8Array(existingBytes.byteLength + nextBytes.byteLength);

    combinedBytes.set(new Uint8Array(existingBytes), 0);
    combinedBytes.set(new Uint8Array(nextBytes), existingBytes.byteLength);

    return combinedBytes;
}

export class AudioPlayerAAC {
    constructor() {
        this.maxTimestampGap = 200;
        this.mimeType = null;
        this.mediaSource = null;
        this.audioElement = null;
        this.sourceBuffer = null;
        this.volume = 0;
        this.pendingBytes = new Uint8Array();
        this.lastTimestamp = 0;
        this.initialVideoTimestamp = 0;
        this.bufferingOffset = null;
        this.isRecoveringFromGap = false;
        this.recoveryByteOffsets = null;
        this.recoveryByteLength = 0;

        this.handleAudioError = this.handleAudioError.bind(this);
        this.handleSourceOpen = this.handleSourceOpen.bind(this);
        this.handleSourceUpdateEnd = this.handleSourceUpdateEnd.bind(this);
        this.handleSourceClose = this.handleSourceClose.bind(this);
        this.handleSourceEnded = this.handleSourceEnded.bind(this);
        this.handleSourceError = this.handleSourceError.bind(this);
        this.handleSourceAbort = this.handleSourceAbort.bind(this);
    }

    createAudioElement() {
        this.mimeType = 'audio/aac';
        this.audioElement = document.createElement('audio');
        this.audioElement.playsInline = true;
        this.audioElement.setAttribute('playsinline', '');
        this.audioElement.setAttribute('webkit-playsinline', '');
        this.audioElement.preload = 'auto';
        document.body.appendChild(this.audioElement);
        this.audioElement.addEventListener('error', this.handleAudioError);
    }

    createMediaSource() {
        if (!window.MediaSource) {
            debug.error('MediaSource API is not supported!');
            return false;
        }

        if (!window.MediaSource.isTypeSupported(this.mimeType)) {
            debug.error('Unsupported MIME type or codec: ', this.mimeType);
            return false;
        }

        this.mediaSource = new MediaSource();
        this.mediaSource.addEventListener('sourceopen', this.handleSourceOpen);
        this.mediaSource.addEventListener('sourceclose', this.handleSourceClose);
        this.mediaSource.addEventListener('sourceended', this.handleSourceEnded);
        this.mediaSource.addEventListener('error', this.handleSourceError);
        this.mediaSource.addEventListener('abort', this.handleSourceAbort);

        return true;
    }

    handleAudioError(event) {
        debug.error(event);

        switch (event.target.error.code) {
        case event.target.error.MEDIA_ERR_ABORTED:
            debug.error('audio tag error : You aborted the media playback.');
            break;
        case event.target.error.MEDIA_ERR_NETWORK:
            debug.error('audio tag error : A network error caused the media download to fail.');
            break;
        case event.target.error.MEDIA_ERR_DECODE:
            debug.error('audio tag error : The media playback was aborted due to a corruption problem or because the media used features your browser did not support.');
            break;
        case event.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
            debug.error('audio tag error : The media could not be loaded, either because the server or network failed or because the format is not supported.');
            break;
        default:
            debug.error('audio tag error : An unknown media error occurred.');
        }
    }

    handleSourceOpen() {
        debug.info('sourceopened');

        if (this.sourceBuffer !== null) {
            return;
        }

        try {
            this.sourceBuffer = this.mediaSource.addSourceBuffer(this.mimeType);
            this.sourceBuffer.addEventListener('updateend', this.handleSourceUpdateEnd);
        } catch (error) {
            debug.error('Exception calling addSourceBuffer : ' + error);
        }
    }

    handleSourceUpdateEnd() {
        if (this.audioElement && this.audioElement.paused) {
            this.audioElement.play().catch(() => {});
        }
    }

    handleSourceClose() {
        debug.info('sourceclose');
    }

    handleSourceEnded() {
        debug.info('sourceended');
    }

    handleSourceError() {
        debug.info('error');
    }

    handleSourceAbort() {
        debug.info('abort');
    }

    detachMediaSourceListeners() {
        if (this.mediaSource) {
            this.mediaSource.removeEventListener('sourceopen', this.handleSourceOpen);
            this.mediaSource.removeEventListener('sourceclose', this.handleSourceClose);
            this.mediaSource.removeEventListener('sourceended', this.handleSourceEnded);
            this.mediaSource.removeEventListener('error', this.handleSourceError);
            this.mediaSource.removeEventListener('abort', this.handleSourceAbort);
        }

        if (this.sourceBuffer) {
            this.sourceBuffer.removeEventListener('updateend', this.handleSourceUpdateEnd);
        }

        if (this.audioElement) {
            this.audioElement.removeEventListener('error', this.handleAudioError);
        }
    }

    flushPendingBytes() {
        if (!this.sourceBuffer || this.isRecoveringFromGap || this.sourceBuffer.updating) {
            return;
        }

        try {
            if (this.recoveryByteOffsets !== null) {
                this.appendRecoveredBytes();
            } else {
                this.sourceBuffer.appendBuffer(this.pendingBytes);
            }

            this.pendingBytes = new Uint8Array();
            this.recoveryByteOffsets = null;
            this.recoveryByteLength = 0;
        } catch (error) {}
    }

    appendRecoveredBytes() {
        if (this.bufferingOffset === null || !this.recoveryByteOffsets) {
            return;
        }

        var recoveredChunkCount = parseInt(this.recoveryByteOffsets.length / 16, 10);
        var playbackOffset = parseInt(this.bufferingOffset, 10);

        if (recoveredChunkCount - playbackOffset < 2) {
            return;
        }

        playbackOffset += 1;
        this.recoveryByteLength = parseInt(16 * playbackOffset, 10);

        if (this.recoveryByteLength < this.recoveryByteOffsets.length) {
            this.sourceBuffer.appendBuffer(this.pendingBytes.subarray(this.recoveryByteOffsets[this.recoveryByteLength], this.pendingBytes.length));

            if (this.sourceBuffer.buffered.length > 0 && this.audioElement) {
                this.audioElement.currentTime = this.sourceBuffer.buffered.end(0);
            }

            this.bufferingOffset = playbackOffset;
            return;
        }

        if (this.sourceBuffer.buffered.length > 0 && this.audioElement) {
            this.audioElement.currentTime = this.sourceBuffer.buffered.end(0) - 0.3;
        }

        this.bufferingOffset = playbackOffset;
    }

    audioInit(initialVolume) {
        this.createAudioElement();

        var didCreateMediaSource = this.createMediaSource();

        if (didCreateMediaSource && this.audioElement !== null) {
            this.audioElement.src = window.URL.createObjectURL(this.mediaSource);
            this.controlVolumn(initialVolume);
            this.audioElement.play().catch(() => {});
        }

        return didCreateMediaSource;
    }

    play() {
        this.controlVolumn(this.volume);
    }

    unlock() {
        if (this.audioElement) {
            this.audioElement.play().catch(() => {});
        }
    }

    stop() {
        if (this.audioElement) {
            this.audioElement.volume = 0;
        }

        this.volume = 0;
    }

    bufferAudio(audioBytes, timestamp) {
        var timestampDelta = this.lastTimestamp === 0 ? 0 : timestamp - this.lastTimestamp;

        if (this.lastTimestamp !== 0 && (timestampDelta > this.maxTimestampGap || timestampDelta < 0)) {
            this.pendingBytes = new Uint8Array();
            this.recoveryByteOffsets = [];
            this.isRecoveringFromGap = true;
            this.recoveryByteLength = 0;
        }

        if (this.isRecoveringFromGap && this.recoveryByteOffsets) {
            this.recoveryByteOffsets.push(this.recoveryByteLength);
            this.recoveryByteLength += audioBytes.length;
        }

        this.lastTimestamp = timestamp;
        this.pendingBytes = concatUint8Arrays(this.pendingBytes, audioBytes);
        this.flushPendingBytes();
    }

    controlVolumn(nextVolume) {
        this.volume = nextVolume;

        if (this.audioElement !== null) {
            this.audioElement.volume = nextVolume <= 0 ? 0 : nextVolume >= 1 ? 1 : nextVolume;

            if (nextVolume > 0 && this.audioElement.paused) {
                this.audioElement.play().catch(() => {});
            }
        }
    }

    getVolume() {
        return this.volume;
    }

    terminate() {
        if (this.mediaSource) {
            this.detachMediaSourceListeners();

            if (this.mediaSource.readyState === 'open' && this.sourceBuffer) {
                this.mediaSource.removeSourceBuffer(this.sourceBuffer);
                this.mediaSource.endOfStream();
            }
        }

        if (this.audioElement && this.audioElement.parentElement) {
            this.audioElement.parentElement.removeChild(this.audioElement);
        }

        this.sourceBuffer = null;
        this.mediaSource = null;
        this.audioElement = null;
    }

    setBufferingFlag(bufferingFlag, phase) {
        if (phase === 'init') {
            this.initialVideoTimestamp = bufferingFlag;
            return;
        }

        if (!this.isRecoveringFromGap) {
            return;
        }

        if (bufferingFlag === 0 || typeof bufferingFlag === 'undefined' || bufferingFlag === null) {
            this.bufferingOffset = null;
        } else {
            this.bufferingOffset = bufferingFlag - this.initialVideoTimestamp;
            this.initialVideoTimestamp = 0;
        }

        this.isRecoveringFromGap = false;
    }

    getBufferingFlag() {
        return this.isRecoveringFromGap;
    }

    setInitVideoTimeStamp(timestamp) {
        this.initialVideoTimestamp = timestamp;
    }

    getInitVideoTimeStamp() {
        return this.initialVideoTimestamp;
    }

    setSamplingRate() {}
}

export class AudioPlayerGxx {
    constructor() {
        this.sampleBufferPadding = 80000;
        this.maxTimestampGap = 200;
        this.codecClockRate = 8000;
        this.volumeScale = 1;
        this.audioContext = null;
        this.gainNode = null;
        this.filterNode = null;
        this.volume = 0;
        this.audioFormat = {
            type: 'G.711',
            samplingRate: this.codecClockRate,
            bitrate: '8000'
        };
        this.nextPlaybackTime = 0;
        this.isAudioContextRunning = false;
        this.lastTimestamp = 0;
        this.initialVideoTimestamp = 0;
        this.bufferingOffset = null;
        this.isRecoveringFromGap = false;
        this.sampleBuffer = new Float32Array(this.sampleBufferPadding);
        this.sampleBufferLength = 0;
        this.currentSource = null;
    }

    appendSamples(existingSamples, nextSamples, writeOffset) {
        var resizedSamples = existingSamples;

        if (writeOffset + nextSamples.length >= resizedSamples.length) {
            resizedSamples = new Float32Array(resizedSamples.length + this.sampleBufferPadding);
            resizedSamples.set(existingSamples, 0);
        }

        resizedSamples.set(nextSamples, writeOffset);

        return resizedSamples;
    }

    queueAudio(audioSamples, timestamp) {
        var timestampDelta = timestamp - this.lastTimestamp;

        if (timestampDelta > this.maxTimestampGap || timestampDelta < 0) {
            this.nextPlaybackTime = 0;
            this.sampleBufferLength = 0;
            this.isRecoveringFromGap = true;

            if (this.currentSource !== null) {
                this.currentSource.stop();
            }
        }

        if (this.nextPlaybackTime - this.audioContext.currentTime < 0) {
            this.nextPlaybackTime = 0;
        }

        this.lastTimestamp = timestamp;
        this.sampleBuffer = this.appendSamples(this.sampleBuffer, audioSamples, this.sampleBufferLength);
        this.sampleBufferLength += audioSamples.length;

        if (this.isRecoveringFromGap) {
            return;
        }

        var trimLength = 0;

        if (this.sampleBufferLength / audioSamples.length > 1) {
            if (this.bufferingOffset !== null) {
                trimLength = this.bufferingOffset * this.codecClockRate;
            }

            if (trimLength >= this.sampleBufferLength || this.bufferingOffset === null) {
                this.sampleBufferLength = 0;
                return;
            }
        }

        var audioBuffer = this.audioContext.createBuffer(1, this.sampleBufferLength - trimLength, this.audioFormat.samplingRate);

        audioBuffer.getChannelData(0).set(this.sampleBuffer.subarray(trimLength, this.sampleBufferLength));
        this.sampleBufferLength = 0;
        this.currentSource = this.audioContext.createBufferSource();
        this.currentSource.buffer = audioBuffer;
        this.currentSource.connect(this.filterNode);

        if (!this.nextPlaybackTime) {
            this.nextPlaybackTime = this.audioContext.currentTime + 0.1;
        }

        this.currentSource.start(this.nextPlaybackTime);
        this.nextPlaybackTime += audioBuffer.duration;
    }

    audioInit(initialVolume) {
        this.nextPlaybackTime = 0;

        if (this.audioContext !== null) {
            debug.info('Audio context already defined!');
            return true;
        }

        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext;
            this.audioContext = new AudioContext();
            this.audioContext.onstatechange = () => {
                debug.info('Audio Context State changed :: ' + this.audioContext.state);

                if (this.audioContext.state === 'running') {
                    this.isAudioContextRunning = true;
                }
            };
            this.gainNode = this.audioContext.createGain();
            this.filterNode = this.audioContext.createBiquadFilter();
            this.filterNode.connect(this.gainNode);
            this.filterNode.type = 'lowpass';
            this.filterNode.frequency.value = 4000;
            this.filterNode.gain.value = 40;
            this.gainNode.connect(this.audioContext.destination);
            this.controlVolumn(initialVolume);
            this.isAudioContextRunning = this.audioContext.state === 'running';

            return true;
        } catch (error) {
            debug.error('Web Audio API is not supported in this web browser! : ' + error);
            return false;
        }
    }

    play() {
        this.controlVolumn(this.volume);
    }

    unlock() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume().catch(() => {});
        }
    }

    stop() {
        this.volume = 0;

        if (this.gainNode) {
            this.gainNode.gain.value = 0;
        }

        this.nextPlaybackTime = 0;
    }

    bufferAudio(audioSamples, timestamp) {
        if (this.isAudioContextRunning) {
            this.queueAudio(audioSamples, timestamp);
        }
    }

    controlVolumn(nextVolume) {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume().catch(() => {});
        }

        this.volume = nextVolume;

        if (!this.gainNode) {
            return;
        }

        var normalizedVolume = nextVolume / this.volumeScale;

        if (normalizedVolume <= 0) {
            this.gainNode.gain.value = 0;
            this.nextPlaybackTime = 0;
            return;
        }

        this.gainNode.gain.value = normalizedVolume >= 1 ? 1 : normalizedVolume;
    }

    getVolume() {
        return this.volume;
    }

    terminate() {
        if (!this.audioContext || this.audioContext.state === 'closed') {
            return;
        }

        this.nextPlaybackTime = 0;
        this.isAudioContextRunning = false;
        this.audioContext.close();
    }

    setBufferingFlag(bufferingFlag, phase) {
        if (phase === 'init') {
            this.initialVideoTimestamp = bufferingFlag;
            return;
        }

        if (!this.isRecoveringFromGap) {
            return;
        }

        if (bufferingFlag === 0 || typeof bufferingFlag === 'undefined' || bufferingFlag === null) {
            this.bufferingOffset = null;
        } else {
            this.bufferingOffset = bufferingFlag - this.initialVideoTimestamp;
            this.initialVideoTimestamp = 0;
        }

        this.isRecoveringFromGap = false;
    }

    getBufferingFlag() {
        return this.isRecoveringFromGap;
    }

    setInitVideoTimeStamp(timestamp) {
        this.initialVideoTimestamp = timestamp;
    }

    getInitVideoTimeStamp() {
        return this.initialVideoTimestamp;
    }

    setSamplingRate(samplingRate) {
        this.audioFormat.samplingRate = samplingRate;
    }
}
