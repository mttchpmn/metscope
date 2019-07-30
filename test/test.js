"use strict";

const chai = require("chai");
const request = require("supertest");
const app = require("../app.js");
const expect = chai.expect;
// const chaiAsPromised = require("chai-as-promised");
// chai.use(chaiAsPromised);

console.log("Running Tests...");

describe("Example service", () => {
  it("should test if 5 * 5 = 25", () => {
    expect(5 * 5).to.equal(25);
  });
});

describe("Config and environment", () => {
  it("Should run tests in test env", () => {
    expect(process.env.NODE_ENV).to.equal("test");
  });
});

describe("API endpoints", () => {
  describe("/webcam", () => {
    describe("/load/all", () => {
      it("Should return results in correct format", () => {
        return request(app)
          .get("/data/webcam/load/all")
          .then(res => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an("object");
          });
      });
    });
    describe("/load/latest", () => {});

    describe("/load/:name", () => {
      it("Should return 404 if name not provided", () => {
        return request(app)
          .get("/webcam/load")
          .then(res => {
            expect(res.statusCode).to.equal(404);
          });
      });

      it("Should return 404 if name not found", () => {
        return request(app)
          .get("/webcam/load/foobarbaz")
          .then(res => {
            expect(res.statusCode).to.equal(404);
          });
      });

      it("Should return results in correct format", () => {
        return request(app)
          .get("/webcam/load/glenorchy")
          .then(res => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an("object");
            expect(res.body)
              .to.have.property("title")
              .and.to.be.a("string");
            expect(res.body)
              .to.have.property("name")
              .and.to.be.a("string");
            expect(res.body)
              .to.have.property("desc")
              .and.to.be.a("string");
            expect(res.body)
              .to.have.property("images")
              .and.to.be.an("array");
          });
      });
    });

    describe("/purge", () => {
      it("Should purge webcams successfully", () => {
        return request(app)
          .get("/webcam/purge")
          .then(res => {
            expect(res.statusCode).to.equal(200);
          });
      });
    });

    describe("/scrape/:name", () => {});
  });

  describe("/weather", () => {
    describe("/scrape/qmug", () => {});

    describe("/scrape/metvuw", () => {});
  });
});
