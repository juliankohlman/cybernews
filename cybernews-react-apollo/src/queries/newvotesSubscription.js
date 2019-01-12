import gql from 'graphql-tag';

export const NEW_VOTES_SUBSCRIPTION = gql`
	subscription {
		newVote {
			id
			link {
				id
				url
				description
				createdAt
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
			user {
				id
			}
		}
	}
`;
