import { defineConfig, minimalPreset as preset } from '@vite-pwa/assets-generator/config'

export default defineConfig({
  preset,
  images: [
    'public/mobile-game.svg',
    'public-dev/mobile-game.svg'
  ]
})