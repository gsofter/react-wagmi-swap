import { useContext } from 'react';

import { AppContext } from '../../context/AppContextProvider';

const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppProvider');
  }

  return context;
};

export default useAppContext;
