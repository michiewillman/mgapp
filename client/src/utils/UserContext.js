import React, { useState, useContext } from "react";

// Create global user context using React.CreateContext()
export const UserContext = React.createContext();
// Create custom hook to make user context available to children
export const useUserContext = () => useContext(UserContext);

export default function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <UserContext.Provider value={{ currentUser: currentUser }}>
      {children}
    </UserContext.Provider>
  );
}
