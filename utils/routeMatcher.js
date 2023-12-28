function matchRoute(routes, url) {
  for (const route in routes) {
    const routeSegments = route.split("/"); //routes that  are present in the routes folder
    const urlSegments = url.split("/"); //sent in the postman
    // console.log(routeSegments);
    // console.log(urlSegments);
    if (routeSegments.length === urlSegments.length) {
      let params = null;
      let matched = true;

      for (let i = 0; i < routeSegments.length; i++) {
        if (
          routeSegments[i] !== urlSegments[i] &&
          !routeSegments[i].startsWith(":")
        ) {
          matched = false;
          break;
        } else if (routeSegments[i].startsWith(":")) {
          params = urlSegments[i];
        }
      }

      if (matched) {
        return [routes[route], params];
      }
    }
  }
  return null;
}

module.exports = matchRoute;
