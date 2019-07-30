"use strict";

const chai = require("chai");
const request = require("supertest");
const expect = chai.expect;
const app = require("../app.js");
const User = require("../database/models").User;
// const chaiAsPromised = require("chai-as-promised");
// chai.use(chaiAsPromised);

describe("Environment", () => {
  it("Should run tests in test env", () => {
    expect(process.env.NODE_ENV).to.equal("test");
  });
});

describe("Authentication", () => {
  describe("/auth/signup", () => {
    beforeEach(() => {
      User.destroy({ where: {} });
    });

    it("Should sign up a new user", () => {
      request(app)
        .post("/auth/signup")
        .send({
          firstName: "Johnny",
          lastName: "Test",
          email: "jtest55@gmail.com",
          password: "Testman69xx"
        })
        .then(res => expect(res.status).to.equal(201));
    });

    it("Should return 422 if parameters missing", () => {
      request(app)
        .post("/auth/signup")
        .send({
          firstName: "Johnny",
          email: "jtest55@gmail.com"
        })
        .then(res => expect(res.status).to.equal(422));
    });

    it("Should return 400 if email in use", () => {
      request(app)
        .post("/auth/signup")
        .send({
          firstName: "Johnny",
          lastName: "Test",
          email: "doubled-email@gmail.com",
          password: "Testman69xx"
        })
        .then(res =>
          request(app)
            .post("/auth/signup")
            .send({
              firstName: "Sammy",
              lastName: "Test",
              email: "doubled-email@gmail.com",
              password: "ImnotJohnny"
            })
        )
        .then(res => expect(res.status).to.equal(400));
    });
  });

  describe("/auth/login", () => {
    it("Should login an existing user", () => {});
  });
  describe("/auth/logout", () => {
    it("Should logout a logged in user", () => {});
  });
});

// describe("API endpoints", () => {
//   describe("/webcam", () => {
//     describe("/load/all", () => {
//       it("Should return results in correct format", () => {
//         return request(app)
//           .get("/data/webcam/load/all")
//           .then(res => {
//             expect(res.statusCode).to.equal(200);
//             expect(res.body).to.be.an("object");
//           });
//       });
//     });
//     describe("/load/latest", () => {});

//     describe("/load/:name", () => {
//       it("Should return 404 if name not provided", () => {
//         return request(app)
//           .get("/webcam/load")
//           .then(res => {
//             expect(res.statusCode).to.equal(404);
//           });
//       });

//       it("Should return 404 if name not found", () => {
//         return request(app)
//           .get("/webcam/load/foobarbaz")
//           .then(res => {
//             expect(res.statusCode).to.equal(404);
//           });
//       });

//       it("Should return results in correct format", () => {
//         return request(app)
//           .get("/webcam/load/glenorchy")
//           .then(res => {
//             expect(res.statusCode).to.equal(200);
//             expect(res.body).to.be.an("object");
//             expect(res.body)
//               .to.have.property("title")
//               .and.to.be.a("string");
//             expect(res.body)
//               .to.have.property("name")
//               .and.to.be.a("string");
//             expect(res.body)
//               .to.have.property("desc")
//               .and.to.be.a("string");
//             expect(res.body)
//               .to.have.property("images")
//               .and.to.be.an("array");
//           });
//       });
//     });

//     describe("/purge", () => {
//       it("Should purge webcams successfully", () => {
//         return request(app)
//           .get("/webcam/purge")
//           .then(res => {
//             expect(res.statusCode).to.equal(200);
//           });
//       });
//     });

//     describe("/scrape/:name", () => {});
//   });

//   describe("/weather", () => {
//     describe("/scrape/qmug", () => {});

//     describe("/scrape/metvuw", () => {});
//   });
// });
