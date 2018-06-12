const { GraphQLServer } = require('graphql-yoga');

// dummy link data
let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]


// resolvers object is the actual GraphQL schema
const resolvers = {
  Query: {
    info: () => `This is the API of a Cybernews`,
    feed: () => links,
  },
  Link: {
    // these can be omitted b/c of the nested nature of the schema
    // id: (root) => root.id,
    // description: (root) => root.description,
    // url: (root) => root.url,
  }
}

// using GraphQLServer to bundle schema and resolvers
// GraphQLServer will tell the server what API operations
// are accepted and how they should be resolved
const server = new GraphQLServer({
  // referencing schema definition in another file
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost4000`));
