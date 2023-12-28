const http = require("http");
require("dotenv").config();
const routes = require("./routers/routes");
const matchRoute = require("./utils/routeMatcher");

const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;

  if (routes[method] && matchRoute(routes[method], url)) {
    const [route, param] = matchRoute(routes[method], url);
    if (param !== null) {
      route(req, res, param); // Pass the parameter to the controller function
    } else {
      route(req, res);
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "404 not Found" }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
