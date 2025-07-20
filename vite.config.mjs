import { defineConfig, loadEnv } from 'vite';
import {viteStaticCopy} from 'vite-plugin-static-copy';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => {
  const isProduction = command === 'build';
  const env = loadEnv(mode, process.cwd(), '');

  return {
    root: 'src',
    // For dev server, use index.html as entry point
    ...(!isProduction && {
      // Explicitly set development entry point (optional)
      server: {
        open: true,
        host: '0.0.0.0'
      }
    }),
    build: {
      target: "esnext",
      minify: true,
      outDir: '../dist',
      sourcemap: true,
      emptyOutDir: true,

      // Only use lib config for production builds
      ...(isProduction && {
        lib: {
          entry: resolve(__dirname, 'src/dahua-player.js'),
          fileName: 'dahua',
          name: 'Dahua',
          formats: ['es']
        }
      }),
    },
    define: {
      'process.env.CAMERA_IP': JSON.stringify(env.CAMERA_IP),
      'process.env.DEBUG': env.DEBUG === 'true',
      'process.env.FFMPEG_ENV': JSON.stringify('webworker')
    },
    worker: {
      format: 'es'
    },
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: resolve(__dirname, 'src/module/Decode/ffmpegasm.js.mem'),
            dest: '.',
          },
        ],
      }),
    ]
  };
});
