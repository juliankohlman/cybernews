import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Link from './Link';
import gql from 'graphql-tag';

const FEED_QUERY = gql`
	{
		feed {
			links {
				id
				url
				description
			}
		}
	}
`;

export class LinkList extends Component {
	render() {
		return (
			<Query query={FEED_QUERY}>
				{({ loading, error, data }) => {
					console.log(data);
					// (add a loading animation!)
					// (add an error graphic)
					if (loading) return <div>Fetching </div>;
					if (error) return <div>Error</div>;

					const linksToRender = data.feed.links;

					return (
						<div>
							{linksToRender.map(link => (
								<li>
									<Link key={link.id} link={link} />
								</li>
							))}
						</div>
					);
				}}
			</Query>
		);
	}
}

export default LinkList;
