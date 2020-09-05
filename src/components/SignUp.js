const React = require('react');
const TextInput = require('./TextInput');
const PasswordInput = require('./PasswordInput');
const Button = require('./Button');
const {
	validateName, validatePassword, validateEmail,
	validateConfirmPassword, signUp
} = require('./../services');

class SignUp extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div className="signup">
				<div className="header">
					Sign Up
				</div>
				<div className="body">
					<TextInput id="firstname" label="First Name" validateFunction={validateName} />
					<TextInput id="lastname" label="Last Name" validateFunction={validateName} />
					<TextInput id="email" label="Email" validateFunction={validateEmail} />
					<PasswordInput id="password" label="Password" validateFunction={validatePassword} 
						siblingId="confirm_password" siblingValidateFunction={validateConfirmPassword}
					/>
					<PasswordInput id="confirm_password" label="Confirm Password" 
						validateFunction={validateConfirmPassword} siblingId="password"
					/>
					<Button id="signup_button" icon="icon-user-plus" task={signUp} text="Register" />
					<div className="source-code-link">
						<p>Source code can be found at <a href="#">https://github.com/nfmshow/raisely-signup</a></p>
					</div>
				</div>
			</div>
		)
	}
}

module.exports = SignUp