async function feed(parent, args, context, info) {
	const count = await context.prisma
		.linksConnection({
			where: {
				OR: [
					{ description_contains: args.filter },
					{ url_contains: args.filter }
				]
			}
		})
		.aggregate()
		.count();

	const links = await context.prisma.links({
		where: {
			OR: [{ description_contains: args.filter }, { url_contains: args.filter }]
		},
		skip: args.skip,
		first: args.first,
		orderBy: args.orderBy
	});
	return {
		count,
		links
	};
	// const where = args.filter
	// 	? {
	// 			OR: [
	// 				{ description_contains: args.filter },
	// 				{ url_contains: args.filter }
	// 			]
	// 	  }
	// 	: {};

	// const links = await context.prisma.links({
	// 	where,
	// 	skip: args.skip,
	// 	first: args.first,
	// 	orderBy: args.orderBy
	// });

	// const count = await context.prisma
	// 	.linksConnection({
	// 		where
	// 	})
	// 	.aggregate()
	// 	.count();
	// return {
	// 	links,
	// 	count
	// };
}

// function feed(parent, args, context, info) {
// 	return context.prisma.links();
// }

module.exports = {
	feed
};
