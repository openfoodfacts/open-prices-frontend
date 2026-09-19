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
  cy.location('pathname').should('equal', `/products/${categoryId}`)
  cy.wait('@prices').then(({ request }) => {
    expect(request.query.category_tag).to.equal(categoryId)
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

  it('finds prices after selecting an existing category with the keyboard', () => {
    cy.intercept({ method: 'GET', pathname: '/api/v1/prices', query: { category_tag: 'en:pitted-apricot' } }, {
      fixture: 'pitted_apricot_prices.json'
    }).as('prices')

    visitSearch()
    cy.get('[data-name="category-search-input"] input').type('not-a-category{enter}')
    cy.location('pathname').should('equal', '/search')
    cy.get('@prices.all').should('have.length', 0)
    cy.get('[data-name="category-search-input"] input').clear().type('Pitted apricot')
    cy.contains('.v-list-item-title', /^Pitted apricot$/).should('be.visible')
    cy.get('[data-name="category-search-input"] input').type('{downarrow}{enter}')

    expectCategoryRequest('en:pitted-apricot')
    cy.get('[data-name="category-card"]').contains('Pitted apricot')
    cy.get('#price-count').contains('2')
    cy.get('[data-name="price-card"]').should('have.length', 2)
  })

  it('selects an existing French category on mobile', () => {
    cy.viewport(375, 812)
    visitSearch('fr')
    cy.get('[data-name="category-search-input"] input').type('Pommes')
    cy.contains('.v-list-item-title', /^Pommes$/).click()

    expectCategoryRequest('en:apples')
    cy.get('[data-name="category-card"]').contains('Pommes')
  })

  it('preserves searches opened with a barcode query', () => {
    visitSearch('en', '?q=3011360030498')
    cy.wait('@productSearch').its('request.query.code').should('equal', '3011360030498')
    cy.wait('@barcodePrices')

    cy.get('#product-title').contains('Mayonnaise Classique')
    cy.get('#price-count').contains('1')
    cy.contains('Latest price')
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
})
