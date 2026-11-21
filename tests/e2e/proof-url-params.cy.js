const LOCATION = {
  id: 32,
  type: "OSM",
  osm_id: 32520537,
  osm_type: "WAY",
  osm_name: "Monoprix",
  osm_tag_key: "shop",
  osm_tag_value: "supermarket",
  osm_address_city: "Grenoble",
  osm_address_country: "France",
  osm_address_country_code: "FR",
  osm_lat: 45.1904063,
  osm_lon: 5.7286464,
  price_count: 16,
};

function visitAsSignedInUser(url) {
  cy.visit(url, {
    onBeforeLoad(win) {
      win.localStorage.setItem(
        "app",
        JSON.stringify({ user: { username: "test", token: "test" } }),
      );
    },
  });
}

describe("Proof form URL params", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "http://127.0.0.1:8000/api/v1/locations/osm/WAY/32520537?*",
      { body: LOCATION },
    ).as("location");
  });

  it("prefills the location, date & currency", () => {
    visitAsSignedInUser(
      "/prices/add/multiple?location_osm_type=WAY&location_osm_id=32520537&date=2024-01-31&currency=usd",
    );
    cy.wait("@location");
    cy.contains("Monoprix");
    cy.get('input[type="date"]').should("have.value", "2024-01-31");
    cy.get(".v-select").contains("USD");
  });

  it("ignores invalid values", () => {
    visitAsSignedInUser(
      "/prices/add/multiple?location_id=abc&date=2024-02-30&currency=XYZ",
    );
    // falls back to today (local date)
    const today = new Date();
    const todayString = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");
    cy.get('input[type="date"]').should("have.value", todayString);
    cy.get(".v-select").contains("EUR");
    cy.contains("Find the shop location");
  });
});
