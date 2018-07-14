import * as React from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import styled from '../../../theme';

interface ILabelProps {
  text: string;
  active: boolean;
  className?: string;
  onClick: () => void;
}

function NavLabel({ className, onClick, text }: ILabelProps) {
  return (
    <span onClick={onClick} className={className}>
      {text}
    </span>
  );
}

const Nav = styled(NavLabel)`
  cursor: pointer;
  color: #424770;
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    height: 2px;
    background: ${props => (props.active ? '#6772e5' : 'transparent')};
    left: 0;
    bottom: -4px;
    right: ${props => (props.active ? 0 : '400px')};
    transition: right 400ms cubic-bezier(1, 0, 0, 1), background 400ms cubic-bezier(1, 0, 0, 1) 0ms;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 20px;
  margin-bottom: 15px;
`;

const Form = styled.form`
  position: relative;
  padding: 10px 18px 20px 24px;
  width: 100%;
  max-width: 500px;
  transition-property: opacity, transform;
  transition-duration: 0.35s;
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
`;

const FieldSet = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
`;

const SubmitRow = styled.div`
  padding: 12px 0 0;
  display: flex;
  justify-content: flex-end;
`;

interface IProps {
  createUser: (e: string, p: string, u: string) => void;
  loginUser: (e: string, p: string) => void;
}
interface IState {
  email: string;
  password: string;
  formIndex: boolean;
  username: string;
}

export class Login extends React.Component<IProps, IState> {
  public state = {
    email: '',
    formIndex: true,
    password: '',
    username: '',
  };

  public handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ email: e.target.value });
  public handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ password: e.target.value });
  public handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ username: e.target.value });

  public handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password, username } = this.state;
    if (email !== '' || password !== '') {
      if (this.state.formIndex) {
        try {
          this.props.loginUser(email, password);
        } catch (e) {
          console.error(e);
        }
      } else {
        try {
          this.props.createUser(email, password, username);
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  public handleFormChange = () => this.setState({ formIndex: !this.state.formIndex });

  public render() {
    return (
      <React.Fragment>
        <HeaderRow>
          <Nav text="Log In" active={this.state.formIndex} onClick={this.handleFormChange} />
          <Nav text="Sign Up" active={!this.state.formIndex} onClick={this.handleFormChange} />
        </HeaderRow>
        <Form onSubmit={this.handleSubmit}>
          <FieldSet>
            {!this.state.formIndex && (
              <Input
                label="Your username"
                id="signinusername"
                type="text"
                onChange={this.handleUserChange}
                placeholder="jdoe"
              />
            )}
            <Input
              label="Your email address"
              id="signinemail"
              type="email"
              onChange={this.handleEmailChange}
              placeholder="jane@doe.com"
            />
            <Input
              label="Your password"
              id="signinpassword"
              type="password"
              onChange={this.handlePassChange}
              placeholder="123abc"
            />
          </FieldSet>
          <SubmitRow>
            <Button text={this.state.formIndex ? 'Login' : 'Sign up'} />
          </SubmitRow>
        </Form>
      </React.Fragment>
    );
  }
}
