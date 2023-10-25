import { graphqlHTTP } from "express-graphql";
import express from "express";
import schema from "./schema/schema.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

// Get port from .env file
const port = process.env.PORT; //Remember to run npm install in server folder

const app = express();

// Connect Database
const a = connectDB();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true, //process.env.NODE_ENV == "development",
  })
);
app.listen(
  port,
  console.log(
    "Server running in ${process.env.NODE_ENV} mode on port ${port}\nURL: http://it2810-08.idi.ntnu.no:27017/graphql"
  )
);
