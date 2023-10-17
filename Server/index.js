
import { graphqlHTTP } from 'express-graphql';
import graphql, { buildSchema, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLObjectType } from 'graphql';
import data from "./public/data.json"
import express from 'express';


const RootQuery = "query"
const RootMutation = "mutation"

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: RootQuery,
        fields: () => ({
        hello: {
            type: GraphQLString,
            resolve: () => "Hello world!",
        },
        }),
    }),
    mutation: new GraphQLObjectType({
        name: RootMutation,
        fields: () => ({
        hello: {
            type: GraphQLString,
            resolve: () => "Hello world!",
        },
        }),
    }),
    })

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return "Hello world!"
  },
}

var app = express()
const PORT = 6969;

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)
app.listen(PORT)
console.log("Running a GraphQL API server at http://localhost:6969/graphql")