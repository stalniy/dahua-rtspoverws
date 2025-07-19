import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => {
  const isProduction = command === 'build';
  const env = loadEnv(mode, process.cwd(), '');
  console.log(env.DEBUG, "debug");

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
      minify: false,
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
      })
    },
    define: {
      'process.env.CAMERA_IP': JSON.stringify(env.CAMERA_IP),
      'process.env.DEBUG': env.DEBUG === 'true'
    },
    worker: {
      format: 'es'
    }
    // plugins: [
    //   viteStaticCopy({
    //     targets: [
    //     {
    //       src: resolve(__dirname, 'src/module') + '/[!.]*',
    //       dest: './module',
    //     },
    //     ],
    //   }),
    // ]
  };
});
