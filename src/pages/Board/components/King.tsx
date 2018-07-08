import * as React from 'react';
import styled from '../../../theme';
import { ColorValues } from '../../../enum';

interface IBaseProps {
  children?: React.ReactChild;
  className?: string;
  value: ColorValues;
}

const CheckerBase: React.SFC<IBaseProps> = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const StyledChecker = styled(CheckerBase)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: 4px solid white;
  cursor: pointer;
  background: ${props => (props.value === 'red' ? '#CC0000' : '#000')};
`;

export function King({ value }: any) {
  return (
    <StyledChecker value={value}>
      <svg version="1.1" x="0px" y="0px" viewBox="0 0 512 512" style={{ width: 30, height: 30 }}>
        <path
          fill="#777"
          d="M416,436H96c-8.805,0-16.574-5.758-19.135-14.183l-76-250
	c-2.313-7.61,0.103-15.868,6.153-21.031c6.05-5.163,14.584-6.25,21.737-2.769l109.444,53.28L240.891,82.896
	C244.69,78.516,250.202,76,256,76c5.798,0,11.311,2.516,15.109,6.896l102.692,118.402l109.444-53.28
	c7.153-3.482,15.688-2.394,21.736,2.769c6.051,5.163,8.467,13.421,6.153,21.031l-76,250C432.574,430.242,424.804,436,416,436z
	 M110.823,396h290.352l58.353-191.948l-82.022,39.931c-8.141,3.963-17.93,1.963-23.862-4.878L256,126.525l-97.643,112.58
	c-5.933,6.84-15.719,8.842-23.863,4.878l-82.022-39.931L110.823,396z"
        />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
      </svg>
    </StyledChecker>
  );
}
