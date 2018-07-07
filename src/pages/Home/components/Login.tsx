import * as React from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import styled from '../../../theme';

const Container = styled.div`
  margin-top: 70px
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  min-width: 100%;
  min-height: 500px;
  align-items: center;
  border-radius: 4px;
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
`;

const Form = styled.form`
  position: relative;
  width: 100%;
  max-width: 500px;
  transition-property: opacity, transform;
  transition-duration: 0.35s;
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
`;

const InputRow = styled.div`
  display: flex;
  margin: 0 5px 10px;
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
        <Form onSubmit={this.handleSubmit}>
          <InputRow>
            <Input type="email" onChange={this.handleEmailChange} placeholder="Enter your Email" />
          </InputRow>
          <InputRow>
            <Input
              type="password"
              onChange={this.handlePassChange}
              placeholder="Enter your Password"
            />
          </InputRow>
          <Button text="Login" />
        </Form>
      </Container>
    );
  }
}
