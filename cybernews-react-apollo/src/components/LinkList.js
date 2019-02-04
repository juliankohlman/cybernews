import React, { Component, Fragment } from 'react';
import Link from './Link';
import { Query } from 'react-apollo';

import { LINKS_PER_PAGE } from '../constants';
import { FEED_QUERY } from '../queries/feedQuery';
import { NEW_LINKS_SUBSCRIPTION } from '../queries/newlinksSubscription';
import { NEW_VOTES_SUBSCRIPTION } from '../queries/newvotesSubscription';

class LinkList extends Component {
	_nextPage = data => {
		const page = parseInt(this.props.match.params.page, 10);
		if (page <= data.feed.count / LINKS_PER_PAGE) {
			const nextPage = page + 1;
			this.props.history.push(`/new/${nextPage}`);
		}
	};

	_previousPage = () => {
		const page = parseInt(this.props.match.params.page, 10);
		if (page > 1) {
			const previousPage = page - 1;
			this.props.history.push(`/new/${previousPage}`);
		}
	};

	_getLinksToRender = data => {
		const isNewPage = this.props.location.pathname.includes('new');
		if (isNewPage) return data.feed.links;

		const rankedLinks = data.feed.links.slice();
		rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length);
		return rankedLinks;
	};

	_getQueryVariables = () => {
		const isNewPage = this.props.location.pathname.includes('new');
		const page = parseInt(this.props.match.params.page, 10);

		const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
		const first = isNewPage ? LINKS_PER_PAGE : 100;
		const orderBy = isNewPage ? 'createdAt_DESC' : null;
		return { first, skip, orderBy };
	};

	_subscribeToNewVotes = subscribeToMore => {
		subscribeToMore({
			document: NEW_VOTES_SUBSCRIPTION
		});
	};

	_updateCacheAfterVote = (store, createVote, linkId) => {
		const isNewPage = this.props.location.pathname.includes('new');
		const page = parseInt(this.props.match.params.page, 10);

		const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
		const first = isNewPage ? LINKS_PER_PAGE : 100;
		const orderBy = isNewPage ? 'createdAt_DESC' : null;
		const data = store.readQuery({
			query: FEED_QUERY,
			variables: { first, skip, orderBy }
		});

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
			<div style={{ minHeight: '75vh' }}>
				<Query query={FEED_QUERY} variables={this._getQueryVariables()}>
					{/* Render prop function */}
					{/* Render prop function contains props or info about the 'state' of the network request */}
					{/* Always check data.loading and data.error b/f rendering */}
					{({ loading, error, data, subscribeToMore }) => {
						// console.log(error);

						// (add a loading animation!)
						if (loading) return <div>Fetching Links</div>;
						// (add an error graphic)
						if (error) return <div>Error fetching links</div>;

						this._subscribeToNewLinks(subscribeToMore);
						this._subscribeToNewVotes(subscribeToMore);

						const linksToRender = this._getLinksToRender(data);
						const isNewPage = this.props.location.pathname.includes('new');
						const pageIndex = this.props.match.params.page
							? (this.props.match.params.page - 1) * LINKS_PER_PAGE
							: 0;

						// const feedLinks = data.links;

						return (
							<Fragment>
								{linksToRender.map((link, index) => (
									<Link
										key={link.id}
										link={link}
										index={index + pageIndex}
										updateStoreAfterVote={this._updateCacheAfterVote}
									/>
								))}
								{isNewPage && (
									<div className="flex ml4 mv3 gray">
										<div className="pointer mr2" onClick={this._previousPage}>
											Previous
										</div>
										<div
											className="pointer"
											onClick={() => this._nextPage(data)}
										>
											Next
										</div>
									</div>
								)}
							</Fragment>
						);
					}}
				</Query>
			</div>
		);
	}
}

export default LinkList;
