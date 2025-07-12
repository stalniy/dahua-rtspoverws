import { defineConfig, loadEnv } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
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
          entry: resolve(__dirname, 'src/PlayerControl.js'),
          fileName: 'dahua',
          name: 'Dahua',
          formats: ['es']
        }
      })
    },
    define: {
      'process.env.CAMERA_IP': JSON.stringify(env.CAMERA_IP)
    },
    plugins: [
      viteStaticCopy({
        targets: [
        {
          src: resolve(__dirname, 'src/module') + '/[!.]*', 
          dest: './module',
        },
        ],
      }),
    ]
  };
});