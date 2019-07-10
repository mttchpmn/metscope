const mocha = require("mocha");
const chai = require("chai");
const request = require("supertest");
const app = require("../app.js");
const expect = chai.expect;

console.log("Running Tests...");

describe("Example service", () => {
  it("should test if 5 * 5 = 25", () => {
    expect(5 * 5).to.equal(25);
  });
});

describe("Config and environment", () => {});

describe("API endpoints", () => {
  describe("/webcam", () => {
    describe("/load/all", () => {});

    describe("/load/latest", () => {});

    describe("/load/:name", () => {
      it("Should return 404 if name not provided", () => {});
      it("Should return 404 if name not found", () => {});
      it("Should return results in correct format", () => {
        return request(app)
          .get("/webcam/load/glenorchy")
          .then(res => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("title");
            expect(res.body).to.have.property("name");
            expect(res.body).to.have.property("desc");
            expect(res.body).to.have.property("images");
          });
      });

      it("Should return object with title property ", () => {});
      it("Should return object with name property ", () => {});
      it("Should return object with desc property ", () => {});
      it("Should return object with images property ", () => {});
      it("Should return object with images property as array", () => {});
    });

    describe("/purge", () => {});

    describe("/scrape/:name", () => {});
  });

  describe("/weather", () => {
    describe("/scrape/qmug", () => {});

    describe("/scrape/metvuw", () => {});
  });
});
