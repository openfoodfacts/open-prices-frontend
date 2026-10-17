describe("Input suffixes", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/v1/**", {
      body: { items: [], total: 0, page: 1, size: 10, pages: 0 },
    });
    cy.visit("/proofs/add/receipt", {
      onBeforeLoad(window) {
        window.localStorage.setItem(
          "app",
          JSON.stringify({
            user: {
              username: "test",
              token: "test",
              last_currency_used: "EUR",
            },
          }),
        );
      },
    });
  });

  it("keeps the receipt total currency visible when empty and blurred", () => {
    cy.contains(".v-text-field__suffix", "EUR")
      .should("be.visible")
      .closest(".v-text-field")
      .find("input")
      .as("total");
    cy.get("@total").should("have.value", "");
    cy.get("@total").focus().type("12.34").blur();
    cy.contains(".v-text-field__suffix", "EUR").should("be.visible");
    cy.get("@total").clear().blur();
    cy.contains(".v-text-field__suffix", "EUR").should("be.visible");
  });
});
