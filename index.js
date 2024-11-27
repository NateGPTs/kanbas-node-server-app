import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import express from 'express';
import UserRoutes from "./Kanbas/Users/routes.js";
import cors from "cors";
import session from "express-session";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import "dotenv/config";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";

const app = express();

// Single CORS configuration
app.use(cors({
  credentials: true,
  origin: process.env.NETLIFY_URL || "http://localhost:3000",
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept']
}));

// Session configuration
const sessionOptions = {
  secret: "kanbas",
  resave: true,
  saveUninitialized: true,
  store: new session.MemoryStore(), // Note: new is needed here
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV !== "development",
    sameSite: process.env.NODE_ENV !== "development" ? 'none' : 'lax',
    httpOnly: true
  }
};

if (process.env.NODE_ENV !== "development") {
  app.set('trust proxy', 1);
  sessionOptions.proxy = true;
  sessionOptions.cookie.domain = process.env.NODE_SERVER_DOMAIN;
}

app.use(session(sessionOptions));
app.use(express.json());
Lab5(app);
Hello(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
app.listen(process.env.PORT || 4000)


