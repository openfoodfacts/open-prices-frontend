import date_utils from "../../src/utils/date";

describe("Date utils", () => {
  it("Returns the local date, not the UTC date", () => {
    // only catches the UTC bug when run outside UTC (e.g. TZ=Europe/Paris)
    // just after & just before midnight (local time)
    expect(date_utils.toDateString(new Date(2023, 11, 25, 0, 30))).to.equal(
      "2023-12-25",
    );
    expect(date_utils.toDateString(new Date(2023, 11, 25, 23, 30))).to.equal(
      "2023-12-25",
    );
  });

  it("Pads single-digit months & days", () => {
    expect(date_utils.toDateString(new Date(2024, 0, 5))).to.equal(
      "2024-01-05",
    );
  });

  it("Shows the same day for a date-only string", () => {
    // only catches the UTC bug when run west of UTC (e.g. TZ=America/New_York)
    const expected = new Intl.DateTimeFormat(navigator.language, {
      dateStyle: "short",
    }).format(new Date(2023, 11, 25));
    expect(date_utils.prettyDate("2023-12-25")).to.equal(expected);
  });
});
