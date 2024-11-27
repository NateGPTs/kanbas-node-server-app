import PathParameters from "./PathParamaters.js";
import QueryParamaters from "./QueryParamaters.js";
import WorkingWithArrays from "./WorkingWithArrays.js";
import WorkingWithObjects from "./WorkingWithObjects.js";
import lab5routes from "./lab5routes.js";
export default function Lab5(app) {
  app.get("/lab5/welcome", (req, res) => {
    res.json("Welcome to Lab 5!");
});
    PathParameters(app);
    QueryParamaters(app);
    WorkingWithObjects(app);
    WorkingWithArrays(app);
    WorkingWithObjects(app);
    lab5routes(app);
  };
  