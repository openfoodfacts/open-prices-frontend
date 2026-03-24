describe('Basic tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://127.0.0.1:8000/api/v1/products?app_name=Open+Prices+Web+App&page=1&size=10&order_by=-price_count', { fixture: 'products.json' })
    cy.intercept('GET', 'http://127.0.0.1:8000/api/v1/products?app_name=Open+Prices+Web+App&page=1&size=10&code=3011360030498', { fixture: 'products_3011360030498.json' })
    cy.intercept('GET', 'http://127.0.0.1:8000/api/v1/products?app_name=Open+Prices+Web+App&page=1&size=10&brands__like=Snickers&order_by=-price_count', { body: {"items":[],"total":0,"page":1,"size":10,"pages":0} })
    cy.intercept('GET', 'http://127.0.0.1:8000/api/v1/products/code/3011360030498?app_name=Open+Prices+Web+App', { fixture: 'product_3011360030498.json' })
    cy.intercept('GET', 'http://127.0.0.1:8000/api/v1/products/code/0000000000000?app_name=Open+Prices+Web+App', { statusCode: 404, body: { "detail": "Product with code 35647000112700 not found" }})
    cy.intercept('GET', 'http://127.0.0.1:8000/api/v1/prices?app_name=Open+Prices+Web+App&page=1&size=1&order_by=-created&created__gte=*', { fixture: 'prices.json' })
    cy.intercept('GET', 'http://127.0.0.1:8000/api/v1/prices?app_name=Open+Prices+Web+App&page=1&size=10&order_by=-created', { fixture: 'prices.json' })
    cy.intercept('GET', 'http://127.0.0.1:8000/api/v1/prices?app_name=Open+Prices+Web+App&page=1&size=1&order_by=-date&product_code=3011360030498', { fixture: 'product_3011360030498_prices.json' })
    cy.intercept('GET', 'http://127.0.0.1:8000/api/v1/prices?app_name=Open+Prices+Web+App&page=1&size=10&order_by=-date&product_code=3011360030498', { fixture: 'product_3011360030498_prices.json' })
    cy.intercept('GET', 'http://127.0.0.1:8000/api/v1/prices?app_name=Open+Prices+Web+App&page=1&size=10&order_by=-date&category_tag=en%3Apitted-apricot', { fixture: 'pitted_apricot_prices.json' })
    cy.intercept('GET', 'http://127.0.0.1:8000/api/v1/prices?app_name=Open+Prices+Web+App&page=1&size=10&order_by=-date&category_tag=en%3Aaaaaaaaaaaaa', { body: {"items":[],"total":0,"page":1,"size":10,"pages":0} })
    cy.intercept('GET', 'http://127.0.0.1:8000/api/v1/prices?app_name=Open+Prices+Web+App&page=1&size=10&order_by=-date&date=2024-01-31', { body: {"items":[],"total":0,"page":1,"size":10,"pages":0} })
  })

  it('loads the home page', () => {
    cy.visit('/')
    cy.contains('Welcome to Open Prices!')  // en by default
    cy.get('#price-count').contains('42')
  })

  it('displays the latest prices', () => {
    cy.visit('/prices')
    cy.contains('Welcome to Open Prices!').should('not.exist')
    cy.contains('Latest prices')
    cy.get('[data-name="price-card"]').should('have.length', 10)
    cy.contains('3564700428023')  // unknown product
    cy.get('[data-name="product-missing-chip"]').should('have.length', 1)
    cy.contains('Load more')
  })

  it('displays the top products', () => {
    cy.visit('/products')
    cy.contains('Welcome to Open Prices!').should('not.exist')
    cy.contains('Top products')
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
    cy.contains('Latest prices')
    cy.get('[data-name="product-missing-chip"]').should('have.length', 0)
    cy.get('[data-name="product-not-found-alert"]').should('have.length', 0)
    cy.get('[data-name="category-not-found-alert"]').should('have.length', 0)
    cy.get('[data-name="price-card"]').should('have.length', 1)
    cy.contains('Load more').should('not.exist')
  })

  it('displays an unknown product page', () => {
    cy.on('uncaught:exception', (err, runnable, promise) => {
      expect(err.message).to.include('Failed to fetch')
      return false
      // alternatively, we can use the following to ignore the error
      // if (promise) {
      //   return false
      // }
    })
    cy.visit('/products/0000000000000')
    cy.contains('Welcome to Open Prices!').should('not.exist')
    cy.get('#product-title').contains('0000000000000')
    cy.get('#price-count').contains('0')
    cy.contains('Latest prices')
    cy.get('[data-name="product-missing-chip"]').should('have.length', 1)
    cy.get('[data-name="product-not-found-alert"]').should('have.length', 1)
    cy.get('[data-name="category-not-found-alert"]').should('have.length', 0)
    cy.get('[data-name="price-card"]').should('have.length', 0)
    cy.contains('Load more').should('not.exist')
  })

  it('displays a raw product page', () => {
    cy.visit('/products/en:pitted-apricot')
    cy.contains('Welcome to Open Prices!').should('not.exist')
    cy.get('.v-card-title').contains('Pitted apricot')
    cy.get('#price-count').contains('2')
    cy.contains('Latest prices')
    cy.get('[data-name="product-missing-chip"]').should('have.length', 0)
    cy.get('[data-name="product-not-found-alert"]').should('have.length', 0)
    cy.get('[data-name="category-not-found-alert"]').should('have.length', 0)
    cy.get('[data-name="price-card"]').should('have.length', 2)
    cy.contains('Load more').should('not.exist')
  })

  it('displays an unknown raw product page', () => {
    cy.visit('/products/en:aaaaaaaaaaaa')
    cy.contains('Welcome to Open Prices!').should('not.exist')
    cy.get('.v-card-title').contains('en:aaaaaaaaaaaa')
    cy.get('#price-count').contains('0')
    cy.contains('Latest prices')
    // cy.get('[data-name="product-missing-chip"]').should('have.length', 1)
    cy.get('[data-name="product-not-found-alert"]').should('have.length', 0)
    cy.get('[data-name="category-not-found-alert"]').should('have.length', 1)
    cy.get('[data-name="price-card"]').should('have.length', 0)
    cy.contains('Load more').should('not.exist')
  })

  it('displays a brand page', () => {
    cy.visit('/brands/Snickers')
    cy.contains('Welcome to Open Prices!').should('not.exist')
    cy.get('[data-name="brand-card"]').should('have.length', 1)
    cy.get('#product-count').contains('0')
    cy.contains('Top products')
    cy.get('[data-name="price-card"]').should('have.length', 0)
    cy.contains('Load more').should('not.exist')
  })

  it('displays a date page', () => {
    cy.visit('/dates/2024-01-31')
    cy.contains('Welcome to Open Prices!').should('not.exist')
    cy.get('[data-name="date-card"]').should('have.length', 1)
    cy.get('#price-count').contains('0')
    cy.contains('Latest prices')
    cy.get('[data-name="price-card"]').should('have.length', 0)
    cy.contains('Load more').should('not.exist')
  })

  it('displays the search page', () => {
    cy.visit('/search?q=3011360030498')
    cy.contains('Welcome to Open Prices!').should('not.exist')
    cy.get('#product-title').contains('Mayonnaise Classique')
    cy.get('#price-count').contains('1')
    cy.contains('Latest price')
    cy.get('[data-name="product-missing-chip"]').should('have.length', 0)
    cy.get('[data-name="price-card"]').should('have.length', 0)
    cy.contains('Load more').should('not.exist')
  })
})
