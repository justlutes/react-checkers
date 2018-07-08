import * as React from 'react';
import styled from '../theme';

const Grab = styled.div`
  cursor: grab;
  transform: translate(0, 0);
`;

interface IProps {
  data: string;
  handleDrag: (d: string) => void;
  children: React.ReactChild;
  className?: string;
}

export default function Draggable({ children, className, data, handleDrag }: IProps) {
  const handleDragStart = ({ dataTransfer }: { dataTransfer: DataTransfer }) => {
    dataTransfer.dropEffect = 'copy';
    dataTransfer.setData('text/plain', data);
    handleDrag(data);
  };
  return (
    <Grab draggable onDragStart={handleDragStart} className={className}>
      {children}
    </Grab>
  );
}
