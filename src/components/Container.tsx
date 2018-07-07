import * as React from 'react';
import styled, { theme } from '../theme';

const Wrapper = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: ${theme.secondaryColor};
  height: 100vh;
  width: 100%;
`;

const Padding = styled.div`
  padding: 60px 40px;
  display: flex;
  width: 75%;
  align-items: center;
  flex-direction: column;
`;

interface IProps {
  children?: React.ReactChild | React.ReactChild[];
}
export default function Container({ children }: IProps) {
  return (
    <Wrapper>
      <Padding>{children}</Padding>
    </Wrapper>
  );
}
