const mocha = require("mocha");
const assert = require("assert");

console.log("Running Tests...");

describe("Example service", () => {
  it("should test if 5 * 5 = 25", () => {
    assert.equal(25, 5 * 5);
  });
});
