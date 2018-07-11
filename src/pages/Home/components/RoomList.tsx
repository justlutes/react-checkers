import * as React from 'react';
import styled, { theme } from '../../../theme';
import Button from '../../../components/Button';

const List = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 95%;
`;

const Room = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-items: space-around;
  &:not(:first-child) {
    margin-top: 10px;
  }
`;

const ID = styled.span`
  color: ${theme.primaryColor};
  width: 255px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Ongoing = styled.div`
  position: relative;
  &::after {
    content: '';
    position: absolute;
    height: 110%;
    right: -10%;
    top: 0;
    width: 2px;
    background: #e2e2e2;
  }
`;

interface IProps {
  handleClick: (i: string) => void;
  rooms: {
    joinedRooms: string[];
    waitingRooms: string[];
  };
}

export function RoomList({ handleClick, rooms }: IProps) {
  return (
    <List>
      <Ongoing>
        <h3>Your Ongoing Games</h3>
        {rooms.joinedRooms.map(id => (
          <Room key={id}>
            <ID>{id}</ID>
            <Button text="Join" onClick={() => handleClick(id)} />
          </Room>
        ))}
      </Ongoing>
      <div>
        <h3>Available Games</h3>
        {rooms.waitingRooms.map(id => (
          <Room key={id}>
            <ID>{id}</ID>
            <Button text="Join" onClick={() => handleClick(id)} />
          </Room>
        ))}
      </div>
    </List>
  );
}
