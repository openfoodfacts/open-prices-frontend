describe('Basic tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://127.0.0.1:8000/api/v1/products?page=1&size=10&order_by=-price_count', { fixture: 'products.json' })
    cy.intercept('GET', 'http://127.0.0.1:8000/api/v1/products/code/3011360030498', { fixture: 'product_3011360030498.json' })
    cy.intercept('GET', 'http://127.0.0.1:8000/api/v1/prices?page=1&size=1&order_by=-created*', { fixture: 'prices.json' })
    cy.intercept('GET', 'http://127.0.0.1:8000/api/v1/prices?page=1&size=10&order_by=-created', { fixture: 'prices.json' })
    cy.intercept('GET', 'http://127.0.0.1:8000/api/v1/prices?page=1&size=10&order_by=-date&product_code=3011360030498', { fixture: 'product_3011360030498_prices.json' })
    cy.intercept('GET', 'http://127.0.0.1:8000/api/v1/prices?page=1&size=10&order_by=-date&category_tag=en%3Apitted-apricot', { fixture: 'pitted_apricot_prices.json' })
  })

  it('loads the home page', () => {
    cy.visit('/')
    cy.contains('Welcome to Open Prices!')  // en by default
    cy.get('#price-count').contains('42')
  })

  it('displays the latest prices', () => {
    cy.visit('/prices')
    cy.contains('Welcome to Open Prices!').should('not.exist')
    cy.get('[data-name="price-card"]').should('have.length', 10)
    cy.contains('3564700428023')  // unknown product
    cy.get('[data-name="product-missing-chip"]').should('have.length', 1)
  })

  it('displays the top products', () => {
    cy.visit('/products')
    cy.contains('Welcome to Open Prices!').should('not.exist')
    cy.get('[data-name="product-card"]').should('have.length', 10)
    cy.contains('3973467869701')  // unknown product
    cy.contains('3250391696949')  // unknown product
    cy.get('[data-name="product-missing-chip"]').should('have.length', 2)
  })

  it('displays a product page', () => {
    cy.visit('/products/3011360030498')
    cy.contains('Welcome to Open Prices!').should('not.exist')
    cy.get('#product-title').contains('Mayonnaise Classique')
    cy.get('#price-count').contains('1')
    cy.get('[data-name="product-missing-chip"]').should('have.length', 0)
    cy.get('[data-name="price-card"]').should('have.length', 1)
  })

  it('displays a raw product page', () => {
    cy.visit('/products/en:pitted-apricot')
    cy.contains('Welcome to Open Prices!').should('not.exist')
    cy.get('.v-card-title').contains('Pitted apricot')
    // cy.get('#price-count').contains('1')
    cy.get('[data-name="product-missing-chip"]').should('have.length', 2)  // TODO: fix
    cy.get('[data-name="price-card"]').should('have.length', 2)
  })
})
