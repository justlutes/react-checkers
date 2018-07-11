import * as React from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import styled from '../../../theme';

const Form = styled.form`
  position: relative;
  width: 100%;
  max-width: 95%;
  margin-top: 60px;
  transition-property: opacity, transform;
  transition-duration: 0.35s;
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
`;

const Row = styled.div`
  display: flex;
  margin: 0 5px 10px;
  width: 100%;
  align-items: center;
`;

interface IProps {
  createRoom: any;
  joinRoom: any;
}

interface IState {
  roomId: string;
}

export class EnterGame extends React.PureComponent<IProps, IState> {
  public state = {
    roomId: '',
  };

  public handleRoomChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ roomId: e.target.value });

  public handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { roomId } = this.state;
    if (roomId !== '') {
      try {
        this.props.joinRoom(roomId);
      } catch (e) {
        console.error(e);
      }
    }
  };

  public render() {
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Input type="tel" placeholder="12345" onChange={this.handleRoomChange} />
            <Button text="Join Room" />
            <Button text="Create A New Room" onClick={this.props.createRoom} />
          </Row>
        </Form>
      </React.Fragment>
    );
  }
}
