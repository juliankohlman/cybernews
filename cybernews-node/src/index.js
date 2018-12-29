const { GraphQLServer } = require('graphql-yoga');

// * Dummy data
let links = [
	{
		id: 'link-0',
		url: 'www.howtographql.com',
		description: 'Fullstack tutorial for GraphQL'
	}
];
let idCount = links.length;
// * End Dummy data

// implementation of your schema (structure is identical to schema)
// context gets passed through the resolver chain allowing every resolver to read/write from or to it.
// the server invokes all resolver functions for the fields contained in a query
const resolvers = {
	Query: {
		info: () => `This is the API for the cybernews app`,
		feed: () => links,
		link: (parent, args) => {
			return links[args.id];
		}
	},
	Mutation: {
		post: (parent, args) => {
			const link = {
				id: `link-${idCount++}`,
				description: args.description,
				url: args.url
			};
			links.push(link);
			return link;
		},
		updateLink: (parent, args) => {
			const update = {
				id: `link-${args.id}`,
				description: args.description,
				url: args.url
			};
			// console.log(update);
			// console.log(links[args.id]);
			Object.assign(links[args.id], update);
			return update;
		},
		deleteLink: (parent, args) => {
			// links.filter(link => link.id !== `link-${args.id}`);
			// console.log(links);
			// return links[args.id];
		}
	}
};

// when type of root field is an object type (selection set includes: at least one of its fields)

// passing accepted operations to server, and telling the server how to 'resolve' those operations
const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers
});

server.start(() => console.log(`Server is running at http://localhost:4000`));
