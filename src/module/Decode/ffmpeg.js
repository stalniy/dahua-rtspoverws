import { debug } from '../../debug.js';

let loadingPromise = null;
export function loadFFMPEG() {
  loadingPromise ??= new Promise((resolve, reject) => {
    globalThis.Module = {
      onRuntimeInitialized() {
        console.log('register all codecs')
        Module._RegisterAll();
        resolve(Module)
      },
      locateFile(path) {
        const baseUrl = import.meta.env.BASE_URL;
        if (baseUrl.endsWith('/')) {
          return `${baseUrl}${path}`;
        } else {
          return `${baseUrl}/${path}`;
        }
      }
    };

    const start = performance.now();
    debug.log('loading ffmpegasm.js');
    import('./ffmpegasm.js')
      .then(m => {
        debug.log(`ffmpegasm.js loaded in ${performance.now() - start}ms`);
        return m.Module;
      }).catch(reject);
  });

  return loadingPromise;
}
