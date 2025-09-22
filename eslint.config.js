import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import vueI18n from '@intlify/eslint-plugin-vue-i18n'

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  ...vueI18n.configs['flat/recommended'],
  {
    ignores: ['dist/**', '*.config.js', 'tests/**'],
  },
  {
    rules: {
      'no-unused-vars': 'warn',
      'vue/no-mutating-props': ['error', { 'shallowOnly': true }],
      'vue/no-reserved-component-names': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/attribute-hyphenation': 'off',
      'vue/v-on-event-hyphenation': 'off',
      // Disable raw text warnings for punctuation, symbols, file names, proper nouns, and specific cases
      '@intlify/vue-i18n/no-raw-text': ['warn', {
        ignoreNodes: ['v-icon'],
        ignorePattern: '^[\\s\\-\\(\\)\\[\\]\\{\\}\\/\\|⚠️]+$|^[0-9]+$|^[a-zA-Z\\-_\\.]+$|\\.jsonl\\.gz$|^[A-Z][a-z]+ [A-Z][a-z]+.*$|^⚠️.*$|data\\.gouv|Github|API',
      }],
    },
    settings: {
      'vue-i18n': {
        localeDir: './i18n/locales/*.json'
      }
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    }
  },
]
