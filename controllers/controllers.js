const https = require("https");
const getAllData = (req, res) => {
  return new Promise((resolve, reject) => {
    https
      .get(process.env.getDataUrl, (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          resolve(data);
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  })
    .then((data) => {
      let Data = JSON.parse(data);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: true,
          data: Data,
        })
      );
    })
    .catch((error) => {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: error.message }));
    });
};

const getParticularData = (req, res, id) => {
  console.log(id);
  return new Promise((resolve, reject) => {
    https
      .get(`${process.env.getDataUrl}/${id}`, (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          resolve(data);
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  })
    .then((data) => {
      const Data = JSON.parse(data);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: true,
          data: Data,
        })
      );
    })
    .catch((error) => {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: error.message }));
    });
};
const postData = (req, res) => {
  let Data = "";
  req.on("data", (incomingData) => {
    Data += incomingData.toString();
  });

  req.on("end", () => {
    const options = {
      method: "POST",
      hostname: process.env.hostname,
      path: process.env.pathUrl,
      headers: {
        "Content-Type": "application/json",
      },
    };

    return new Promise((resolve, reject) => {
      const postReq = https.request(options, (response) => {
        let responseData = "";

        response.on("data", (chunk) => {
          responseData += chunk;
        });

        response.on("end", () => {
          resolve(responseData);
        });
      });

      postReq.on("error", (error) => {
        reject(error);
      });
      
      postReq.write(Data);
      postReq.end();
    })
      .then((responseData) => {
        const Data = JSON.parse(responseData);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, data: Data }));
      })
      .catch((error) => {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: error.message }));
      });
  });
};
const putData = (req, res, id) => {
  let Data = "";
  req.on("data", (incomingData) => {
    Data += incomingData.toString();
  });

  req.on("end", () => {
    const options = {
      method: "PUT",
      hostname: process.env.hostname,
      path: `${process.env.putDataUrl}/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    return new Promise((resolve, reject) => {
      const postReq = https.request(options, (response) => {
        let responseData = "";

        response.on("data", (chunk) => {
          responseData += chunk;
        });

        response.on("end", () => {
          resolve(responseData);
        });
      });

      postReq.on("error", (error) => {
        reject(error);
      });

      postReq.write(Data);
      postReq.end();
    })
      .then((responseData) => {
        const Data = JSON.parse(responseData);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, data: Data }));
      })
      .catch((error) => {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: error.message }));
      });
  });
};
const deleteData = (req, res, id) => {
  const options = {
    method: "DELETE",
    hostname: process.env.hostname,
    path: `${process.env.deleteDataUrl}/${id}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return new Promise((resolve, reject) => {
    const deleteReq = https
      .request(options, (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          resolve(data);
        });
      })
      .on("error", (error) => {
        reject(error);
      });
    deleteReq.end();
  })
    .then((data) => {
      const Data = JSON.parse(data);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: true,
          data: Data,
        })
      );
    })
    .catch((error) => {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: error.message }));
    });
};

module.exports = {
  getAllData,
  getParticularData,
  postData,
  putData,
  deleteData,
};
