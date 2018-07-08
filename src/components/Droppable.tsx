import * as React from 'react';
import styled from '../theme';

const DropContainer = styled.div`
  width: 100%;
  height: 100%;
`;

interface IProps {
  data: string;
  children?: React.ReactChild;
  onDrop: (t: string, d: string) => void;
}

function handleDragover(event: React.DragEvent<HTMLDivElement>) {
  event.preventDefault();
}

export default function Droppable({ children, data = '', onDrop }: IProps) {
  /** Handles the data transfer of the data being dropped and the data
   *  belonging to this component.
   */
  const handleDrop = ({ dataTransfer }: { dataTransfer: DataTransfer }) => {
    const dataToTransfer = dataTransfer.getData('text');
    onDrop(dataToTransfer, data);
  };

  return (
    <DropContainer onDrop={handleDrop} onDragOver={handleDragover}>
      {children}
    </DropContainer>
  );
}
