# Open Prices Frontend

Open Prices Frontend is a Vue.js 3 web application for adding and viewing prices in the Open Prices crowdsourced database. It connects to the Open Prices backend API and provides an interface for users to contribute price data from receipts and price tags.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap and Build
- Install dependencies: `yarn install` (5 seconds)
  - **KNOWN ISSUE**: Cypress binary download fails in restricted environments due to blocked CDNs (`download.cypress.io`, `cdn.cypress.io`). Use `CYPRESS_INSTALL_BINARY=0 yarn install` to skip Cypress binary installation.
- Build for development: `yarn build` -- takes 50 seconds. NEVER CANCEL. Set timeout to 90+ minutes.
- Build for staging: `yarn build-staging` -- takes 50 seconds. NEVER CANCEL. Set timeout to 90+ minutes.  
- Build for production: `yarn build-prod` -- takes 50 seconds. NEVER CANCEL. Set timeout to 90+ minutes.

### Development Server
- Start development server: `yarn dev`
  - Runs on http://localhost:5173/
  - Shows "development environment (local)" banner
  - Connects to backend at http://127.0.0.1:8000/api/v1/
  - **EXPECTED BEHAVIOR**: API calls will fail with connection refused errors if backend is not running

### Linting and Code Quality
- Run linting: `yarn lint` (13 seconds)
  - **EXPECTED BEHAVIOR**: Currently has 23 linting errors and 38 warnings due to irregular whitespace in localization files and Vue i18n violations
  - **KNOWN ISSUES**: 
    - Irregular whitespace errors in translation files (km.json, my.json, fr.json, oc.json, etc.)
    - Raw text usage warnings from @intlify/vue-i18n plugin
    - Vue template parsing error in ProofChip.vue
  - Fix auto-fixable issues: `yarn lint:fix`

### Testing
- Run end-to-end tests: `yarn test` (uses start-server-and-test + Cypress)
  - **KNOWN LIMITATION**: E2E tests fail in environments where Cypress binary cannot be downloaded (requires `download.cypress.io` and `cdn.cypress.io` to be accessible)
  - **WORKAROUND**: Install Cypress separately if needed: `npx cypress install`
  - Uses mocked API responses from tests/fixtures/ 

## Validation
- Always manually validate changes by running the development server and navigating through key user flows
- **CRITICAL VALIDATION SCENARIOS**:
  - Home page loads with navigation and stats cards
  - Navigate to "Contribute" page - should show "From a price tag" and "From a receipt" options  
  - Navigate to "Latest prices" page - will show loading spinner if backend not available
  - Test responsive design on mobile/desktop viewports
- Always run `yarn lint` before committing (CI will fail on lint errors)
- ALWAYS run through at least one complete end-to-end scenario after making changes

## Backend Dependencies
- **CRITICAL**: Frontend requires Open Prices backend API running on http://127.0.0.1:8000/
- Backend repository: https://github.com/openfoodfacts/open-prices
- **EXPECTED BEHAVIOR WITHOUT BACKEND**: 
  - Static pages (Home, Contribute, About, etc.) work normally
  - Data-dependent pages (Latest prices, Search) show loading spinners
  - Console shows connection refused errors (this is expected)

## Environment Configuration
- **Local development**: Uses `.env.local` (http://127.0.0.1:8000)
- **Staging**: Uses `.env.staging` (https://prices.openfoodfacts.net)  
- **Production**: Uses `.env.prod` (https://prices.openfoodfacts.org)
- Environment variables control API URLs, locales, and default country/currency

## Architecture Overview
- **Framework**: Vue.js 3 with Composition API
- **Build tool**: Vite
- **UI framework**: Vuetify 3 (Material Design)
- **Routing**: Vue Router
- **State management**: Pinia with persisted state
- **Internationalization**: Vue I18n (90+ languages supported)
- **Maps**: Leaflet with Vue-Leaflet
- **Charts**: Vega-Lite embedded charts
- **Testing**: Cypress for E2E tests
- **Barcode scanning**: html5-qrcode + Open Food Facts web components

## Key Code Locations

### Core Application Files
- `src/App.vue` - Root Vue component
- `src/main.js` - Application entry point  
- `src/router.js` - Vue Router configuration
- `src/store.js` - Pinia store setup

### Views (Pages)
- `src/views/Home.vue` - Landing page with statistics
- `src/views/Contribute.vue` - Main contribution interface
- `src/views/PriceAddMultiple.vue` - Add prices from receipts/price tags
- `src/views/Search.vue` - Search functionality  
- `src/views/Stats.vue` - Statistics dashboard
- `src/views/UserDashboard.vue` - User profile and contributions

### Key Components  
- `src/components/Header.vue` - Top navigation
- `src/components/Footer.vue` - Footer with links
- `src/components/PriceCard.vue` - Individual price display
- `src/components/ProofCard.vue` - Proof/receipt display
- `src/components/BarcodeScannerDialog.vue` - Barcode scanning interface
- `src/components/LeafletMap.vue` - Interactive maps
- `src/components/PriceChart.vue` - Price visualization

### Services and API
- `src/services/api.js` - All API calls to backend
- `src/constants.js` - Application constants
- `src/utils.js` - Utility functions

### Data and Localization
- `src/i18n/locales/*.json` - Translation files (90+ languages)
- `src/data/` - Static data (countries, categories, labels)

## Common Tasks

### Adding New Features
- Create Vue components in `src/components/`
- Add routes in `src/router.js`
- Add API methods in `src/services/api.js`
- Add translations to `src/i18n/locales/en.json` (other languages managed via Crowdin)

### Working with the API
- All API calls go through `src/services/api.js` 
- API expects `app_name=Open+Prices+Web+App` parameter
- Authentication uses session tokens
- Common endpoints: `/products`, `/prices`, `/proofs`, `/locations`, `/users`

### Styling and UI
- Uses Vuetify 3 components with Material Design icons
- Custom CSS in component `<style>` sections
- Responsive design with Vuetify breakpoints
- Theme colors defined in Vuetify configuration

### Internationalization
- Use `$t('key')` in templates, `t('key')` in scripts
- Add new keys to `src/i18n/locales/en.json`
- Crowdin handles translations: https://crowdin.com/project/openfoodfacts
- **LINT RULE**: Avoid raw text in templates (use translation keys)

## CI/CD Process
- **Linting**: ESLint with Vue and Vue-i18n plugins (`.github/workflows/lint-and-test.yml`)
- **Testing**: Cypress E2E tests run on every push
- **Deployment**: Automatic deployment to staging/production (`.github/workflows/deploy.yml`)
- **Pre-commit**: Husky runs lint-staged on commit
- **Semantic versioning**: Automatic releases via release-please

## Development Tips
- Use Vue DevTools browser extension for debugging
- Check browser console for API connection errors (expected without backend)  
- Use Vite's hot module replacement for fast development
- Test on mobile viewport sizes (responsive design)
- Follow Vue.js 3 Composition API patterns for new code
- Use Vuetify components over custom HTML/CSS when possible

## Troubleshooting
- **Build fails**: Check Node.js version (requires Node 20+)
- **Cypress issues**: Use `CYPRESS_INSTALL_BINARY=0` to skip binary download
- **API errors**: Expected without Open Prices backend running
- **Lint errors**: Many existing lint violations in translation files - focus on new code
- **Large bundle warnings**: Normal for this application due to extensive i18n support
- **Slow initial load**: Large number of translation files and assets is expected

## Repository Structure
```
├── .github/workflows/     # CI/CD pipelines
├── public/               # Static assets  
├── src/
│   ├── components/       # Vue components
│   ├── views/           # Page components  
│   ├── services/        # API layer
│   ├── i18n/           # Internationalization
│   ├── data/           # Static data files
│   └── utils/          # Utility functions
├── tests/
│   ├── e2e/            # Cypress E2E tests
│   └── fixtures/       # Test data
├── .env.*              # Environment configurations
└── package.json        # Dependencies and scripts
```