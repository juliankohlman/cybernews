// fetches the link using prisma client
// then invokes postedBy on the link b/c it will resolve
// the postedBy field on the Link type from the graphql Schema

function votes(parent, args, context) {
	return context.prisma.link({ id: parent.id }).votes();
}

function postedBy(parent, args, context) {
	return context.prisma.link({ id: parent.id }).postedBy();
}

module.exports = {
	postedBy,
	votes
};
