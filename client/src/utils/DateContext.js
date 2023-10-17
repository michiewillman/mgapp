// Keeps track of the date in which the user has currently selected until they select another
// Prevents going back to current date on every refresh

import React, { useState, useContext } from "react";

// Create global user context using React.CreateContext()
export const DateContext = React.createContext();
// Create custom hook to make user context available to children
export const useDateContext = () => useContext(DateContext);

export default function DateProvider({ children }) {
  const currentDate = new Date();
  const [focusDate, setfocusDate] = useState(currentDate);

  return (
    <DateContext.Provider value={{ focusDate, setfocusDate }}>
      {children}
    </DateContext.Provider>
  );
}
