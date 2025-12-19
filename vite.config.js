import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

export default defineConfig({
  css: {
    preprocessorOptions: {
      sass: {
        api: 'modern-compiler'
      }
    } 
  },
  optimizeDeps: {
    exclude: ['vuetify']
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // declare barcode-scanner webcomponent as custom element
          // See https://github.com/openfoodfacts/openfoodfacts-webcomponents for source
          isCustomElement: (tag) => tag === 'barcode-scanner'
        }
      }
    }),
    vuetify({
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    VueI18nPlugin({
      runtimeOnly: false,
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/i18n/locales/**'),
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
