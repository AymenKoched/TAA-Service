import Express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "@/routes";

const app = new Express();

app.use(
  session({
    secret: "keyboard cat",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

  // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept ,X-Requested-With,token"
  );
  next();

  app.options("", () => {
    // allowed XHR methods
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PATCH, PUT, POST, DELETE, OPTIONS"
    );
    res.send();
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes.forEach(route => app.use(route));

app.use(cors());

export default app;
