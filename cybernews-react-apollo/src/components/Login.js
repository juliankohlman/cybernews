import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { AUTH_TOKEN } from '../constants';

// ! TODO replace storing of JWTs in localStorage with Auth0 Login approach
//** signup and login mutations */
const SIGNUP_MUTATION = gql`
	mutation SignupMutation($email: String!, $password: String!, $name: String!) {
		signup(email: $email, password: $password, name: $name) {
			token
		}
	}
`;

const LOGIN_MUTATION = gql`
	mutation LoginMutation($email: String!, $password: String!) {
		signup(email: $email, password: $password) {
			token
		}
	}
`;

class Login extends Component {
	state = {
		login: true,
		email: '',
		password: '',
		name: ''
	};
	render() {
		const { login, email, password, name } = this.state;

		return (
			<div>
				{' '}
				<h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
				<div className="flex flex-column">
					{!login && (
						<input
							value={name}
							type="text"
							onChange={e => this.setState({ name: e.target.value })}
							placeholder="Your name"
						/>
					)}
					<input
						value={email}
						type="text"
						onChange={e => this.setState({ email: e.target.value })}
						placeholder="Your email address"
					/>
					<input
						value={password}
						type="password"
						onChange={e => this.setState({ password: e.target.value })}
						placeholder="Choose a safe password"
					/>
				</div>
				<div className="flex mt3">
					<div className="pointer mr2 button" onClick={() => this._confirm()}>
						{login ? 'login' : 'create account'}
					</div>
					<div
						className="pointer button"
						onClick={() => this.setState({ login: !login })}
					>
						{' '}
						{login ? 'need to create an account?' : 'already have an account?'}
					</div>
				</div>
			</div>
		);
	}
}

// _confirm = async () => {};

// _saveUserData = token => {
// 	localStorage.setItem(AUTH_TOKEN, token);
// };

export default Login;
