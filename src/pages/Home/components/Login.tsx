import * as React from 'react';
import Button from '../../../components/Button';
import styled, { theme } from '../../../theme';

const Container = styled.div`
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 40px;
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${theme.primaryColor};
  color: #777;
  display: inline-block;
  width: auto;
  background: rgba(50, 50, 93, 0.1);
  padding: 0.4rem;
  border-radius: 0;
  &:focus {
    outline: none;
  }
  &:nth-child(2) {
    margin-top: 10px;
  }
`;

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

  public handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email !== '' || password !== '') {
      try {
        this.props.loginUser(email, password);
      } catch (e) {
        console.error(e);
      }
    }
  };
  public render() {
    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <InputContainer>
            <Input type="email" onChange={this.handleEmailChange} placeholder="email" />
            <Input type="password" onChange={this.handlePassChange} placeholder="password" />
          </InputContainer>
          <Button text="Login" />
        </form>
      </Container>
    );
  }
}
