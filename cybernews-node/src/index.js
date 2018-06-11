const { GraphQLServer } = require('graphql-yoga');

// GraphQL schema def
// exclamation mark in typedef means field can never be null
const typeDefs = `
type Query {
  info: String!
}
`
// resolvers object is the actual GraphQL schema
const resolvers = {
  Query: {
    info: () => `This is the API of a Cybernews`
  }
}

// using GraphQLServer to bundle schema and resolvers
// GraphQLServer will tell the server what API operations
// are accepted and how they should be resolved
const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost4000`));
