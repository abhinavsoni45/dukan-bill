
import React, { useState, useEffect } from 'react';

interface InterestCalculatorModalProps {
  startDate: Date;
  amount: number;
}

const InterestCalculatorModal: React.FC<InterestCalculatorModalProps> = ({ startDate, amount }) => {
  const [endDate, setEndDate] = useState(new Date());
  const [interest, setInterest] = useState(0);
  const [days, setDays] = useState(0);

  useEffect(() => {
    const timeDiff = endDate.getTime() - startDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setDays(daysDiff);

    const rate = 24;
    const simpleInterest = (amount * rate * daysDiff) / (100 * 365);
    setInterest(simpleInterest);
  }, [startDate, endDate, amount]);

  return (
    <div>
      <h2>Interest Calculator</h2>
      <form>
        <div>
          <label>Start Date:</label>
          <input type="text" value={startDate.toLocaleDateString()} readOnly />
        </div>
        <div>
          <label>End Date:</label>
          <input type="text" value={endDate.toLocaleDateString()} readOnly />
        </div>
        <div>
          <label>Principal Amount:</label>
          <input type="text" value={amount} readOnly />
        </div>
        <div>
          <label>Rate of Interest (%):</label>
          <input type="text" value="24" readOnly />
        </div>
        <div>
          <label>Number of Days:</label>
          <input type="text" value={days} readOnly />
        </div>
        <div>
          <label>Interest:</label>
          <input type="text" value={interest.toFixed(2)} readOnly />
        </div>
      </form>
    </div>
  );
};

export default InterestCalculatorModal;
