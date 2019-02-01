const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const cors = require('cors');
// resolvers
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');
const Subscription = require('./resolvers/Subscription');
const Vote = require('./resolvers/Vote');
const path = require('path');
// implementation of your schema (structure is identical to schema)
// context gets passed through the resolver chain allowing every resolver to read/write from or to it.
// the server invokes all resolver functions for the fields contained in a query

// Prisma client exposes CRUD API for the models in your datamodel allowing you to read/write to your database.
// the methods are auto-generated bases on model definitions found in datamodel.prisma
const resolvers = {
	// * import and use the prisma clients to access database from inside resolver functions
	Query,
	Mutation,
	Subscription,
	User,
	Link,
	Vote
};

// when type of root field is an object type (selection set includes: at least one of its fields)
// passing accepted operations to server, and telling the server how to 'resolve' those operations
const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
	context: request => {
		return {
			...request,
			prisma
		};
	}
});

server.use(cors());

const options = {
	port: 4000,
	endpoint: 'https://heroku-demo-e0460895fb.herokuapp.com/links/dev'
	// endpoint: '/graphql'
};

server.start(options, ({ port }) =>
	console.log(`Server is running at port ${port}`)
);
