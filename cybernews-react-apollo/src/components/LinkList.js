import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Link from './Link';
import gql from 'graphql-tag';

// query that will be sent to the API
// using the gql parser function to parse the plain string
const FEED_QUERY = gql`
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

class LinkList extends Component {
	render() {
		return (
			<Query query={FEED_QUERY}>
				{/* Render prop function */}
				{/* Render prop function contains props or info about the 'state' of the network request */}
				{/* Always check data.loading and data.error b/f rendering */}
				{({ loading, error, data }) => {
					console.log(data);
					console.log(error);
					// (add a loading animation!)
					// (add an error graphic)
					if (loading) return <div>Fetching Links</div>;
					if (error) return <div>Error fetching links</div>;

					const feedLinks = data.feed.links;

					return (
						<div>
							{feedLinks.map((link, index) => (
								<Link key={link.id} link={link} index={index} />
							))}
						</div>
					);
				}}
			</Query>
		);
	}
}

export default LinkList;
