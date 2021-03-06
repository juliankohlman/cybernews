import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { LOGIN_MUTATION } from '../queries/loginMutation';
import { SIGNUP_MUTATION } from '../queries/signupMutation';
import { AUTH_TOKEN } from '../constants';

//TODO replace storing of JWTs in localStorage with Auth0 Login approach
// * https://auth0.com/docs/quickstart/spa/react/01-login#configure-auth0
//Todo incorporate jsdocs into project for thorough documentation
/**
 * Login
 */
class Login extends Component {
	state = {
		login: true,
		email: '',
		password: '',
		name: ''
	};

	_confirm = async data => {
		const { token } = this.state.login ? data.login : data.signup;
		this._saveUserData(token);
		this.props.history.push('/');
	};

	_saveUserData = token => {
		localStorage.setItem(AUTH_TOKEN, token);
	};

	render() {
		const { login, email, password, name } = this.state;

		return (
			<div style={{ minHeight: '75vh' }}>
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
					<Mutation
						mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
						variables={{ email, password, name }}
						onCompleted={data => this._confirm(data)}
					>
						{mutation => (
							<div className="pointer mr2 button" onClick={mutation}>
								{login ? 'login' : 'create account'}
							</div>
						)}
					</Mutation>
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

export default Login;
