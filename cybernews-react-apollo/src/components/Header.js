import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { AUTH_TOKEN } from '../constants';
import logo from '../styles/logo.png';
// ! TODO adjust header links for mid-range media querie
// ! links should slide underneath logo
class Header extends Component {
	render() {
		const authToken = localStorage.getItem(AUTH_TOKEN);
		return (
			<div className="tc pv3 pv4-ns green">
				<img
					src={logo}
					className="br-100 pa1 ba b--black-10 h3 w3 shadow-4"
					alt="CyberNews"
				/>
				<nav className="dt w-100 border-box pa3 ph5-ns">
					{/* <a
						href="/top"
						title="CyberNews Top page"
					>
						<img src={logo} className="dib w4 h4 br-100" alt="CyberNews" />
					</a> */}
					<div className="flex justify-center space-evenly">
						<Link to="/" className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns">
							| new |
						</Link>
						<Link
							to="/top"
							className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns"
						>
							| top |
						</Link>
						<Link
							to="/search"
							className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns"
						>
							| search |
						</Link>
						{authToken && (
							<Link
								to="/create"
								className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns"
							>
								| submit |
							</Link>
						)}
						{authToken ? (
							<Link
								className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns"
								onClick={() => {
									localStorage.removeItem(AUTH_TOKEN);
									this.props.history.push('/');
								}}
								to="/"
							>
								{' '}
								| logout |
							</Link>
						) : (
							<Link
								to="/login"
								className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns"
							>
								| login |
							</Link>
						)}
					</div>
				</nav>
			</div>
			// <div className="flex pa1 justify-between wrap green">
			// <nav className="dt w-100 border-box pa3 ph5-ns">
			// 	<a
			// 		// className="dtc v-mid mid-gray link dim w-25"
			// 		href="/top"
			// 		title="CyberNews Top page"
			// 	>
			// 		<img src={logo} className="dib w4 h4 br-100" alt="CyberNews" />
			// 	</a>
			// 	<div className="dtc v-mid w-75 tr">
			// 		<Link to="/" className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns">
			// 			| new |
			// 		</Link>
			// 		<Link
			// 			to="/top"
			// 			className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns"
			// 		>
			// 			| top |
			// 		</Link>
			// 		<Link
			// 			to="/search"
			// 			className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns"
			// 		>
			// 			| search |
			// 		</Link>
			// 		{authToken && (
			// 			<Link
			// 				to="/create"
			// 				className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns"
			// 			>
			// 				| submit |
			// 			</Link>
			// 		)}
			// 		{authToken ? (
			// 			<Link
			// 				className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns"
			// 				onClick={() => {
			// 					localStorage.removeItem(AUTH_TOKEN);
			// 					this.props.history.push('/');
			// 				}}
			// 				to="/"
			// 			>
			// 				{' '}
			// 				| logout |
			// 			</Link>
			// 		) : (
			// 			<Link
			// 				to="/login"
			// 				className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns"
			// 			>
			// 				| login |
			// 			</Link>
			// 		)}
			// 	</div>
			// </nav>
			// </div>
		);
	}
}

export default withRouter(Header);
