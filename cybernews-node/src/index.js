const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
// implementation of your schema (structure is identical to schema)
// context gets passed through the resolver chain allowing every resolver to read/write from or to it.
// the server invokes all resolver functions for the fields contained in a query

// Prisma client exposes CRUD API for the models in your datamodel allowing you to read/write to your database.
// the methods are auto-generated bases on model definitions found in datamodel.prisma
const resolvers = {
	// * import and use the prisma clients to access database from inside resolver functions
	Query: {
		info: () => `This is the API for the cybernews app`,
		feed: (root, args, context, info) => {
			return context.prisma.links();
		},
		link: (root, args, context, info) => {
			return context.prisma.link();
		}
	},
	Mutation: {
		post: (root, args, context) => {
			return context.prisma.createLink({
				url: args.url,
				description: args.description
			});
		}
		// updateLink: (parent, args) => {
		// 	const update = {
		// 		id: `link-${args.id}`,
		// 		description: args.description,
		// 		url: args.url
		// 	};
		// 	Object.assign(links[args.id], update);
		// 	return update;
		// },
		// deleteLink: (parent, args) => {
		// links.filter(link => link.id !== `link-${args.id}`);
		// console.log(links);
		// return links[args.id];
		// }
	}
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

server.start(() => console.log(`Server is running at http://localhost:4000`));
