const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

// resolvers object is the actual GraphQL schema
const resolvers = {
  Query: {
    info: () => `This is the API of a Cybernews`,
    feed: (root, args, context, info) => {
      return context.db.query.links({}, info)
    }
  },
  Mutation: { // args carry the information needed for the operation (post needs => description & url args)
    post: (root, args, context, info) => {
      return context.db.mutation.createLink({
        data: {
          url: args.url,
          description: args.description,
        },
      }, info)
    },
  }
}
// using GraphQLServer to bundle schema and resolvers
// GraphQLServer will tell the server what API operations
// are accepted and how they should be resolved
// referencing schema definition in another file
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://us1.prisma.sh/public-blueogre-607/cybernews-node/dev',
      secret: 'mysecret123',
      debug: true,
    }),
  }),
})

server.start(() => console.log(`Server is running on http://localhost4000`));
