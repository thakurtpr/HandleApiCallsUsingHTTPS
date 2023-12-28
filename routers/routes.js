const {
  getAllData,
  getParticularData,
  postData,
  putData,
  deleteData,
} = require("../controllers/controllers");

const routes = {
  GET: {
    "/getAllData": getAllData,
    "/product/:id": getParticularData,
  },
  POST: {
    "/postData": postData,
  },
  PUT: {
    "/putData/:id": putData,
  },
  DELETE: {
    "/deleteData/:id": deleteData,
  },
};

module.exports = routes;
