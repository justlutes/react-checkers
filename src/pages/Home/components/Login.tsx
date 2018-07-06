import * as React from 'react';

interface IProps {
  loginUser: any;
}
interface IState {
  email: string;
  password: string;
}
export class Login extends React.Component<IProps, IState> {
  public state = {
    email: '',
    password: '',
  };

  public handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ email: e.target.value });
  public handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ password: e.target.value });

  public handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email !== '' || password !== '') {
      this.props.loginUser(email, password);
    }
  };
  public render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleEmailChange} placeholder="email" />
          <input type="password" onChange={this.handlePassChange} placeholder="password" />
          <button>Login</button>
        </form>
      </div>
    );
  }
}
