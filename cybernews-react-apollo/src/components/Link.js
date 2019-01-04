import React, { Component } from 'react';

// ! use styled-components for Link Component styling
class Link extends Component {
	render() {
		return (
			<div>
				<div>
					<li>
						{this.props.link.description}: {this.props.link.url}
					</li>
				</div>
			</div>
		);
	}
}

export default Link;
