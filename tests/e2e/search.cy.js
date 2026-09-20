const emptyPage = { items: [], total: 0, page: 1, size: 10, pages: 0 }

function visitSearch(locale = 'en', query = '') {
  cy.visit(`/search${query}`, {
    onBeforeLoad(win) {
      win.localStorage.setItem('app', JSON.stringify({
        user: {
          language: locale,
          // Exercise the scanner dialog without requiring camera access.
          barcode_scanner_default_mode: 'type'
        }
      }))
    }
  })
}

function expectCategoryRequest(categoryId) {
  cy.location('pathname').should('equal', '/search')
  cy.wait('@prices').then(({ request }) => {
    expect(request.query.category_tag).to.equal(categoryId)
    expect(request.query.size).to.equal('1')
    expect(request.query).not.to.have.property('product_code')
  })
  cy.get('@productSearch.all').should('have.length', 0)
  cy.get('@productLookup.all').should('have.length', 0)
}

describe('Search', () => {
  beforeEach(() => {
    cy.intercept({ method: 'GET', pathname: '/api/v1/products' }, {
      fixture: 'products_3011360030498.json'
    }).as('productSearch')
    cy.intercept({ method: 'GET', pathname: '/api/v1/products/code/*' }, {
      fixture: 'product_3011360030498.json'
    }).as('productLookup')
    cy.intercept({ method: 'GET', pathname: '/api/v1/prices' }, {
      body: emptyPage
    }).as('prices')
    cy.intercept({ method: 'GET', pathname: '/api/v1/prices', query: { product_code: '3011360030498' } }, {
      fixture: 'product_3011360030498_prices.json'
    }).as('barcodePrices')
  })

  it('shows a category summary on search and opens prices only when the card is clicked', () => {
    cy.intercept({ method: 'GET', pathname: '/api/v1/prices', query: { category_tag: 'en:pitted-apricot' } }, {
      fixture: 'pitted_apricot_prices.json'
    }).as('prices')

    visitSearch()
    cy.get('[data-name="category-search-input"] input').should('not.exist')
    cy.get('[data-name="category-search-tab"]').click()
    cy.get('[data-name="category-search-input"] input').type('not-a-category{enter}')
    cy.location('pathname').should('equal', '/search')
    cy.get('@prices.all').should('have.length', 0)
    cy.get('[data-name="category-search-input"] input').clear().type('Pitted apricot')
    cy.contains('.v-list-item-title', /^Pitted apricot$/).should('be.visible')
    cy.get('[data-name="category-search-input"] input').type('{downarrow}{enter}')

    expectCategoryRequest('en:pitted-apricot')
    cy.get('[data-name="category-card"]').contains('Pitted apricot')
    cy.get('#price-count').contains('2')
    cy.get('[data-name="price-card"]').should('not.exist')

    cy.get('[data-name="category-card"]').click()
    cy.location('pathname').should('equal', '/products/en:pitted-apricot')
    cy.wait('@prices')
    cy.get('[data-name="price-card"]').should('have.length', 2)
  })

  it('selects an existing French category on mobile', () => {
    cy.viewport(375, 812)
    visitSearch('fr')
    cy.get('[data-name="category-search-tab"]').should('contain', 'Catégorie').click()
    cy.get('[data-name="category-search-input"] input').type('Pommes')
    cy.contains('.v-list-item-title', /^Pommes$/).click()

    expectCategoryRequest('en:apples')
    cy.get('[data-name="category-card"]').contains('Pommes')
    cy.get('#price-count').should('have.text', '0')
    cy.document().then((doc) => {
      expect(doc.documentElement.scrollWidth).to.equal(doc.documentElement.clientWidth)
    })
  })

  it('preserves searches opened with a barcode query', () => {
    visitSearch('en', '?q=3011360030498')
    cy.wait('@productSearch').its('request.query.code').should('equal', '3011360030498')
    cy.wait('@barcodePrices')

    cy.get('#product-title').contains('Mayonnaise Classique')
    cy.get('#price-count').contains('1')
    cy.contains('Latest price')

    cy.get('[data-name="category-search-tab"]').click()
    cy.get('[data-name="product-card"]').should('not.be.visible')
    cy.get('[data-name="category-search-input"] input').type('Apples')
    cy.contains('.v-list-item-title', /^Apples$/).click()
    cy.wait('@prices')
    cy.get('[data-name="category-card"]').should('be.visible')
    cy.get('[data-name="product-search-tab"]').click()
    cy.get('#product-title').should('be.visible').and('contain', 'Mayonnaise Classique')
    cy.get('input[inputmode="numeric"]').should('have.value', '3011360030498')
    cy.get('[data-name="category-card"]').should('not.be.visible')
    cy.get('[data-name="category-search-tab"]').click()
    cy.get('[data-name="category-card"]').should('be.visible').and('contain', 'Apples')
    cy.get('@productSearch.all').should('have.length', 1)
  })

  it('keeps the scanner dialog connected to barcode search', () => {
    visitSearch()
    cy.get('.mdi-barcode-scan').click()
    cy.get('.v-dialog').should('be.visible').within(() => {
      cy.contains('Find the product')
      cy.get('input[inputmode="numeric"]').type('3011360030498{enter}')
    })

    cy.wait('@productSearch').its('request.query.code').should('equal', '3011360030498')
    cy.get('.v-dialog').should('not.exist')
    cy.location('search').should('equal', '?q=3011360030498')
    cy.get('#product-title').contains('Mayonnaise Classique')
  })

  it('ignores a slow response after selecting another category and allows clearing', () => {
    cy.intercept({ method: 'GET', pathname: '/api/v1/prices', query: { category_tag: 'en:apples' } }, {
      body: { ...emptyPage, total: 357 }, delay: 1500
    }).as('slowApples')
    visitSearch()
    cy.get('[data-name="category-search-tab"]').click()
    cy.get('[data-name="category-search-input"] input').type('Apples')
    cy.contains('.v-list-item-title', /^Apples$/).click()
    cy.get('[data-name="category-search-input"] input').clear().type('Bananas')
    cy.contains('.v-list-item-title', /^Bananas$/).click()
    cy.wait('@prices')
    cy.wait('@slowApples')
    cy.get('[data-name="category-card"]').should('contain', 'Bananas')
    cy.get('#price-count').should('have.text', '0')
    cy.location('pathname').should('equal', '/search')

    cy.get('[data-name="category-search-input"] .v-field__clearable').click()
    cy.get('[data-name="category-card"]').should('not.exist')
  })

  it('reports a failed category lookup and recovers on the next selection', () => {
    cy.intercept({ method: 'GET', pathname: '/api/v1/prices', query: { category_tag: 'en:apples' } }, {
      statusCode: 500, body: {}
    }).as('failedApples')
    visitSearch()
    cy.get('[data-name="category-search-tab"]').click()
    cy.get('[data-name="category-search-input"] input').type('Apples')
    cy.contains('.v-list-item-title', /^Apples$/).click()
    cy.wait('@failedApples')
    cy.contains('Error: server error').should('be.visible')
    cy.get('[data-name="category-card"]').should('not.exist')
    cy.get('[data-name="category-search-input"] input').clear().type('Bananas')
    cy.contains('.v-list-item-title', /^Bananas$/).click()
    cy.wait('@prices')
    cy.get('[data-name="category-card"]').should('contain', 'Bananas')
    cy.get('#price-count').should('have.text', '0')
    cy.contains('Error: server error').should('not.exist')
  })
})
