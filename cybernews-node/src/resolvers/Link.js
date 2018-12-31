// fetches the link using prisma client
// then invokes postedBy on the link b/c it will resolve
// the postedBy field on the Link type from the graphql Schema

function postedBy(parent, args, context) {
	return context.prisma.link({ id: parent.id }).postedBy();
}

module.exports = {
	postedBy
};
