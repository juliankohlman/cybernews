import React, { Component } from 'react';

// ! use styled-components for Link Component styling
class Link extends Component {
	render() {
		const authToken = localStorage.getItem(AUTH_TOKEN);
		return (
			<div className="flex mt2 items-start">
				<div className="flex items-center">
					<span className="gray">{this.props.index + 1}.</span>
					{authToken && (
						<div classname="ml1 gray f11" onClick={() => this._voteForLink()}>
							▲
						</div>
					)}
				</div>
				<div className="ml1">
					<div>
						{this.props.link.description} ({this.props.url})
					</div>
					<div className="f6 lh-copy gray">
						{this.props.links.votes.length} votes | by{' '}
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
