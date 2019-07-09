const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should;

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
        chai
          .request(app)
          .get("/webcam/load/glenorchy")
          .end((err, res) => {
            console.log("res :", res);
            res.should.have.statusCode(200);
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
