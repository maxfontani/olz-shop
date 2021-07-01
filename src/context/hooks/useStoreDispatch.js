import React from 'react';
import { StoreDispatchContext } from '../context';

export default function useStoreDispatch() {
  const context = React.useContext(StoreDispatchContext);
  if (context === undefined) {
    throw new Error('useStoreDispatch must be used within a StoreProvider');
  }
  return context;
}
