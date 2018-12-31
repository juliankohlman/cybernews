const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils.js');

async function signup(parent, args, context, info) {
	// encrypt password
	const password = await bcrypt.hash(args.password, 10);

	// store user in db
	const user = await context.prisma.createUser({ ...args, password });

	// generate jwt
	const token = jwt.sign({ userId: user.id }, APP_SECRET);

	// return token and user which matches the AuthPayload object in graphql schema
	return { token, user };
}

async function login(parent, args, context, info) {
	// retrieve user by email
	const user = await context.prisma.user({ email: args.email });
	if (!user) throw new Error('User not found');

	// compare passwords
	const valid = await bcrypt.compare(args.password, user.password);
	if (!valid) throw new Error('Invalid password');

	const token = jwt.sign({ userId: user.id }, APP_SECRET);
	// return user and token
	return { token, user };
}

function post(parent, args, context, info) {
  const userId = getUserId(context)
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect : { id: userId }}
  })
}

module.exports = { signup, login, post };
