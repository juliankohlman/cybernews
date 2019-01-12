import gql from 'graphql-tag';

export const VOTE_MUTATION = gql`
	mutation VoteMutation($linkId: ID!) {
		vote(linkId: $linkId) {
			id
			link {
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
