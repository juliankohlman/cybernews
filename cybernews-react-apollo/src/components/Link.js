import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { AUTH_TOKEN } from '../constants';
import { timeDifferenceForDate } from '../utils';
import { VOTE_MUTATION } from '../queries/voteMutation';

// * TODO: use styled-components for Link Component styling
class Link extends Component {
	render() {
		const authToken = localStorage.getItem(AUTH_TOKEN);
		const shortLink = this.props.link.url
			.split(/\W+/)
			.filter(i => i !== 'https' && i !== 'http' && i !== 'www')
			.slice(0, 2)
			.join('.');
		return (
			<div className="flex mt2 items-start">
				<div className="flex items-center">
					<span className="gray">{this.props.index + 1}.</span>
					{authToken && (
						<Mutation
							mutation={VOTE_MUTATION}
							variables={{ linkId: this.props.link.id }}
							update={(store, { data: { vote } }) =>
								this.props.updateStoreAfterVote(store, vote, this.props.link.id)
							}
						>
							{voteMutation => (
								<div className="ml1 gray f11 pointer" onClick={voteMutation}>
									▲
								</div>
							)}
						</Mutation>
					)}
				</div>
				<div className="ml1">
					<div>
						<a
							href={this.props.link.url}
							className="listed_link dim"
							target="_blank"
						>
							{this.props.link.description}
						</a>{' '}
						<a
							href={this.props.link.url}
							className="url_display underline-hover"
							target="_blank"
						>
							({shortLink})
						</a>
					</div>
					<div className="f6 lh-copy gray">
						{this.props.link.votes.length} votes | by{' '}
						{this.props.link.postedBy
							? this.props.link.postedBy.name
							: 'Unknown'}{' '}
						{timeDifferenceForDate(this.props.link.createdAt)}
					</div>
				</div>
			</div>
		);
	}
}

export default Link;
