describe('Basic tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://127.0.0.1:8000/api/v1/prices?page=1&size=1&order_by=-created*', { fixture: 'prices.json' })
    cy.intercept('GET', 'http://127.0.0.1:8000/api/v1/prices?page=1&size=10&order_by=-date&product_code=3011360030498', { fixture: 'prices_3011360030498.json' })
    cy.intercept('GET', 'http://127.0.0.1:8000/api/v1/prices?page=1&size=10&order_by=-date&category_tag=en%3Apitted-apricot', { fixture: 'prices_pitted_apricot.json' })
    cy.intercept('GET', 'http://127.0.0.1:8000/api/v1/products/code/3011360030498', { fixture: 'product_3011360030498.json' })
  })

  it('loads the home page', () => {
    cy.visit('/')
    cy.contains('Welcome to Open Prices!')  // en by default
    cy.get('#price-count').contains('42')
  })

  it('displays a product page', () => {
    cy.visit('/products/3011360030498')
    cy.contains('Welcome to Open Prices!').should('not.exist')
    cy.get('#product-title').contains('Mayonnaise Classique')
    cy.get('#price-count').contains('1')
    cy.contains('Unknown product').should('not.exist')
  })

  it('displays a raw product page', () => {
    cy.visit('/products/en:pitted-apricot')
    cy.contains('Welcome to Open Prices!').should('not.exist')
    cy.get('.v-card-title').contains('Pitted apricot')
    // cy.get('#price-count').contains('1')
    cy.contains('Unknown product')  // to fix
  })
})
