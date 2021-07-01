import React from 'react';
import { StoreStateContext } from '../context';

export default function useStoreState() {
  const context = React.useContext(StoreStateContext);
  if (context === undefined) {
    throw new Error('useStoreState must be used within a StoreProvider');
  }
  return context;
}
