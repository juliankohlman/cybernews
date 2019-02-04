import gql from 'graphql-tag';
// query that will be sent to the API
// using the gql parser function to parse the plain string

export const FEED_QUERY = gql`
	query FeedQuery($first: Int, $skip: Int, $orderBy: LinkOrderByInput) {
		feed(first: $first, skip: $skip, orderBy: $orderBy) {
			links {
				id
				createdAt
				url
				description
				postedBy {
					id
					name
				}
				votes {
					id
					user {
						id
					}
				}
			}
			count
		}
	}
`;
