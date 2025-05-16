import React, { useState, createContext } from 'react';
import { getAccessTokenFromLS } from '@/utils/auth';

export interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  reset: () => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const getInitialAppContext: () => AppContextInterface = () => ({
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  reset: () => null,
  showPassword: false,
  setShowPassword: () => null
});
const initialState = getInitialAppContext();
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextInterface>(initialState);

export const AppProvider = ({
  children,
  defaultValue = initialState
}: {
  children: React.ReactNode;
  defaultValue?: AppContextInterface;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(defaultValue.isAuthenticated);
  const [showPassword, setShowPassword] = useState<boolean>(defaultValue.showPassword);

  const reset = () => {
    setIsAuthenticated(false);
    setShowPassword(false);
  };

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, reset, showPassword, setShowPassword }}>
      {children}
    </AppContext.Provider>
  );
};
