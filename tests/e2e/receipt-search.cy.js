const emptyPage = { items: [], total: 0, page: 1, size: 25, pages: 0 };
const proof = {
  id: 42,
  type: "RECEIPT",
  currency: "EUR",
  date: "2026-10-01",
  created: "2026-10-01T12:00:00Z",
  owner: "receipt-search-test",
  receipt_price_count: 3,
  receipt_price_total: 6,
  price_count: 0,
  location_id: 7,
  location: { id: 7, type: "ONLINE", website_url: "https://example.org" },
};

function receiptItem(id, productName, price) {
  return {
    id,
    proof_id: proof.id,
    schema_version: "2.0",
    predicted_data: {
      type: "CATEGORY",
      category_tag: "en:pitted-apricot",
      product_name: productName,
      price,
      quantity: 1,
      price_per: "UNIT",
    },
  };
}

function visitReceipt() {
  cy.intercept("GET", "**/api/v1/proofs/42?*", { body: proof });
  cy.intercept("GET", "**/api/v1/receipt-items?*", {
    body: {
      ...emptyPage,
      items: [
        receiptItem(1, "Milk", 1),
        receiptItem(2, "Bread", 2),
        receiptItem(3, "Crème fraîche", 3),
      ],
      total: 3,
      pages: 1,
    },
  });
  cy.intercept("GET", "**/api/v1/prices?*", { body: emptyPage });
  cy.visit("/experiments/receipt-assistant?proof_ids=42", {
    onBeforeLoad(win) {
      win.localStorage.setItem(
        "app",
        JSON.stringify({
          user: {
            username: "receipt-search-test",
            token: "fixture-token",
            language: "en",
          },
        }),
      );
    },
  });
  cy.get(".v-data-table__tr").should("have.length", 3);
}

const search = '[data-name="receipt-item-search"] input';

[
  [1280, 900],
  [390, 844],
].forEach(([width, height]) => {
  it(`filters receipt text and restores all items at ${width}px`, () => {
    cy.viewport(width, height);
    visitReceipt();
    cy.get(search).type("mILk");
    cy.get(".v-data-table__tr").should("have.length", 1).and("contain", "Milk");
    cy.get(".v-data-table")
      .closest(".v-card")
      .find(".v-card-actions")
      .should("contain", "3")
      .and("contain", "6");
    cy.get(search).clear().type("CRÈME");
    cy.get(".v-data-table__tr")
      .should("have.length", 1)
      .and("contain", "Crème fraîche");
    cy.get(search).clear().type("2");
    cy.get(".v-data-table__tr").should("not.exist");
    cy.get('[data-name="receipt-item-search"] .v-field__clearable').click();
    cy.get(".v-data-table__tr").should("have.length", 3);
    cy.get(search).type("Milk");
    cy.contains("button", "Add new item").click();
    cy.get(search).should("have.value", "");
    cy.get(".v-data-table__tr").should("have.length", 4);
  });
});

it("keeps hidden items and edits when uploading a filtered receipt", () => {
  visitReceipt();
  cy.get(search).type("Milk");
  cy.get(".v-data-table__tr")
    .find('input[inputmode="decimal"]')
    .first()
    .clear()
    .type("1.50");
  cy.get(".v-data-table")
    .closest(".v-card")
    .find(".v-card-actions")
    .should("contain", "6.5");
  cy.intercept("POST", "**/api/v1/prices?*", (request) => {
    request.reply({
      id: 100 + request.body.product_name.length,
      ...request.body,
    });
  }).as("savePrice");
  cy.intercept("PATCH", "**/api/v1/receipt-items/*?*", { body: {} });
  cy.contains("button", "Upload or update all valid prices")
    .should("contain", "3")
    .click();
  cy.wait(["@savePrice", "@savePrice", "@savePrice"]);
  cy.get("@savePrice.all").then((requests) => {
    expect(
      requests.map(({ request }) => request.body.product_name).sort(),
    ).to.deep.equal(["Bread", "Crème fraîche", "Milk"]);
    const milk = requests.find(
      ({ request }) => request.body.product_name === "Milk",
    );
    expect(Number(milk.request.body.price)).to.equal(1.5);
  });
});

it("deletes only the matched row while the other receipt items are hidden", () => {
  visitReceipt();
  cy.get(search).type("Bread");
  cy.get(".v-data-table__tr").find(".mdi-delete").closest("button").click();
  cy.get(".v-data-table__tr").should("not.exist");
  cy.get('[data-name="receipt-item-search"] .v-field__clearable').click();
  cy.get(".v-data-table__tr")
    .should("have.length", 2)
    .and("contain", "Milk")
    .and("contain", "Crème fraîche")
    .and("not.contain", "Bread");
});
