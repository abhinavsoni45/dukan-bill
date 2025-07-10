import React from 'react';
import { useModal } from '../../context/modalContext';
import InterestCalculatorModal from './InterestCalculatorModal';

const TryME: React.FC = () => {
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal(
      'Interest Calculator',
      <InterestCalculatorModal startDate={new Date('2024-01-01')} amount={10000} />,
      {}
    );
  };

  return (
    <div>
      <h1>Modal Demo</h1>
      <button onClick={handleOpenModal}>Open Interest Calculator</button>
    </div>
  );
};

export default TryME;