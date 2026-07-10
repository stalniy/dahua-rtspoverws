import { defineConfig, loadEnv } from 'vite';
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
        host: '0.0.0.0',
        proxy: {
          // Shorthand for simple targets
          '/api/auth': env.VITE_AUTH_API_URL,
        }
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
        rollupOptions: {
          input: {
            dahua: resolve(__dirname, 'src/dahua-player.js'),
          },
          output: {
            format: 'es',
            entryFileNames: '[name].js',
          }
        },
      }),
    },
    define: {
      'process.env.CAMERA_IP': JSON.stringify(env.CAMERA_IP),
      'process.env.DEBUG': env.DEBUG === 'true',
      'process.env.FFMPEG_ENV': JSON.stringify('webworker'),
      'import.meta.env.VITE_AUTH_API_URL': JSON.stringify('/api/auth'),
    },
    worker: {
      format: 'es'
    },
  };
});
