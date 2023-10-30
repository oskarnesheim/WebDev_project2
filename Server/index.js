import { graphqlHTTP } from "express-graphql";
import express from "express";
import schema from "./schema/schema.js";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// Get port from .env file
const port = process.env.PORT;

const app = express();

// Connect Database
const a = connectDB();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV == "development" || true,
  })
);
app.listen(
  port,
  console.log(
    `Server running on port ${port}\nURL: http://localhost:${port}/graphql`
  )
  // `Server running in ${process.env.NODE_ENV} mode on port ${port}\nURL: http://it2810-08.idi.ntnu.no:${port}/graphql`
);
