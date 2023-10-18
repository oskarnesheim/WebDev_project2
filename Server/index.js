import { graphqlHTTP } from "express-graphql";
import graphql, { GraphQLObjectType } from "graphql";
// import data from "./public/data.json" assert { type: "json" };
import express from "express";
import schema from "./schema/schema.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 4000;

const app = express();

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
