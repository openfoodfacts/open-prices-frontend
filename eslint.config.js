import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import vueI18n from '@intlify/eslint-plugin-vue-i18n'
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility'

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  ...vueI18n.configs['flat/recommended'],
  ...pluginVueA11y.configs['flat/recommended'],
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
      'vuejs-accessibility/anchor-has-content': 'warn'
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
  {
    files: ['src/i18n/locales/*.json', 'src/data/*/*.json'],
    rules: {
      'no-irregular-whitespace': 'off',
    },
  }
]
