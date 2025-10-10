import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Use local source for development; consumers will use the published package
      '@luwy-dyro/ui': path.resolve(__dirname, '../../packages/ui'),
      '@luwy-dyro/tokens': path.resolve(__dirname, '../../packages/tokens')
    }
  }
})
