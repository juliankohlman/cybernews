const { GraphQLServer } = require('graphql-yoga');

// The Schema
// info === a field with a type of string than cannot be null
const typeDefs = `
  type Query {
    info: String!
  }
`;

// implementation of your schema (structure is identical to schema)
const resolvers = {
	Query: {
		info: () => `This is the API for the cybernews app`
	}
};

// passing accepted operations to server, and telling the server how to 'resolve' those operations
const server = new GraphQLServer({
	typeDefs,
	resolvers
});

server.start(() => console.log(`Server is running of http://localhost:4000`));
