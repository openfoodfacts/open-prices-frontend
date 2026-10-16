import date_utils from "../../src/utils/date";

describe("Date utils", () => {
  it("Returns the local date, not the UTC date", () => {
    // just after & just before midnight (local time)
    expect(date_utils.toDateString(new Date(2023, 11, 25, 0, 30))).to.equal(
      "2023-12-25",
    );
    expect(date_utils.toDateString(new Date(2023, 11, 25, 23, 30))).to.equal(
      "2023-12-25",
    );
  });
});
