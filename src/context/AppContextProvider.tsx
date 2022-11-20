import React, { createContext, useState } from 'react';

type AppContexType = {
  swap: {
    from: string;
    to: string;
  }
};

const defaultValues = {
  swap: {
    from: '',
    to: '',
  },
};

const AppContext = createContext<AppContexType>(defaultValues);

interface IAppContextProviderProps {
  children: React.ReactNode;
}

const AppContextProvider: React.FC<IAppContextProviderProps> = ({ children }) => {
  const [swap] = useState(defaultValues.swap);

  // const values: AppContexType = {
  //   swap,
  // };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AppContext.Provider value={{ swap }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
