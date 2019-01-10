import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Link from './Link';

class Search extends Component {
	state = {
		links: [],
		filter: ''
	};

	_executeSearch = async () => {
		// to do implement asynchronous search method
	};

	render() {
		<div>
			<div>
				Search{' '}
				<input
					type="text"
					onChange={e => this.setState({ filter: e.target.value })}
				/>
				<button onClick={() => this._executeSearch()} OK />
			</div>
			{this.state.links.map((link, index) => (
				<Link key={link.id} link={link} index={index} />
			))}
		</div>;
	}
}

export default withApollo(Search);
