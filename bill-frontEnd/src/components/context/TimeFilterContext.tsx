import React, { createContext, useContext, useState } from "react";

interface TimeFilterContextType {
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  setDefaultDates: (dates: { start: string; end: string }) => void;
}

const TimeFilterContext = createContext<TimeFilterContextType | undefined>(
  undefined
);

export const TimeFilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Used to set both dates at once, e.g. from girvi data
  const setDefaultDates = (dates: { start: string; end: string }) => {
    setStartDate(dates.start);
    setEndDate(dates.end);
  };

  return (
    <TimeFilterContext.Provider
      value={{ startDate, setStartDate, endDate, setEndDate, setDefaultDates }}
    >
      {children}
    </TimeFilterContext.Provider>
  );
};

export const useTimeFilter = () => {
  const ctx = useContext(TimeFilterContext);
  if (!ctx)
    throw new Error("useTimeFilter must be used within a TimeFilterProvider");
  return ctx;
};
