describe("Price list", () => {
  it("Says when no prices match the current filters", () => {
    cy.intercept("GET", /\/api\/v1\/prices\?/, {
      body: { items: [], total: 0, page: 1, size: 25, pages: 0 },
    });
    cy.visit("/prices?type=CATEGORY");
    cy.get('[data-name="price-list-empty-alert"]')
      .should("be.visible")
      .and("contain", "No prices match the current filters.");
  });

  it("Shows no empty message when there are prices", () => {
    cy.intercept("GET", /\/api\/v1\/prices\?/, { fixture: "prices.json" });
    cy.visit("/prices");
    cy.get('[data-name="price-list-empty-alert"]').should("not.exist");
  });
});
