import * as React from 'react';
import styled from '../theme';

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
  width: 100%;
`;

interface IProps {
  children?: React.ReactChild | React.ReactChild[];
}
export default function Container({ children }: IProps) {
  return <Wrapper>{children}</Wrapper>;
}
