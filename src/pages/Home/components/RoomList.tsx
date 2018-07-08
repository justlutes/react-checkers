import * as React from 'react';
import styled, { theme } from '../../../theme';
import Button from '../../../components/Button';

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

interface IProps {
  handleClick: (i: string) => void;
  rooms: string[];
}

export function RoomList({ handleClick, rooms }: IProps) {
  return (
    <List>
      {rooms.map(id => (
        <Room key={id}>
          <ID>{id}</ID>
          <Button text="Join" onClick={() => handleClick(id)} />
        </Room>
      ))}
    </List>
  );
}
