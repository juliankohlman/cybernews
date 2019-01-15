import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { AUTH_TOKEN } from '../constants';
import logo from '../styles/logo.png';

class Header extends Component {
	render() {
		const authToken = localStorage.getItem(AUTH_TOKEN);
		return (
			<div className="flex pa1 justify-between nowrap green">
				<nav class="dt w-100 border-box pa3 ph5-ns">
					<a class="dtc v-mid mid-gray link dim w-25" href="#" title="Home">
						<img src={logo} class="dib w4 h4 br-100" alt="Site Name" />
					</a>
					<div class="dtc v-mid w-75 tr">
						<Link to="/" className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns">
							new
						</Link>
						<Link
							to="/top"
							className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns"
						>
							top
						</Link>
						<Link
							to="/search"
							className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns"
						>
							search
						</Link>
						{authToken && (
							<div className="flex">
								<div className="ml1">|</div>
								<Link
									to="/create"
									className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns"
								>
									submit
								</Link>
							</div>
						)}
						{authToken ? (
							<div
								className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns"
								onClick={() => {
									localStorage.removeItem(AUTH_TOKEN);
									this.props.history.push('/');
								}}
							>
								logout
							</div>
						) : (
							<Link
								to="/login"
								className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns"
							>
								login
							</Link>
						)}
					</div>
				</nav>
				{/*<div className="flex flex-fixed black">
					 TODO add logo to header top left corner 
					<div className="fw7 mr1">CyberNews</div>
					<img src={logo} className="w5 h5" alt="logo" />
					<div className="ml1">|</div>
					<Link to="/" className="ml1 no-underline black">
						new
					</Link>
					<div className="ml1">|</div>
					<Link to="/top" className="ml1 no-underline black">
						top
					</Link>
					<div className="ml1">|</div>
					<Link to="/search" className="ml1 no-underline black">
						search
					</Link>
					{authToken && (
						<div className="flex">
							<div className="ml1">|</div>
							<Link to="/create" className="ml1 no-underline black">
								submit
							</Link>
						</div>
					)}
				</div>*/}
				{/* <div className="flex flex-fixed">
					{authToken ? (
						<div
							className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns"
							onClick={() => {
								localStorage.removeItem(AUTH_TOKEN);
								this.props.history.push('/');
							}}
						>
							logout
						</div>
					) : (
						<Link
							to="/login"
							className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns"
						>
							login
						</Link>
					)}
          </div> */}
			</div>
		);
	}
}

export default withRouter(Header);
