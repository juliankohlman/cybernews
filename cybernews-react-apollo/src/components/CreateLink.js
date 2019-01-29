import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { FEED_QUERY } from '../queries/feedQuery';
import { LINKS_PER_PAGE } from '../constants';
import { POST_MUTATION } from '../queries/postMutation';

class CreateLink extends Component {
	state = {
		description: '',
		url: ''
	};

	render() {
		const { description, url } = this.state;
		return (
			<div style={{ minHeight: '75vh' }}>
				<div className="flex justify-center pa4">
					<input
						className="mb2"
						value={description}
						onChange={e => this.setState({ description: e.target.value })}
						type="text"
						placeholder="A description for the link"
					/>
					<input
						className="mb2"
						value={url}
						onChange={e =>
							this.setState({
								url: e.target.value
							})
						}
						type="text"
						placeholder="A URL for the link"
					/>

					<Mutation
						mutation={POST_MUTATION}
						variables={{ description, url }}
						onCompleted={() => this.props.history.push('/new/1')}
						update={(store, { data: { post } }) => {
							const first = LINKS_PER_PAGE;
							const skip = 0;
							const orderBy = 'createdAt_DESC';
							const data = store.readQuery({
								query: FEED_QUERY,
								variables: { first, skip, orderBy }
							});
							data.feed.links.unshift(post);
							store.writeQuery({
								query: FEED_QUERY,
								data,
								variables: { first, skip, orderBy }
							});
						}}
					>
						{postMutation => <button onClick={postMutation}>Submit</button>}
					</Mutation>
				</div>
			</div>
		);
	}
}

export default CreateLink;
