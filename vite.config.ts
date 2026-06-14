import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 650,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@react-three/fiber')) {
              return 'r3f-vendor'
            }

            if (id.includes('@react-three/drei') || id.includes('three-stdlib')) {
              return 'drei-vendor'
            }

            if (id.includes('/three/') || id.includes('\\three\\')) {
              return 'three-core'
            }

            if (id.includes('/react/') || id.includes('\\react\\') || id.includes('react-dom')) {
              return 'react-vendor'
            }

            if (id.includes('/motion/') || id.includes('\\motion\\') || id.includes('/gsap/') || id.includes('\\gsap\\') || id.includes('/lenis/') || id.includes('\\lenis\\')) {
              return 'motion-vendor'
            }
          }
        },
      },
    },
  },
  plugins: [react(), tailwindcss()],
})
