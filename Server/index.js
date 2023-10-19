import { graphqlHTTP } from "express-graphql";
import express from "express";
import schema from "./schema/schema.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 6969; //Remember to run npm install in server folder

const app = express();

// Connect Database
connectDB();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    // rootValue: root,
    graphiql: true, //process.env.NODE_ENV === "development",
  })
);
app.listen(
  port,
  console.log(
    `Server is running on port ${port}. http://localhost:${port}/graphql`
  )
);
