import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Link from './Link';
import gql from 'graphql-tag';

// query that will be sent to the API
// using the gql parser function to parse the plain string
export const FEED_QUERY = gql`
	{
		feed {
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
		}
	}
`;

const NEW_LINKS_SUBSCRIPTION = gql`
	subscription {
		newLink {
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
	}
`;

const NEW_VOTES_SUBSCRIPTION = gql`
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

class LinkList extends Component {
	_subscribeToNewVotes = subscribeToMore => {
		subscribeToMore({
			document: NEW_VOTES_SUBSCRIPTION
		});
	};

	_updateCacheAfterVote = (store, createVote, linkId) => {
		const data = store.readQuery({ query: FEED_QUERY });

		const votedLink = data.feed.links.find(link => link.id === linkId);
		votedLink.votes = createVote.link.votes;

		store.writeQuery({ query: FEED_QUERY, data });
	};

	_subscribeToNewLinks = subscribeToMore => {
		subscribeToMore({
			document: NEW_LINKS_SUBSCRIPTION,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev;
				const newLink = subscriptionData.data.newLink;

				return Object.assign({}, prev, {
					feed: {
						links: [newLink, ...prev.feed.links],
						count: prev.feed.links.length + 1,
						__typename: prev.feed.__typename
					}
				});
			}
		});
	};

	render() {
		return (
			<Query query={FEED_QUERY}>
				{/* Render prop function */}
				{/* Render prop function contains props or info about the 'state' of the network request */}
				{/* Always check data.loading and data.error b/f rendering */}
				{({ loading, error, data, subscribeToMore }) => {
					console.log(data);
					console.log(error);
					// (add a loading animation!)
					// (add an error graphic)
					if (loading) return <div>Fetching Links</div>;
					if (error) return <div>Error fetching links</div>;

					this._subscribeToNewLinks(subscribeToMore);
					this._subscribeToNewVotes(subscribeToMore);

					const feedLinks = data.feed.links;

					return (
						<div>
							{feedLinks.map((link, index) => (
								<Link
									key={link.id}
									link={link}
									index={index}
									updateStoreAfterVote={this._updateCacheAfterVote}
								/>
							))}
						</div>
					);
				}}
			</Query>
		);
	}
}

export default LinkList;
