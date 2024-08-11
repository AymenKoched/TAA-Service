import Express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "@/routes";
import passport from "@/utils/passport";

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
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, token"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PATCH, PUT, POST, DELETE, OPTIONS"
  );

  // Respond to preflight requests with allowed methods
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes.forEach(route => app.use(route));

app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

export default app;
