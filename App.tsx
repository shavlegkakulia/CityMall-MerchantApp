import React from 'react';
import AppIndex from './AppIndex';
import AuthProvider from './services/ContextService';


const App = () => {
  return (
    <AuthProvider>
      <AppIndex/>
    </AuthProvider>
  );
};

export default App
