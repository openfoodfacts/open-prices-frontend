import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
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
    }
  },
]
