import type { Connect } from "vite";

const apiHandler: Connect.NextHandleFunction = (req, res, next) => {
  if (req.url !== "/api/hi") {
    return next();
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      hello: "world",
    })
  );
};

export const middlewares = [
  {
    route: "/",
    handle: apiHandler,
  },
];