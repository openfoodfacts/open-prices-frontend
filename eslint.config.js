import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import vueI18n from "@intlify/eslint-plugin-vue-i18n";
import pluginVueA11y from "eslint-plugin-vuejs-accessibility";
import prettierConfig from "eslint-config-prettier";

export default [
  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  ...vueI18n.configs["flat/recommended"],
  ...pluginVueA11y.configs["flat/recommended"],
  {
    ignores: ["dist/**", "*.config.js", "tests/**"],
  },
  {
    rules: {
      "no-unused-vars": "warn",
      "vue/no-mutating-props": ["error", { shallowOnly: true }],
      "vue/no-reserved-component-names": "off",
      "vue/multi-word-component-names": "off",
      "vue/max-attributes-per-line": "off",
      "vue/attribute-hyphenation": "off",
      "vue/v-on-event-hyphenation": "off",
      "vuejs-accessibility/anchor-has-content": "warn",
      "@intlify/vue-i18n/no-raw-text": [
        "warn",
        {
          // punctuation & symbols only (separators, parentheses, arrows...)
          ignorePattern: "^[\\p{P}\\p{S}\\s]+$",
          // proper nouns & file names (not translatable)
          ignoreText: [
            "API",
            "Github",
            "Hugging Face",
            "data.gouv",
            "Open Food Facts Slack (#prices)",
            "prices.jsonl.gz",
            "proofs.jsonl.gz",
            "locations.jsonl.gz",
          ],
        },
      ],
    },
    settings: {
      "vue-i18n": {
        localeDir: "./src/i18n/locales/*.json",
        messageSyntaxVersion: "^9.0.0",
      },
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  {
    files: ["src/i18n/locales/*.json", "src/data/**/*.json"],
    rules: {
      "no-irregular-whitespace": "off",
    },
  },
  // must be last: turns off rules that conflict with Prettier (formatting is handled by Prettier)
  prettierConfig,
];
