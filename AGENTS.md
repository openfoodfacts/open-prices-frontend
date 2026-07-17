# AI Agent Instructions for Open Prices Frontend

Welcome to the `open-prices-frontend` repository! As an AI coding assistant, please follow these guidelines when reading, writing, or refactoring code in this project.

## 1. Project Context
- **Purpose**: A Vue.js frontend for crowdsourcing Open Prices (Open Food Facts ecosystem).
- **Server**: Interacts with the Open Prices server API (https://prices.openfoodfacts.org/api/docs).
- **License/Data**: OdBL license.

## 2. Tech Stack & Architecture
- **Framework**: [Vue 3](https://vuejs.org/) using the Composition API (`<script setup>`).
- **Build Tool**: [Vite](https://vitejs.dev/).
- **State Management**: [Pinia](https://pinia.vuejs.org/) (with `pinia-plugin-persistedstate`).
- **Routing**: [Vue Router](https://router.vuejs.org/).
- **UI Framework**: [Vuetify](https://vuetifyjs.com/).
- **Testing**: Cypress for E2E testing.
- **Package Manager**: `yarn`.

## 3. Strict Boundary Rules ("Never Touch")
Do **NOT** modify the following files or directories:
- **`yarn.lock`**: Never hand-edit this file. **DO NOT use `npm`**. Always use `yarn install` or `yarn add`.
- **Build Outputs**: Do not touch generated files in `/dist` or similar output directories.
- **CI/CD Configs**: Do not modify files in `circle.yml`, `.github/workflows`, or `.husky` without explicit user permission.
- **Locale Files**: Do not manually translate or edit locale files in `src/i18n/locales/` **except** for `en.json`. All other languages are managed by Crowdin and will be overwritten.

## 4. Component & Code Conventions

### Code Examples Over Prose
Always prefer the Composition API (`<script setup>`), Vuetify components, and the `$t` function for internationalization.

**Example 1: Basic Component Structure**
```vue
<template>
  <v-card class="ma-4">
    <!-- Always use $t for user-facing strings -->
    <v-card-title>{{ $t('components.product_card.title') }}</v-card-title>
    <v-card-text>
      <!-- Use Vuetify components instead of raw HTML when possible -->
      <v-btn color="primary" @click="handleAction">{{ $t('actions.submit') }}</v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
// Do not mutate Vue props!
const props = defineProps({ item: Object })
const handleAction = () => { /* logic */ }
</script>
```

**Example 2: API Calls & State Management**
Extract API logic to `/src/services` and keep global state in Pinia (`/src/store.js`). Use local `ref` for UI-only state (e.g., loading spinners, dialog open/close).

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/store' // Example store import
import api from '@/services/api' // Example service import

const store = useAppStore()
const isLoading = ref(false) // Local state for UI only

onMounted(async () => {
  isLoading.value = true
  try {
    const data = await api.fetchPrices()
    store.setPrices(data) // Global state goes in Pinia
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
})
</script>
```

### Directory Structure
- `/src/components`: Reusable Vue UI components (e.g., `PriceCard.vue`).
- `/src/views`: Page-level components corresponding to routes (e.g., `Home.vue`).
- `/src/services`: Modules for API interactions.
- `/src/store.js`: Pinia state management setup.

### Style & Accessibility
- **A11y**: The project enforces `eslint-plugin-vuejs-accessibility`. Always include proper ARIA labels, `alt` tags on images, and valid anchor tags (`href`).
- **Vuetify**: Use built-in Vuetify utility classes (e.g., `ma-4`, `d-flex`) instead of writing custom CSS whenever possible.

## 5. Testing Guidance (Cypress)
- **Location**: All Cypress E2E tests live in `/tests/e2e/`.
- **When to add tests**: Add a new E2E test when introducing a new view, a critical user flow (like adding a price), or a complex reusable component. For bug fixes, verify if an existing test covers the flow or add an assertion to an existing test.
- **Command**: Run tests locally using `yarn test:run`.

## 6. Commit & PR Conventions
- **Branch Naming**: Use descriptive branch names (e.g., `feat/add-barcode-scanner`, `fix/price-display-bug`).
- **Commit Messages**: Follow [Conventional Commits](https://www.conventionalcommits.org/). **CRITICAL**: This repo uses `release-please` for automated versioning. Your commit prefix directly drives the release pipeline and version bumps!
  - `feat: [description]` for new features (triggers Minor release).
  - `fix: [description]` for bug fixes (triggers Patch release).
  - `chore: [description]` for dependency updates or routine tasks.
  - `docs: [description]` for documentation changes.
- **Linting**: Your code must pass `yarn lint` with 0 warnings (`--max-warnings=0`) before committing. Pre-commit hooks will reject the commit otherwise.

## 7. Common Commands (Yarn)
- **Development**: `yarn dev` (local backend) or `yarn dev --mode staging` (staging backend).
- **Build**: `yarn build` / `yarn build-staging`
- **Linting**: `yarn lint:fix` (auto-fixes most style issues).
