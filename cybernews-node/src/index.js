const { GraphQLServer } = require('graphql-yoga');

// dummy link data
let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]
// generate unique ids for incoming links
let idCount = links.length

// resolvers object is the actual GraphQL schema
const resolvers = {
  Query: {
    info: () => `This is the API of a Cybernews`,
    feed: () => links,
    link: (root, args) => links.find(l => l.id === args.id)
  },
  Mutation: { // args carry the information needed for the operation (post needs => description & url args)
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }
      links.push(link)
      return link
    }
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
